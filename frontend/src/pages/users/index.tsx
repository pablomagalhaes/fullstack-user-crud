import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import Table from '@/components/Table';
import UserModal from '@/components/UserModal';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('http://localhost:3000/users', {
    headers: {
      Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`,
    },
  });
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}

export default function UsersList() {
  useAuthRedirect();
  const { data = [], isLoading, error, refetch } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEdit = (id: string) => {
    const user = data.find((u) => u.id === id);
    if (user) {
      setEditingUser(user);
      setShowModal(true);
    }
  };

  const handleSave = async (user: Partial<User>) => {
    const method = user.id ? 'PATCH' : 'POST';
    const url = user.id
      ? `http://localhost:3000/users/${user.id}`
      : `http://localhost:3000/users`;

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(user),
    });

    await refetch();
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Tem certeza que deseja remover este usuário?');
    if (!confirmed) return;
  
    await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    await refetch();
    setShowModal(false);
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <div className="flex gap-2">
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Adicionar Usuário
          </button>
          <button
            onClick={() => refetch()}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm"
          >
            Atualizar
          </button>
        </div>
      </div>

      {isLoading && <p>Carregando...</p>}
      {error && <p className="text-red-600">Erro ao carregar usuários</p>}

      <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />

      <UserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        initialData={editingUser}
      />
    </div>
  );
}
