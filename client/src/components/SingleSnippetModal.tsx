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
      <div className="modal-box w-11/12 max-w-2xl scale-in-center ">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-2xl text-base-content">{snippet.snippetName}</h3>
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
        <p className="py-4 text-neutral ">{snippet.snippetDescription}</p>

        <div className="border rounded-lg border-base-200 whitespace-break-spaces ">
          <div className="flex items-center justify-between p-2 border-b-2 border-base-200">
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
          <div className="overflow-auto h-100 text-sm">
            <SyntaxHighlighter
              wrapLines
              wrapLongLines
              showInlineLineNumbers
              showLineNumbers
              language={"sql"}
              style={darkMode ? materialDark : materialLight}
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-xs text-base-content/50">{snippet.user.email}</p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>close</button>
      </form>
    </dialog>
  );
};
