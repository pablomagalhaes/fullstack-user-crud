-- Criar banco de dados
CREATE DATABASE fullstack_crud;

-- Conectar ao banco de dados
\c fullstack_crud;

-- Criar tabela de usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para busca por email
CREATE INDEX idx_users_email ON users(email);

INSERT INTO users (id, name, email, password)
VALUES (
  gen_random_uuid(),
  'Admin',
  'admin@admin.com',
  '$2b$10$QWERTYUIOPASDFGHJKLZXCVBNM1234567890abcdEfghijKLMNOP',
); 