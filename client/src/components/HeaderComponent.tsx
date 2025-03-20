const HeaderComponent = () => {
  return (
    <div className=" p-3  flex items-center justify-between border-b-2 border-base-300/30 fixed w-full backdrop-blur-lg z-50">
      <h1 className="text-2xl font-bold text-primary">{"<>"} Code Block</h1>
      <div className="flex items-center gap-10">
        <p>Home</p>
        <p>My snippets</p>
        <button className="btn btn-primary ">Signup</button>
      </div>
    </div>
  );
};

export default HeaderComponent;
