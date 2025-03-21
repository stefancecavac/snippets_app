import { useGetAllSnippets } from "../api/snippetApi";
import SearchComponent from "../components/SearchComponent";
import { SnippetCard } from "../components/SnippetCard";

const HomePage = () => {
  const { snippets } = useGetAllSnippets();

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
          {snippets?.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
