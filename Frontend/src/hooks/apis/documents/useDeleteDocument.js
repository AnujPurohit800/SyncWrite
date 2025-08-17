import { deleteDocumentRequest } from "@/api/documents";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteDocument = () => {
  const { auth } = useAuth();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: deleteDocumentMutation,
  } = useMutation({
    mutationFn: (documentId) => deleteDocumentRequest(documentId, auth.token),
    onError: (error) => {
      console.error("Failed to delete document", error);
      toast.error("Failed to delete document");
    },
    onSuccess: () => {
      console.log("Successfully deleted document");
      toast.success("Document deleted successfully");
    },
  });

  return { isPending, isSuccess, error, deleteDocumentMutation };
}