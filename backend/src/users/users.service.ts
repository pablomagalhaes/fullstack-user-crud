import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);
    await this.invalidateCache();
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const cacheKey = 'all_users';
    const cachedUsers = await this.cacheManager.get<User[]>(cacheKey);
    
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.usersRepository.find();
    await this.cacheManager.set(cacheKey, users);
    return users;
  }

  async findOne(id: string): Promise<User> {
    const cacheKey = `user_${id}`;
    const cachedUser = await this.cacheManager.get<User>(cacheKey);
    
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.cacheManager.set(cacheKey, user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);
    const updatedUser = await this.usersRepository.save(user);
    await this.invalidateCache();
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    await this.invalidateCache();
  }

  private async invalidateCache(): Promise<void> {
    await this.cacheManager.del('all_users');
  }
}
