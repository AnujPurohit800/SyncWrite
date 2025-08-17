import { updateDocumentRequest } from "@/api/documents";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateDocument = () => {
  const { auth } = useAuth();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: updateDocumentMutation,
  } = useMutation({
    mutationFn: ({ documentId, data }) =>
      updateDocumentRequest(
        documentId,
        {  title: data.title || "Untitled Document" },
        auth.token
      ),
    onError: (error) => {
      console.error("Failed to update document", error);
      toast.error("Failed to update document");
    },
    onSuccess: (data) => {
      console.log("Successfully updated document", data);
      toast.success("Document updated successfully");
    },
  });

  return { isPending, isSuccess, error, updateDocumentMutation };
};
