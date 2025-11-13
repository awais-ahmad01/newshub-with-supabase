import { Suspense } from 'react';
import HomeContent from '../../components/homeContent';
import HeadlinesSkeleton from '../../components/headlinesSkeleton';
import { createServerClient } from '../../lib/supabaseServer';
import { cookies } from 'next/headers'

export default async function Home() {

  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()
  
  console.log('All cookies:', allCookies)
  console.log('Supabase auth cookies:', allCookies.filter(c => 
    c.name.includes('sb-') || c.name.includes('supabase')
  ))
 
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  console.log("userData:", user);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <HeadlinesSkeleton />
      </div>
    }>
      <HomeContent initialUser={user} />
    </Suspense>
  );
}