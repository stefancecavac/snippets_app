import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createSnippetData, createSnippetSchema } from "../types";
import { useCreateSnippet } from "../api/snippetApi";
import { languages } from "../languages";
import { languageIcons } from "../lanugageIcons";

export const CreateSnippetModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<createSnippetData>({
    resolver: zodResolver(createSnippetSchema),
  });

  const { createSnippet } = useCreateSnippet();

  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalOpen && modalRef.current) {
      modalRef.current.showModal();
    } else if (modalRef.current) {
      modalRef.current.close();
    }
  }, [modalOpen]);

  const submitForm = (data: createSnippetData) => {
    createSnippet(data);
  };

  const [selectedItem, setSelectedItem] = useState("javascript");

  const selectItem = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary">
        Add snippet
      </button>

      {modalOpen && (
        <dialog ref={modalRef} id="create_snippet_modal" className="modal" onClose={() => setModalOpen(false)}>
          <div className="modal-box max-w-2xl p-2 border border-base-200">
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
              <input
                autoComplete="off"
                aria-autocomplete="none"
                {...register("snippetName")}
                className="input ml-5 px-0 mt-2 w-fit input-lg text-3xl font-bold border-0 text-base-content focus-within:outline-none focus:border-none focus-within:shadow-none"
                placeholder={errors.snippetName?.message ?? "New snippet"}
              />
              <div className="px-5 mt-1 flex flex-col">
                <textarea
                  autoComplete="off"
                  aria-autocomplete="none"
                  {...register("snippetDescription")}
                  placeholder={errors.snippetDescription?.message ?? "Brief description of your snippet"}
                  wrap="soft"
                  className="textarea border-none px-0 resize-none w-full focus-within:outline-none focus:border-none focus-within:shadow-none"
                />

                <Controller
                  control={control}
                  name="language"
                  defaultValue={selectedItem}
                  render={({ field }) => (
                    <details className="dropdown">
                      <summary {...field} className="btn btn-soft text-neutral fill-neutral m-1 w-30  justify-start">
                        {languageIcons
                          .filter((icon) => icon.name === selectedItem)
                          .map((icon) => (
                            <div key={icon.name} className="flex size-4 mr-2" dangerouslySetInnerHTML={{ __html: icon.svg }} />
                          ))}
                        {selectedItem}
                      </summary>
                      <ul className="menu grid grid-cols-5 dropdown-content bg-base-100 rounded-box z-50 w-fit h-fit p-2 gap-2 shadow-lg border border-base-200">
                        {languages.map((language) => (
                          <div
                            className={`${
                              selectedItem === language ? "bg-base-200" : ""
                            } hover:cursor-pointer hover:bg-base-200 rounded text-neutral fill-neutral p-1  flex items-center px-2`}
                            onClick={() => {
                              selectItem(language);
                              field.onChange(language);
                            }}
                            key={language}
                          >
                            {languageIcons
                              .filter((icon) => icon.name === language)
                              .map((icon) => (
                                <div key={icon.name} className="flex size-4 mr-2" dangerouslySetInnerHTML={{ __html: icon.svg }} />
                              ))}
                            {language}
                          </div>
                        ))}
                      </ul>
                    </details>
                  )}
                />

                <textarea
                  {...register("code")}
                  placeholder={errors.code?.message ?? "Paste your snippet here"}
                  rows={10}
                  className=" textarea resize-none focus-within:outline-none border border-base-200 w-full h-100 rounded   focus-within:shadow-none"
                />
              </div>

              <div className="flex items-center justify-end gap-5 mt-5">
                <button type="button" className="btn btn-soft">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add snippet
                </button>
              </div>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setModalOpen(false)}>Close</button>
          </form>
        </dialog>
      )}
    </>
  );
};
