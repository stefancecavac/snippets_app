const HeaderComponent = () => {
  return (
    <div className=" p-3  flex items-center justify-between border-b-2 border-base-300 fixed w-full backdrop-blur-lg z-50">
      <h1 className="text-2xl font-bold text-primary">{"<>"} Code Block</h1>
      <div>
        <button className="btn btn-primary rounded-xl">Signup</button>
      </div>
    </div>
  );
};

export default HeaderComponent;
