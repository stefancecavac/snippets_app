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
      <div className="group relative overflow-hidden  rounded-lg border-2 border-base-200/50 bg-base-200/50 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-base-300">
        <div className="flex flex-col pt-3  ">
          <div className="flex items-center pb-2 px-3 justify-between">
            <div className=" flex items-center gap-2  py-1  text-neutral">
              <div className="flex items-center gap-2 size-5 " style={{ fill: icon?.color }} dangerouslySetInnerHTML={{ __html: icon?.svg }}></div>
              <p>{snippet?.language}</p>
            </div>
            <CopyButton code={snippet?.code} />
          </div>

          <div onClick={() => openModal()} className="relative group/showCode hover:cursor-pointer">
            <div className=" top-0 right-0 left-0 bottom-0  opacity-0 group-hover/showCode:opacity-100  transition-all flex items-center justify-center  z-50  absolute">
              <p className="p-1 rounded btn btn-sm  bg-primary  shadow-sm text-white text-xs ">Show code</p>
            </div>
            <div className="  group-hover/showCode:blur-xs ">
              <div className="flex justify-start gap-2 items-start mt-1 mb-3 mx-2  ">
                {snippet.tags.filter((tag) => tag).length > 0 &&
                  snippet.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center text-xs gap-2 rounded badge px-1 border-base-200  bg-base-200/50 text-base-content "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-3"
                      >
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

              <div className="flex flex-col    px-3">
                <h3 className="mb-1 truncate text-lg font-medium leading-tight  text-base-content tracking-wide ">{snippet.snippetName}</h3>

                <div className="mb-2 h-10">
                  <p className="line-clamp-2 text-sm leading-normal text-base-content/30">{snippet.snippetDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-base-200 px-5 py-3 ">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-base-200 text-xs font-medium uppercase "></div>
            <span className="text-xs text-primary/70 ">{snippet?.user?.email}</span>
          </div>
        </div>
      </div>

      {modalOpen && <SingleSnippetModal snippet={snippet} closeModal={() => setModalOpen(false)} />}
    </>
  );
};
