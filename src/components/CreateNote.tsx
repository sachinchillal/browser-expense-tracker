import { useGlobalData } from "@/providers/GlobalDataProvider";
import React, { useState } from "react";

export default function CreateNote() {
  const [note, setNote] = useState("");
  const { saveNote } = useGlobalData();

  const handleSave = () => {
    const n = note.trim();
    if (n) {
      saveNote(n);
      setNote("");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 border dark:border-gray-700 rounded shadow">
      <textarea
        className="border p-2 rounded resize-none min-h-[80px] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        placeholder="Type your note here..."
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSave}
        disabled={!note.trim()}
      >
        Save Note
      </button>
    </div>
  );
}
