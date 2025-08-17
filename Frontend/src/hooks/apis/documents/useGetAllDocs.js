import { getAllDocumentsRequest } from "@/api/documents";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllDocs = (limit = 10, offset = 0) => {
  const { auth } = useAuth();

  const {
    isPending,
    isSuccess,
    error,
    data: documents,
  } = useQuery({
    queryKey: ["documents", auth.token, limit, offset],
    queryFn: () => getAllDocumentsRequest(auth.token, limit, offset),
    onError: (error) => {
      console.error("Failed to fetch documents", error);
      toast.error("Failed to fetch documents");
    },
  });

  return { isPending, isSuccess, error, documents };
};
