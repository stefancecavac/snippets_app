import { axiosInstance } from "../config/apiClient";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createSnippetData, snippetData } from "../types";

export const useGetAllSnippets = (q: string) => {
  const getAllSnippetsApi = async ({ pageParam = 1 }) => {
    const response = await axiosInstance.get("/snippets", {
      params: { q, page: pageParam },
    });
    return response.data;
  };

  const {
    data: snippetsData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["snippets", q],
    queryFn: ({ pageParam }) => getAllSnippetsApi({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
  });

  return {
    snippets: snippetsData?.pages.flatMap((page) => page.snippets) || [],
    snippetsLoading: isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};

export const useCreateSnippet = () => {
  const queryClient = useQueryClient();
  const postSnippetAPi = async (data: createSnippetData) => {
    const response = await axiosInstance.post("/snippets", data);

    return response.data as snippetData[];
  };

  const { mutate: createSnippet } = useMutation({
    mutationKey: ["snippets"],
    mutationFn: postSnippetAPi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
  });

  return { createSnippet };
};
