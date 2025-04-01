import { useEffect, useRef } from "react";
import { snippetData } from "../types";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark, materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { languageIcons } from "../lanugageIcons";
import { CopyButton } from "./CopyButton";
import { useThemeChangerStore } from "../store/ThemeChangerStore";

type SingleSnippetModalProps = {
  snippet: snippetData;
  closeModal: () => void;
};

export const SingleSnippetModal = ({ snippet, closeModal }: SingleSnippetModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { darkMode } = useThemeChangerStore();

  const matchedIcon = languageIcons.filter((icon) => icon.name === snippet.language)[0];

  console.log(matchedIcon);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, [modalRef]);

  return (
    <dialog ref={modalRef} id={`${snippet.id}`} className="modal" onClose={closeModal}>
      <div className="modal-box w-11/12 max-w-4xl scale-in-center p-0">
        <div className="flex justify-between items-start bg-base-200/50 p-3">
          <h3 className="font-bold text-2xl  break-words w-140 text-primary items-center gap-2 flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
            {snippet.snippetName}
          </h3>
          <div className="modal-action items-center flex justify-center mt-0">
            <form method="dialog">
              <button className="btn btn-square btn-xs btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-2  p-3   ">
          {snippet.tags.filter((tag) => tag).length > 0 &&
            snippet.tags.map((tag, index) => (
              <div key={index} className="flex items-center text-xs gap-2 rounded badge px-1 border-base-200  bg-base-200/50 text-base-content ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
                <p className="text-xs">{tag}</p>
              </div>
            ))}
        </div>
        <p className="p-3 text-neutral max-h-30 break-words text-xs  ">{snippet.snippetDescription}</p>

        <div className="border-t border-base-200 bg-base-200/50 whitespace-break-spaces ">
          <div className="flex items-center justify-between p-2 pr-5    border-base-200">
            <div className="flex items-center gap-2">
              <div
                className="size-6 flex text-neutral fill-neutral"
                style={{ fill: matchedIcon?.color }}
                dangerouslySetInnerHTML={{ __html: matchedIcon?.svg || "" }}
              ></div>
              <p className="text-neutral text-sm">{snippet.language}</p>
            </div>

            <CopyButton code={snippet.code} />
          </div>
          <div className="overflow-auto max-h-100 text-sm m-0">
            <SyntaxHighlighter
              wrapLines
              wrapLongLines
              showInlineLineNumbers
              showLineNumbers
              language={"sql"}
              style={darkMode ? materialDark : materialLight}
              customStyle={{ margin: 0 }}
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="mt-5 p-3">
          <p className="text-xs text-base-content/50">Snippet by: {snippet.user.email}</p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>close</button>
      </form>
    </dialog>
  );
};
