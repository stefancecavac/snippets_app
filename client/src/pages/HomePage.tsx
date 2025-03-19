import SearchComponent from "../components/SearchComponent";
import { SnippetCard } from "../components/SnippetCard";

const HomePage = () => {
  const snippets = [
    {
      language: "react",
      title: "React useState Hook",
      description: "A simple example of using the useState hook in React for managing component state",
      code: `const [count, setCount] = useState(0);
  return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
    },
    {
      language: "react",
      title: "React useState Hook",
      description: "A simple example of using the useState hook in React for managing component state",
      code: `const [count, setCount] = useState(0);
  return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
    },
    {
      language: "react",
      title: "React useState Hook",
      description: "A simple example of using the useState hook in React for managing component state",
      code: `const [count, setCount] = useState(0);
  return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
    },
    {
      language: "react",
      title: "React useState Hook",
      description: "A simple example of using the useState hook in React for managing component state",
      code: `const [count, setCount] = useState(0);
  return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
    },
    {
      language: "react",
      title: "React useState Hook",
      description: "A simple example of using the useState hook in React for managing component state",
      code: `const [count, setCount] = useState(0);
  return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
    },
    {
      language: "react",
      title: "React useState Hook",
      description: "A simple example of using the useState hook in React for managing component state",
      code: `const [count, setCount] = useState(0);
  return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
    },
    {
      language: "react",
      title: "React useState Hook",
      description: "A simple example of using the useState hook in React for managing component state",
      code: `const [count, setCount] = useState(0);
  return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
    },
    {
      language: "react",
      title: "React useState Hook",
      description: "A simple example of using the useState hook in React for managing component state",
      code: `const [count, setCount] = useState(0);
  return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
    },
    {
      language: "react",
      title: "React useState Hook",
      description: "A simple example of using the useState hook in React for managing component state",
      code: `const [count, setCount] = useState(0);
  return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
    },
    {
      language: "react",
      title: "React useState Hook",
      description: "A simple example of using the useState hook in React for managing component state",
      code: `const [count, setCount] = useState(0);
  return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
    },
    {
      language: "react",
      title: "React useState Hook",
      description: "A simple example of using the useState hook in React for managing component state",
      code: `const [count, setCount] = useState(0);
  return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
    },
  ];

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

        <div className="grid grid-cols-3 gap-5 mt-5">
          {snippets.map((snippet, index) => (
            <SnippetCard key={index} snippet={snippet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
