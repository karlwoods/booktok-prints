export default function Loading() {
  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <div className="h-16 bg-white/80 border-b" />
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="space-y-8">
          <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-4 shadow-md space-y-4 animate-pulse"
              >
                <div className="aspect-square bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
