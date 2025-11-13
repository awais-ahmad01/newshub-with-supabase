// "use client";

// import { BookOpen, Clock, Trash2 } from "lucide-react";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { getUsersSavedArticles, removeFromReadingList } from "../lib/actions/reading-list";
// import { supabase } from "../lib/supabaseClient";

// export default function ReadingList({initialUser}) {
//   const [savedArticles, setSavedArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(initialUser);

//   const formatDate = (dateString) => {
//     if (!dateString) return "No date";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//  useEffect(() => {
//     if (!user) {
//       setError("Please log in to view your reading list");
//       setLoading(false);
//       return;
//     }

//     fetchReadingList();

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user || null);
//       if (!session?.user) {
//         setError("Please log in to view your reading list");
//         setSavedArticles([]);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [user?.id]); 

 
//   const fetchReadingList = async () => {
//     try {
//       const response = await getUsersSavedArticles();
//       console.log("Supabase response:", response);

//       if (response.success) {
//         setSavedArticles(response.data || []);
//       } else {
//         setError(response.message || "Failed to load reading list");
//       }
//     } catch (err) {
//       setError("Failed to load reading list");
//       console.error("Error fetching reading list:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemove = async (articleId) => {
//     try {
//       const response = await removeFromReadingList(articleId);

//       if (response.success) {
//         console.log("Article removed successfully");
        
//         setSavedArticles(prev => 
//           prev.filter((article) => article.id !== articleId)
//         );
//       } else {
//         alert(response.message || "Failed to remove article");
//       }
//     } catch (error) {
//       console.error("Error removing article:", error);
//       alert("Failed to remove article");
//     }
//   };

//   // Add real-time subscription for live updates
//   useEffect(() => {
//     if (!user) return;

//     const subscription = supabase
//       .channel('saved-articles-changes')
//       .on(
//         'postgres_changes',
//         {
//           event: '*',
//           schema: 'public',
//           table: 'saved_articles',
//           filter: `user_id=eq.${user.id}`
//         },
//         (payload) => {
//           console.log('Real-time update:', payload);
          
//           if (payload.eventType === 'INSERT') {
//             setSavedArticles(prev => [payload.new, ...prev]);
//           } else if (payload.eventType === 'DELETE') {
//             setSavedArticles(prev => 
//               prev.filter(article => article.id !== payload.old.id)
//             );
//           }
//         }
//       )
//       .subscribe();

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [user]);

//    if (error && !user) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <p className="text-red-600 mb-4">{error}</p>
//               <Link href="/sign-in">
//                 <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
//                   Login to Continue
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

  
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <p className="text-red-600 mb-4">{error}</p>
//               <button
//                 onClick={fetchReadingList}
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-2">
//             <BookOpen className="h-8 w-8 text-blue-600" />
//             <h1 className="text-3xl font-bold text-gray-900">
//               Your Reading List
//             </h1>
//           </div>
//           <p className="text-gray-600">
//             Articles you've saved for later reading
//           </p>
//         </div>

      
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <div className="bg-white rounded-xl p-6 shadow-sm">
//             <div className="text-4xl font-bold text-blue-600 mb-2">
//               {savedArticles.length}
//             </div>
//             <div className="text-sm text-gray-600 uppercase tracking-wide">
//               Saved Articles
//             </div>
//           </div>
//         </div>

