const SkeletonSnippetCard = () => {
  return (
    <div className="group relative overflow-hidden rounded-lg border-2 border-base-200/50 bg-base-100 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-base-300 animate-pulse">
      <div className="flex flex-col pt-3">
        <div className="flex items-center pb-2 px-3 justify-between">
          <div className="flex items-center gap-2 py-1">
            <div className="h-5 w-5 bg-base-200 rounded-full"></div>
            <div className="h-4 w-20 bg-base-200 rounded"></div>
          </div>
          <div className="h-6 w-6 bg-base-200 rounded"></div>
        </div>

        <div className="relative">
          <div className="h-24 bg-base-200 mx-3 rounded"></div>
        </div>

        <div className="flex flex-col px-3 pt-3">
          <div className="h-5 w-32 bg-base-200 rounded mb-2"></div>
          <div className="h-4 w-full bg-base-200 rounded mb-1"></div>
          <div className="h-4 w-3/4 bg-base-200 rounded"></div>
        </div>

        <div className="flex items-center justify-between border-t border-base-200 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-base-200 rounded-full"></div>
            <div className="h-4 w-24 bg-base-200 rounded"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-5 w-5 bg-base-200 rounded"></div>
            <div className="h-4 w-6 bg-base-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSnippetCard;
