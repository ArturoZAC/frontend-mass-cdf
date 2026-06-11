export const AuthSkeleton = () => (
  <div className="min-h-screen flex">
    <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0D2DAA] p-12 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg" />
        <div className="w-32 h-4 bg-white/20 rounded" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-3/4 h-8 bg-white/20 rounded" />
        <div className="w-full h-4 bg-white/20 rounded" />
        <div className="w-2/3 h-4 bg-white/20 rounded" />
      </div>
      <div className="flex gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-24 h-3 bg-white/20 rounded" />
        ))}
      </div>
    </div>
    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white px-8 py-12">
      <div className="w-full max-w-md flex flex-col gap-4 animate-pulse">
        <div className="w-40 h-6 bg-gray-200 rounded mx-auto" />
        <div className="w-full h-10 bg-gray-200 rounded-lg" />
        <div className="w-full h-10 bg-gray-200 rounded-lg" />
        <div className="w-full h-10 bg-gray-200 rounded-lg" />
        <div className="w-full h-12 bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);
