import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateDocument } from "@/hooks/apis/documents/useUpdateDocument";
import { useQueryClient } from "@tanstack/react-query";

export const RenameDialog = ({
  documentId,
  initialTitle,
  open,
  onOpenChange,
}) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(initialTitle);
  const { isPending, updateDocumentMutation } = useUpdateDocument();

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle, open]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      await updateDocumentMutation({ documentId, data: { title } });
      console.log("Document renamed successfully");
      queryClient.invalidateQueries(["documents"]);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to rename document", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document name"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