//         {savedArticles.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//               <div className="relative">
//                 <div className="w-16 h-12 bg-yellow-400 rounded-t-lg border-2 border-gray-800"></div>
//                 <div className="w-16 h-12 bg-blue-500 rounded-t-lg border-2 border-gray-800 absolute top-2 left-2"></div>
//                 <div className="w-16 h-12 bg-orange-600 rounded-t-lg border-2 border-gray-800 absolute top-4 left-4"></div>
//               </div>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-3">
//               Your Reading List is Empty
//             </h2>
//             <p className="text-gray-600 text-center max-w-md mb-6">
//               Start building your personal library by saving articles that catch
//               your interest. Click the save button on any article to add it
//               here.
//             </p>
//             <Link href="/">
//               <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
//                 Explore Trending News
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {savedArticles.map((article) => (
//               <div
//                 key={article.id}
//                 className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
//               >
//                 <div className="flex flex-col md:flex-row">
                 
//                   <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0">
//                     <img
//                       src={article.url_to_image || "/placeholder-image.jpg"}
//                       alt={article.title}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src = "/placeholder-image.jpg";
//                       }}
//                     />
//                   </div>

                  
//                   <div className="flex-1 p-6">
//                     <div className="flex items-start justify-between gap-4">
//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold text-gray-900 mb-3">
//                           {article.title}
//                         </h3>
//                         <p className="text-gray-600 mb-4 line-clamp-2">
//                           {article.description}
//                         </p>
//                         <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
//                           {article.author && (
//                             <div className="flex items-center gap-1">
//                               <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//                               <span>By {article.author}</span>
//                             </div>
//                           )}
//                           <div className="flex items-center gap-1">
//                             <div className="w-1 h-1 bg-red-500 rounded-full"></div>
//                             <span>{article.source}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Clock className="h-4 w-4" />
//                             <span>
//                               {formatDate(article.published_at)}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Clock className="h-4 w-4 text-gray-400" />
//                             <span className="text-gray-400">
//                               Saved {formatDate(article.created_at)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

                     
//                       <div className="flex flex-col gap-3">
//                         <Link
//                           href="/read-article"
//                           onClick={() =>
//                             localStorage.setItem(
//                               "currentArticle",
//                               JSON.stringify({
//                                 title: article.title,
//                                 description: article.description,
//                                 content: article.content,
//                                 author: article.author,
//                                 source: { name: article.source },
//                                 publishedAt: article.published_at,
//                                 url: article.url,
//                                 urlToImage: article.url_to_image
//                               })
//                             )
//                           }
//                         >
//                           <button className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
//                             Read Now
//                           </button>
//                         </Link>

//                         <button
//                           onClick={() => handleRemove(article.id)}
//                           className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-red-600 transition-colors px-6 py-2 hover:bg-gray-50 rounded-lg"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                           <span>Remove</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import { BookOpen, Clock, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { removeFromReadingList } from "../lib/actions/reading-list";
import { supabase } from "../lib/supabaseClient";

export default function ReadingList({ initialUser, initialArticles = [], initialError = null }) {
  const [savedArticles, setSavedArticles] = useState(initialArticles);
  const [error, setError] = useState(initialError);
  const [user, setUser] = useState(initialUser);

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (!session?.user) {
        setError("Please log in to view your reading list");
        setSavedArticles([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleRemove = async (articleId) => {
    try {
      const response = await removeFromReadingList(articleId);

      if (response.success) {
        console.log("Article removed successfully");
        
        setSavedArticles(prev => 
          prev.filter((article) => article.id !== articleId)
        );
      } else {
        alert(response.message || "Failed to remove article");
      }
    } catch (error) {
      console.error("Error removing article:", error);
      alert("Failed to remove article");
    }
  };

  // Real-time subscription for live updates
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('saved-articles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'saved_articles',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Real-time update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setSavedArticles(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setSavedArticles(prev => 
              prev.filter(article => article.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-red-600 mb-4">Please log in to view your reading list</p>
              <Link href="/sign-in">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Login to Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there was an error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Your Reading List
            </h1>
          </div>
          <p className="text-gray-600">
            Articles you've saved for later reading
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {savedArticles.length}
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Saved Articles
            </div>
          </div>
        </div>

        {/* Empty State */}
        {savedArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-12 bg-yellow-400 rounded-t-lg border-2 border-gray-800"></div>
                <div className="w-16 h-12 bg-blue-500 rounded-t-lg border-2 border-gray-800 absolute top-2 left-2"></div>
                <div className="w-16 h-12 bg-orange-600 rounded-t-lg border-2 border-gray-800 absolute top-4 left-4"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your Reading List is Empty
            </h2>
            <p className="text-gray-600 text-center max-w-md mb-6">
              Start building your personal library by saving articles that catch
              your interest. Click the save button on any article to add it
              here.
            </p>
            <Link href="/">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Explore Trending News
              </button>
            </Link>
          </div>
        ) : (
          /* Articles List */
          <div className="space-y-6">
            {savedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Article Image */}
                  <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                    <img
                      src={article.url_to_image || "/placeholder-image.jpg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>

                  {/* Article Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {article.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          {article.author && (
                            <div className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <span>By {article.author}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            <span>{article.source}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {formatDate(article.published_at)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">
                              Saved {formatDate(article.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3">
                        <Link
                          href="/read-article"
                          onClick={() =>
                            localStorage.setItem(
                              "currentArticle",
                              JSON.stringify({
                                title: article.title,
                                description: article.description,
                                content: article.content,
                                author: article.author,
                                source: { name: article.source },
                                publishedAt: article.published_at,
                                url: article.url,
                                urlToImage: article.url_to_image
                              })
                            )
                          }
                        >
                          <button className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                            Read Now
                          </button>
                        </Link>

                        <button
                          onClick={() => handleRemove(article.id)}
                          className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-red-600 transition-colors px-6 py-2 hover:bg-gray-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}