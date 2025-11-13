'use client'

import CategoriesNavigation from './categoriesNavigation';
import Headlines from './headlines';
import HeadlinesSkeleton from '../components/headlinesSkeleton';
import { getNews } from '../lib/actions/news';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function HomeContent({ initialUser }) {

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('Trending');
  const [isInitialized, setIsInitialized] = useState(false);


  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setCategory(urlCategory);
    } else {
      fetchNews('Trending');
    }
    setIsInitialized(true);
  }, [searchParams]);

  const fetchNews = async (cat) => {
    setLoading(true);
    setError(null);

    try {
      console.log("fetching....")
      const news = await getNews(cat);
      console.log("news:", news) 
      setArticles(news);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch news.');
    }

    setLoading(false);
  };

  const updateCategory = (newCategory) => {
    setCategory(newCategory);
    
    const params = new URLSearchParams();
    
    if (newCategory !== 'Trending') {
      params.set('category', newCategory);
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.replace(newUrl, { scroll: false });
    
    fetchNews(newCategory);
  };

  useEffect(() => {
    if (isInitialized && category) {
      fetchNews(category);
    }
  }, [category, isInitialized]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoriesNavigation 
        activeCategory={category} 
        onCategoryChange={updateCategory} 
      />

     
      {error && <p className="text-center mt-8 text-red-500">{error}</p>}

   
      {loading && <HeadlinesSkeleton />}

      
      {!loading && !error && <Headlines articles={articles} initialUser={initialUser}/>}
    </div>
  );
}