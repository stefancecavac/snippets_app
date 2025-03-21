import { axiosInstance } from "../config/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createSnippetData, snippetData } from "../types";

export const useGetAllSnippets = () => {
  const getAllSnippetsApi = async () => {
    const response = await axiosInstance.get("/snippets");

    return response.data as snippetData[];
  };

  const { data: snippets } = useQuery({
    queryKey: ["snippets"],
    queryFn: getAllSnippetsApi,
  });

  return { snippets };
};

export const useCreateSnippet = () => {
  const postSnippetAPi = async (data: createSnippetData) => {
    const response = await axiosInstance.post("/snippets", data);

    return response.data as snippetData[];
  };

  const { mutate: createSnippet } = useMutation({
    mutationKey: ["snippets"],
    mutationFn: postSnippetAPi,
  });

  return { createSnippet };
};
