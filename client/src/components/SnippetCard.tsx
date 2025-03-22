import { useState } from "react";
import { SingleSnippetModal } from "./SingleSnippetModal";
import { snippetData } from "../types";
import { languageIcons } from "../lanugageIcons";
import { CopyButton } from "./CopyButton";

type SnippetCardProps = {
  snippet: snippetData;
};

export const SnippetCard = ({ snippet }: SnippetCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const icon = languageIcons.filter((icon) => icon.name === snippet.language)[0];

  return (
    <>
      <div className="group relative overflow-hidden   rounded-lg border-2 border-base-200/50 bg-base-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-base-300">
        <div className="flex flex-col pt-3  ">
          <div className="flex items-center pb-2 px-3 justify-between">
            <div className=" flex items-center gap-2  py-1  text-neutral">
              <div className="flex items-center gap-2 size-5 " style={{ fill: icon?.color }} dangerouslySetInnerHTML={{ __html: icon?.svg }}></div>
              <p>{snippet.language}</p>
            </div>
            <CopyButton code={snippet.code} />
          </div>

          <div onClick={() => openModal()} className="relative group/showCode hover:cursor-pointer">
            <div className=" top-0 right-0 left-0 bottom-0  opacity-0 group-hover/showCode:opacity-100  transition-all flex items-center justify-center  z-50  absolute">
              <p className="p-1 rounded-full  bg-gradient-to-r from-primary/50 to-primary  shadow-sm text-base-content text-xs ">Show code</p>
            </div>
            <div className="  group-hover/showCode:blur-xs ">
              <div className="flex pb-2 mb-4 px-3 ">
                <div className="flex items-center gap-2 rounded-full badge px-1 border-base-200 text-xs bg-base-200/50 text-base-content ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                  </svg>
                  Hooks
                </div>
              </div>

              <div className="flex flex-col    px-3">
                <h3 className="mb-1 truncate text-lg font-medium leading-tight tracking-tight text-base-content ">{snippet.snippetName}</h3>

                <div className="mb-2 h-10">
                  <p className="line-clamp-2 text-sm leading-normal text-neutral">{snippet.snippetDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-base-200 px-5 py-3 ">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-base-200 text-xs font-medium uppercase "></div>
            <span className="text-xs text-zinc-600 ">GugaR@email.com</span>
          </div>

          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-5 text-error"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>

            <p className="text-neutral text-sm">{snippet.likes}</p>
          </div>
        </div>
      </div>

      {modalOpen && <SingleSnippetModal snippet={snippet} closeModal={() => setModalOpen(false)} />}
    </>
  );
};
