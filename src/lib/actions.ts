'use server';
import { cookies } from 'next/headers';
import { User } from './types';

export async function getSessionUser(): Promise<User | null> {
  const cookieStore =await cookies(); 

  const tokenCookie = cookieStore.get('access_token');

  if (!tokenCookie?.value) {
    return null;
  }

  try {
    const response = await fetch('http://localhost:3000/users/profile', {
      headers: {
        Cookie: `access_token=${tokenCookie.value}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch session user:', error);
    return null;
  }
}