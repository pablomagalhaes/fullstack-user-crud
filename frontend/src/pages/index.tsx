import { useRouter } from 'next/router';
import UsersList from "./users";


export default function Home() {
  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/login');
  }
  

  return (
    <>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
          <button onClick={handleLogout} style={{ background: '#2d2578', color: '#fff', border: 0, borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
      <UsersList />
    </>
  );
} 