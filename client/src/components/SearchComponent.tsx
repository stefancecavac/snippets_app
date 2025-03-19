const SearchComponent = () => {
  return (
    <div className="flex items-center gap-5 w-150">
      <input placeholder="Search for snippets..." className="input input-lg focus:outline-none w-full  "></input>
      <button className="btn btn-primary btn-lg">Search</button>
    </div>
  );
};

export default SearchComponent;
