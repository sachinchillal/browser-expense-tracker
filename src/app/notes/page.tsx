"use client";

import { CreateNoteComponent } from "@/components/NoteCreate";
import { NotesComponent } from "@/components/Notes";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "Browser Notepad";
  }, []);
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 p-4 md:p-8 w-full justify-center items-stretch">
      <div className="w-full md:flex-1 mb-4 md:mb-0">
        <NotesComponent />
      </div>
      <div className="w-full md:flex-1">
        <CreateNoteComponent />
      </div>
    </div>
  );
}
