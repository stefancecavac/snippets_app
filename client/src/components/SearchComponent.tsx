import { CreateSnippetModal } from "./CreateSnippetModal";

const SearchComponent = () => {
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
            type="text"
            autoComplete="off"
            aria-autocomplete="none"
            className="w-full text-lg bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none px-2"
            required
            placeholder="Search by name , language or tag"
          />
        </div>
      </label>
      <CreateSnippetModal />
    </div>
  );
};

export default SearchComponent;
