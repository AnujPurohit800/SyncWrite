import { useState } from "react";
import { RenameDialog } from "@/components/atoms/Dialogs/RenameDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";
import { RemoveDialog } from "@/components/atoms/Dialogs/RemoveDialog";

export const DocumentMenu = ({ documentId, title, onNewTab }) => {
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const handleRenameClick = () => {
    setTimeout(() => {
      setShowRenameDialog(true);
    }, 0);
  };
  const handleDeleteClick = () => {
    setTimeout(() => {
      setShowRemoveDialog(true);
    }, 0);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleRenameClick}>
            <FilePenIcon className="size-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteClick}>
            <TrashIcon className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNewTab(documentId)}>
            <ExternalLinkIcon className="size-4 mr-2" />
            Open in a new tab
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showRenameDialog && (
        <RenameDialog
          documentId={documentId}
          initialTitle={title}
          open={showRenameDialog}
          onOpenChange={setShowRenameDialog}
        />
      )}
      {showRemoveDialog && (
        <RemoveDialog
          documentId={documentId}
          open={showRemoveDialog}
          onOpenChange={setShowRemoveDialog}
        />
      )}
    </>
  );
};
