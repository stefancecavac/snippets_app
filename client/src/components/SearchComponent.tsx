import { useSearchParams } from "react-router-dom";
import { CreateSnippetModal } from "./CreateSnippetModal";

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center gap-5 w-150">
      <label className="w-full">
        <div className="flex items-center w-full border-b-2 gap-3  border-base-200 focus-within:border-primary py-3">
          <svg className="size-6 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            value={searchParams.get("q") || ""}
            onChange={(e) => setSearchParams({ q: e.target.value })}
            type="text"
            autoComplete="off"
            aria-autocomplete="none"
            className="w-full text-lg bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none px-2"
            required
            placeholder="Search by name , language or tag"
          />

          {searchParams.get("q")?.length !== 0 ? (
            <button onClick={() => setSearchParams("q")} className="btn btn-square btn-error btn-ghost btn-xs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            ""
          )}
        </div>
      </label>
      <CreateSnippetModal />
    </div>
  );
};

export default SearchComponent;
