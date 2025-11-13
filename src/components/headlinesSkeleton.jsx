const HeadlinesSkeleton = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured Article Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Image Skeleton */}
        <div className="w-full h-96 bg-gray-200 rounded-2xl animate-pulse" />
        
        {/* Content Skeleton */}
        <div className="flex flex-col justify-center">
          {/* Title Skeleton */}
          <div className="space-y-3 mb-4">
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-full" />
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-4/5" />
          </div>
          
          {/* Description Skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
          
          {/* Metadata Skeleton */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          </div>
          
          {/* Buttons Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-40" />
            <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Grid Articles Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="w-full h-48 bg-gray-200 animate-pulse" />
            
            {/* Card Content */}
            <div className="p-6">
              {/* Title Skeleton */}
              <div className="space-y-2 mb-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-4/5" />
              </div>
              
              {/* Description Skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
              
              {/* Metadata Skeleton */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
              </div>
              
              {/* Action Buttons Skeleton */}
              <div className="flex items-center justify-between">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-24" />
                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HeadlinesSkeleton;