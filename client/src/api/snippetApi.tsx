import { axiosInstance } from "../config/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createSnippetData, snippetData } from "../types";

export const useGetAllSnippets = (q: string) => {
  const getAllSnippetsApi = async () => {
    const response = await axiosInstance.get(`/snippets`, { params: { q } });

    return response.data as snippetData[];
  };

  const { data: snippets, isPending: snippetsLoading } = useQuery({
    queryKey: ["snippets", q],
    queryFn: getAllSnippetsApi,
  });

  return { snippets, snippetsLoading };
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
