"use client";
import { ArrowLeft, Clock, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ArticleReader() {
  const [article, setArticle] = useState(null);
  console.log("article data:", article);
  const router = useRouter();

  useEffect(() => {
    const storedArticle = localStorage.getItem("currentArticle");
    console.log("stored Article:", storedArticle);
    if (storedArticle) {
      const articleData = JSON.parse(storedArticle);
      console.log("art:", articleData);
      setArticle(articleData);
    } else {
      router.push("./");
    }
  }, []);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <button className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to News</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className={`w-full max-w-7xl mx-auto h-96`}>
        <img
          src={article?.urlToImage}
          alt={article?.title}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article?.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article?.description}
          </p>

          <div className="flex items-center gap-6 pb-8 mb-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {article?.author ? article.author.charAt(0) : "N"}
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {article?.author || "Unknown"}
                </div>
                <div className="text-sm text-gray-500">
                  {article?.source?.name}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 ml-auto">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatDate(article?.publishedAt)}</span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              {article?.content}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
