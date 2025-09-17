"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { createNote, setCurrentNote, updateNote } from "@/store/features/notesSlice";

export function CreateNoteComponent() {
  const _notes = useSelector((state: RootState) => state.notes.notes);
  const _currentNoteId = useSelector((state: RootState) => state.notes.currentNoteId);
  const dispatch = useDispatch();

  const [note, setNote] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);

  useEffect(() => {
    if (_currentNoteId) {
      const currentNote = _notes.find(n => n.id === _currentNoteId);
      if (currentNote) {
        setNote(currentNote.note);
      } else {
        // might have been deleted
        setNote("");
        dispatch(setCurrentNote({ id: null }));
      }
    } else {
      setNote("");
    }
    setCurrentNoteId(_currentNoteId);
  }, [_currentNoteId, _notes]);

  const handleSave = () => {
    const n = note.trim();
    if (n) {
      if (_currentNoteId) {
        dispatch(updateNote({ id: _currentNoteId, note: n }));
      } else {
        dispatch(createNote({ note: n }));
      }
      setNote("");
    }
  };
  const handleCancel = () => {
    dispatch(setCurrentNote({ id: null }));
  }

  return (
    <div className="flex flex-col gap-2 p-4 border dark:border-gray-700 rounded shadow">
      <textarea
        className="border p-2 rounded resize-none min-h-[80px] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        placeholder="Type your note here..."
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        onClick={handleSave}
        disabled={!note.trim()}
      >
        {currentNoteId ? 'Update Note' : 'Create Note'}
      </button>
      {currentNoteId && (
        <button title="Cancel Edit"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-900"
          onClick={handleCancel}
        >Cancel Edit
        </button>
      )}
    </div>
  );
}
