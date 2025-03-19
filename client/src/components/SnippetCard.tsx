type SnippetCardProps = {
  snippet: {
    language: string;
    title: string;
    description: string;
    code: string;
  };
};

export const SnippetCard = ({ snippet }: SnippetCardProps) => {
  return (
    <div className="rounded-lg flex flex-col  py-3 border border-base-300">
      <div className="flex flex-col px-5">
        <p className="rounded-xl  bg-primary/50 w-fit px-2 py-0.5 mb-5">{snippet.language}</p>
        <h3 className="text-lg text-base-content font-medium">{snippet.title}</h3>
        <p className="text-neutral mt-1">{snippet.description}</p>

        <div className="bg-base-300 p-2 rounded-lg my-5 text-sm h-30">
          <p>{snippet.code}</p>
        </div>
      </div>

      <div className=" border-t border-base-300 flex">
        <p>Username</p>
      </div>
    </div>
  );
};
