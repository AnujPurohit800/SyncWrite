import { Toolbar } from "@/components/molecules/Toolbar/Toolbar";
import { Editor } from "@/components/organisms/Editor/Editor";
import { Navbar } from "@/components/organisms/Navbar/Navbar";
import { useSocket } from "@/hooks/context/useSocket";
import { useEditorStore } from "@/store/useEditorStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const DocumentEditorPage = () => {
  const socket = useSocket();
  const { id: docId } = useParams();
  const { editor } = useEditorStore();
  useEffect(() => {
    if (!editor || !socket) {
      return;
    }
    socket.emit("join-doc", docId);
  }, [editor, socket, docId]);

  // Emit on update
  useEffect(() => {
    if (!editor || !socket) {
      return;
    }
    const updateHandler = () => {
      const json = editor.getJSON();
      socket.emit("doc-update", { docId, content: json });
    };

    editor.on("update", updateHandler);
    return () => {
      editor.off("update", updateHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, socket]);

  // Listen for incoming updates
  useEffect(() => {
    if (!editor || !socket) return;

    socket.on("doc-update", ({ content }) => {
      if (editor && content) {
        editor.commands.setContent(content, false);
      }
    });

    return () => socket.off("doc-update");
  }, [editor, socket]);
  return (
    <>
      <div className="min-h-screen  bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden h-[112px]">
          <Navbar />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor />
        </div>
      </div>
    </>
  );
};
