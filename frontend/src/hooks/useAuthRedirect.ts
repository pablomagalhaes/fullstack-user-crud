import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token && router.pathname !== '/login') {
      router.replace('/login');
    }
    if (token && router.pathname === '/login') {
      router.replace('/');
    }
  }, [router]);
} 