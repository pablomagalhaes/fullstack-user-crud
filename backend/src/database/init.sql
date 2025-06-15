-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS fullstack_crud;

-- Conectar ao banco de dados
\c fullstack_crud;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserir usuários de teste (senha: 123456)
INSERT INTO users (id, name, email, password) VALUES
  (gen_random_uuid(), 'Admin', 'admin@admin.com', '$2b$10$u1Qw8Qw6Qw8Qw6Qw8Qw6QeQw8Qw6Qw8Qw6Qw8Qw6Qw8Qw6Qw8Qw6'),
  (gen_random_uuid(), 'Alice', 'alice@teste.com', '$2b$10$u1Qw8Qw6Qw8Qw6Qw8Qw6QeQw8Qw6Qw8Qw6Qw8Qw6Qw8Qw6Qw8Qw6'),
  (gen_random_uuid(), 'Bob', 'bob@teste.com', '$2b$10$u1Qw8Qw6Qw8Qw6Qw8Qw6QeQw8Qw6Qw8Qw6Qw8Qw6Qw8Qw6Qw8Qw6'),
  (gen_random_uuid(), 'Carol', 'carol@teste.com', '$2b$10$u1Qw8Qw6Qw8Qw6Qw8Qw6QeQw8Qw6Qw8Qw6Qw8Qw6Qw8Qw6Qw8Qw6'); 