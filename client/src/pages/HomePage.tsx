import { useSearchParams } from "react-router-dom";
import { useGetAllSnippets } from "../api/snippetApi";
import SearchComponent from "../components/SearchComponent";
import SkeletonSnippetCard from "../components/SkeletonSnippetCard";
import { SnippetCard } from "../components/SnippetCard";
import { useDebounceHook } from "../hooks/useDebounceHook";

const HomePage = () => {
  const [searhParams] = useSearchParams();
  const { debouncedValue } = useDebounceHook(searhParams.get("q") || "", 500);
  const { snippets, snippetsLoading } = useGetAllSnippets(debouncedValue);

  const loaderSnippets = new Array(8).fill(undefined);

  return (
    <div className="flex flex-col grow m-5">
      <div className="mx-auto mt-30 flex items-center flex-col gap-2">
        <h1 className="text-base-content text-5xl font-bold">Find the Perfect Code Snippet</h1>
        <p className="text-neutral   font-medium w-3/4 text-center">
          Browse our collection of high-quality code snippets for various programming languages and frameworks.
        </p>
      </div>

      <div className="flex mx-auto my-20">
        <SearchComponent />
      </div>

      <div className="mt-10 mx-20">
        <p className="text-neutral font-medium">Code snipets</p>

        <div className="grid grid-cols-4 gap-5 mt-5">
          {snippetsLoading
            ? loaderSnippets.map((_, index) => <SkeletonSnippetCard key={index} />)
            : snippets?.map((snippet) => <SnippetCard key={snippet.id} snippet={snippet} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
