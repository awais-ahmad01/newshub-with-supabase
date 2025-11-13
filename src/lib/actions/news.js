'use server';

export async function getNews(category) {
    console.log("category:", category)
  const baseUrl = 'https://newsapi.org/v2/top-headlines?country=us';
  const apiKey = process.env.NEWS_API_KEY;

  const url =
    category === 'Trending'
      ? `${baseUrl}&apiKey=${apiKey}`
      : `${baseUrl}&category=${category.toLowerCase()}&apiKey=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  const data = await res.json();

//   console.log("data:", data);

  if (!data.articles) {
    throw new Error('Failed to fetch articles');
  }

  return data.articles;
}
