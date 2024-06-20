
import { User, currentUser } from '@clerk/nextjs/server';
import { redirect, useRouter } from 'next/navigation';

export default async function Home() {
  const user : User | null  = await currentUser()
  const isLoggedin = !!user
  
  if(isLoggedin){
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-
      center justify-auto">
      <h1>Quiz on anything</h1>
    </main>
  );
}
