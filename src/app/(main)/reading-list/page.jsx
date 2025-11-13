// import { Suspense } from 'react';
// import ReadingList from '../../../components/reading-list';
// import { createServerClient } from '../../../lib/supabaseServer';

// export default async function ReadingListPage() {
 
//   const supabase = await createServerClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   console.log("uuuuss:",user );
  
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading your reading list...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     }>
//       <ReadingList initialUser={user} />
//     </Suspense>
//   );
// }



import { Suspense } from 'react';
import ReadingList from '../../../components/reading-list';
import { createServerClient } from '../../../lib/supabaseServer';
import ReadingListSkeleton from '../../../components/readingListSkeleton';

// Separate async function for data fetching
async function getReadingListData() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  console.log("User:", user);

  // If user exists, fetch their saved articles
  if (user) {
    const { data: savedArticles, error } = await supabase
      .from('saved_articles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching saved articles:', error);
      return { user, savedArticles: [], error: error.message };
    }

    return { user, savedArticles: savedArticles || [], error: null };
  }

  return { user: null, savedArticles: [], error: null };
}


// Wrapper component that fetches data (this triggers Suspense)
async function ReadingListWithData() {
  const { user, savedArticles, error } = await getReadingListData();
  
  return <ReadingList initialUser={user} initialArticles={savedArticles} initialError={error} />;
}

export default function ReadingListPage() {
  return (
    <Suspense fallback={<ReadingListSkeleton />}>
      <ReadingListWithData />
    </Suspense>
  );
}