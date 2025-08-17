import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteDocument } from "@/hooks/apis/documents/useDeleteDocument";
import { useQueryClient } from "@tanstack/react-query";

export const RemoveDialog = ({ documentId, open, onOpenChange }) => {
  const { isPending, deleteDocumentMutation } = useDeleteDocument();
  const queryClient = useQueryClient();
  async function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteDocumentMutation(documentId);
      console.log("");
      queryClient.invalidateQueries(["documents"]);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete document", error);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
