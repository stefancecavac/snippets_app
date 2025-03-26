import { useSearchParams } from "react-router-dom";
import { useGetAllSnippets } from "../api/snippetApi";
import SearchComponent from "../components/SearchComponent";
import SkeletonSnippetCard from "../components/SkeletonSnippetCard";
import { SnippetCard } from "../components/SnippetCard";
import { useDebounceHook } from "../hooks/useDebounceHook";
import { snippetData } from "../types";
import { useEffect, useRef } from "react";

const HomePage = () => {
  const [searhParams] = useSearchParams();
  const { debouncedValue } = useDebounceHook(searhParams.get("q") || "", 500);
  const { snippets, snippetsLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetAllSnippets(debouncedValue);

  const loaderSnippets = new Array(8).fill(undefined);

  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "2px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col grow  lg:m-5 relative">
      <div className="lg:mx-auto mt-30 flex items-center flex-col gap-2 ">
        <h1 className="text-base-content text-xl md:text-3xl lg:text-5xl font-bold">Find the Perfect Code Snippet</h1>
        <p className="text-neutral   font-medium w-3/4 text-center">
          Browse our collection of high-quality code snippets for various programming languages and frameworks.
        </p>
      </div>

      <div className="flex mx-auto my-20 sticky top-15 z-50 bg-base-100">
        <SearchComponent />
      </div>

      <div className=" mt-5 lg:mt-10 mx-2 lg:mx-20">
        <p className="text-neutral font-medium">Code snipets</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
          {snippetsLoading ? (
            loaderSnippets.map((_, index) => <SkeletonSnippetCard key={index} />)
          ) : snippets.length === 0 ? (
            <p className="text-center mt-30 flex items-center justify-center col-span-5 text-neutral">No snippets found</p>
          ) : (
            snippets?.map((snippet: snippetData) => <SnippetCard key={snippet.id} snippet={snippet} />)
          )}
        </div>

        {isFetchingNextPage && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
            {loaderSnippets.map((_, index) => (
              <SkeletonSnippetCard key={index} />
            ))}
          </div>
        )}
        <div className="" ref={observerRef}></div>
      </div>
    </div>
  );
};

export default HomePage;
