"use client";

import ShowNotes from "@/components/ShowNotes";
import CreateNote from "../components/CreateNote";

export default function Home() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 p-4 md:p-8 w-full justify-center items-stretch">
      <div className="w-full md:flex-1 mb-4 md:mb-0">
        <ShowNotes />
      </div>
      <div className="w-full md:flex-1">
        <CreateNote />
      </div>
    </div>
  );
}
