import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/apiClient";
import { snippetData, userData } from "../types";
import { useSearchParams } from "react-router-dom";

export const useToggleLike = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const queryClient = useQueryClient();
  const toggleLikeApi = async (snippetId: string) => {
    const response = await axiosInstance.post("/likes/like-snippet", { snippetId });

    return response.data;
  };

  const { mutate: toggleLike } = useMutation({
    mutationKey: ["snippets"],
    mutationFn: toggleLikeApi,
    onSuccess: (data: { liked: boolean; snippetId: string }) => {
      queryClient.setQueryData(["snippets", q], (oldData: { snippets: snippetData[] } | undefined) => {
        if (!oldData) return [];
        return oldData?.snippets?.map((snippet) =>
          snippet.id === data.snippetId ? { ...snippet, likes: data.liked ? snippet.likes + 1 : snippet.likes - 1 } : snippet
        );
      });
      queryClient.setQueryData(["auth"], (oldData: userData) => {
        if (!oldData) return;

        return {
          ...oldData,
          likes: data.liked ? [...oldData.likes, data.snippetId] : oldData.likes.filter((like) => like !== data.snippetId),
        };
      });
    },
  });

  return { toggleLike };
};
