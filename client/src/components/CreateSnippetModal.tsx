import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useEffect, useRef, useState } from "react";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { createSnippetData, createSnippetSchema } from "../types";
import { useCreateSnippet } from "../api/snippetApi";
import { languages } from "../languages";
import { languageIcons } from "../lanugageIcons";
import { tags } from "../tags";

export const CreateSnippetModal = ({ closeModal }: { closeModal: () => void }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, [modalRef]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<createSnippetData>({
    resolver: zodResolver(createSnippetSchema),
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleAddTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = e.target.value;
    if (!selectedTags.includes(selectedTag) && selectedTags.length <= 3) {
      setSelectedTags((prev) => [...prev, selectedTag]);
    }
  };

  const handleRemoveTag = (selectedTag: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== selectedTag));
  };

  const { createSnippet } = useCreateSnippet();

  const submitForm = (data: createSnippetData) => {
    createSnippet({ ...data, tags: selectedTags });
    setSelectedTags([]);
    reset();
    closeModal();
  };

  const [selectedItem, setSelectedItem] = useState("javascript");

  const selectItem = (item: string) => {
    setSelectedItem(item);
  };

  const handleLanguagePick = ({ language, field }: { language: string; field: ControllerRenderProps<createSnippetData, "language"> }) => {
    selectItem(language);
    field.onChange(language);

    const detailsDropDown = document.getElementById("details") as HTMLDetailsElement;
    if (detailsDropDown) {
      detailsDropDown.open = false;
    }
  };

  console.log(errors);

  return (
    <dialog ref={modalRef} id="createModal" className="modal" onClose={closeModal}>
      <div className=" bg-base-100 p-0 w-11/12 max-w-4xl scale-in-center flex mx-auto modal-box border border-base-200">
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col w-full">
          <div className="flex items-center justify-between gap-5  py-3 px-3 border-b border-base-200 bg-base-200/50">
            <h2 className="text-primary text-xl font-bold flex items-center gap-5   ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
              New snippet
            </h2>
            <button type="submit" className="btn btn-primary btn-sm">
              Add snippet
            </button>
          </div>
          <div className=" mt-1 flex flex-col items-center overflow-auto">
            <label className="flex flex-col gap-1 w-full px-5">
              <p className=" text-sm text text-base-content/50">Title</p>
              <input
                autoComplete="off"
                aria-autocomplete="none"
                {...register("snippetName")}
                className="input  shadow-none px-0 w-fit input-lg text-3xl font-bold border-0 text-base-content focus-within:outline-none focus-within::border-none focus-within:shadow-none"
                placeholder={errors.snippetName?.message ?? "New snippet"}
              />
              {errors.snippetName?.message && (
                <span className="text-error  text-xs p-1 rounded  bg-error/10 w-fit">{errors.snippetName?.message}</span>
              )}
            </label>

            <label className="flex flex-col gap-1 mt-5 w-full px-5">
              <p className="text-sm text-base-content/50">Description</p>
              <textarea
                autoComplete="off"
                aria-autocomplete="none"
                {...register("snippetDescription")}
                placeholder={errors.snippetDescription?.message ?? "Brief description of your snippet"}
                wrap="soft"
                className="textarea h-20 shadow-none border-none px-0 resize-none w-full focus-within:outline-none focus:border-none focus-within:shadow-none"
              />
              {errors.snippetDescription?.message && (
                <span className="text-error  text-xs p-1 rounded  bg-error/10 w-fit">{errors.snippetDescription?.message}</span>
              )}
            </label>

            <div className="flex flex-col gap-2 w-full mt-5 px-5">
              <p className="text-sm text-base-content/50 tracking-tighter">Language:</p>

              <Controller
                control={control}
                name="language"
                defaultValue={selectedItem}
                render={({ field }) => (
                  <details id="details" className="dropdown">
                    <summary {...field} className="btn btn-soft text-neutral fill-neutral m-1 w-30  justify-start">
                      {languageIcons
                        .filter((icon) => icon.name === selectedItem)
                        .map((icon) => (
                          <div
                            key={icon.name}
                            className="flex size-4 mr-2"
                            style={{ fill: icon?.color }}
                            dangerouslySetInnerHTML={{ __html: icon.svg }}
                          />
                        ))}
                      {selectedItem}
                    </summary>
                    <ul className="menu grid grid-cols-5 dropdown-content bg-base-100 rounded-box z-50 w-fit h-fit p-2 gap-2 shadow-lg border border-base-200">
                      {languages.map((language) => (
                        <div
                          className={`${
                            selectedItem === language ? "bg-base-200" : ""
                          } hover:cursor-pointer hover:bg-base-200 rounded text-neutral fill-neutral p-1  flex items-center px-2`}
                          onClick={() => handleLanguagePick({ field, language })}
                          key={language}
                        >
                          {languageIcons
                            .filter((icon) => icon.name === language)
                            .map((icon) => (
                              <div
                                key={icon.name}
                                className="flex size-4 mr-2"
                                style={{ fill: icon?.color }}
                                dangerouslySetInnerHTML={{ __html: icon.svg }}
                              />
                            ))}
                          {language}
                        </div>
                      ))}
                    </ul>
                  </details>
                )}
              />
            </div>

            <div className="flex flex-col gap-2 my-4 px-5 w-full">
              <p className="text-sm text-base-content/50 tracking-tighter">Add up to 4 tags</p>
              <div className="flex justify-start gap-4 items-start  ">
                {selectedTags.map((tag) => (
                  <div
                    onClick={() => handleRemoveTag(tag)}
                    key={tag}
                    className="flex relative w-fit hover:bg-error/60 border hover:border-error  group/tagHover p-2 hover:cursor-pointer items-center justify-center gap-2 rounded  border-base-200 text-xs bg-base-200/50 text-base-content "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                    {tag}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 "
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </div>
                ))}

                {selectedTags.length !== 4 && (
                  <select onChange={handleAddTag} className=" select w-30  select-sm" defaultValue={""}>
                    <option value="" disabled>
                      Add tag
                    </option>
                    {tags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 justify-start py-2 border-y bg-base-200/50 w-full px-4 border-base-200">
              {languageIcons
                .filter((icon) => icon.name === selectedItem)
                .map((icon) => (
                  <div key={icon.name} className="flex size-4 mr-2" style={{ fill: icon?.color }} dangerouslySetInnerHTML={{ __html: icon.svg }} />
                ))}
              {selectedItem}
            </div>
            <textarea
              {...register("code")}
              placeholder={errors.code?.message ?? "Paste your snippet here"}
              rows={10}
              className={`${
                errors.code?.message && "placeholder:text-error placeholder:bg-error/20  placeholder:p-1"
              } textarea  shadow-none resize-none focus-within:outline-none  border-none border-t-2 border-base-200 w-full rounded-none  focus-within:shadow-none`}
            />
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>close</button>
      </form>
    </dialog>
  );
};
