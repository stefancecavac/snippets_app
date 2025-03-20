const SearchComponent = () => {
  return (
    <div className="flex items-center gap-5 w-150">
      <input placeholder="Search for snippets..." className="input border-b-2 border-0 rounded-none  input-lg focus:outline-none  w-full  "></input>
      <button className="btn btn-primary ">Search</button>
    </div>
  );
};

export default SearchComponent;
