"use client";
import React, { useEffect, useState } from "react";
import { Note, SORT_BY, SORT_ORDER, SortBy, SortOrder } from "@/services/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { deleteNote, setCurrentNote, setSort } from "@/store/features/notesSlice";
import { formatDate } from "@/services/utilities";


export function NotesComponent() {
  const _notes = useSelector((state: RootState) => state.notes.notes);
  const _sortBy = useSelector((state: RootState) => state.notes.sortBy);
  const _sortOrder = useSelector((state: RootState) => state.notes.sortOrder);
  const dispatch = useDispatch();

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    sortNotes([..._notes], _sortBy, _sortOrder);
  }, [_notes, _sortBy, _sortOrder]);

  const sortNotes = (__notes: Note[], __sortBy: SortBy, __sortOrder: SortOrder) => {
    if (__sortBy === SORT_BY.DATE) {
      __notes.sort((a, b) =>
        __sortOrder === SORT_ORDER.DESC ? b.id - a.id : a.id - b.id
      );
    } else if (__sortBy === SORT_BY.TITLE) {
      __notes.sort((a, b) =>
        __sortOrder === SORT_ORDER.DESC
          ? b.note.localeCompare(a.note)
          : a.note.localeCompare(b.note)
      );
    }
    setNotes(__notes);
  }

  const handleSortByDate = () => {
    let newSortOrder = _sortOrder;
    if (_sortBy === SORT_BY.DATE) {
      newSortOrder = _sortOrder === SORT_ORDER.DESC ? SORT_ORDER.ASC : SORT_ORDER.DESC;
    }
    dispatch(setSort({ sortBy: SORT_BY.DATE, sortOrder: newSortOrder }));
  };
  const handleSortByTitle = () => {
    let newSortOrder = _sortOrder;
    if (_sortBy === SORT_BY.TITLE) {
      newSortOrder = _sortOrder === SORT_ORDER.DESC ? SORT_ORDER.ASC : SORT_ORDER.DESC;
    }
    dispatch(setSort({ sortBy: SORT_BY.TITLE, sortOrder: newSortOrder }));
  };

  if (!notes.length) {
    return (
      <div className="p-4 text-gray-500">No notes yet.</div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold mb-4">Your Notes
          <span className="text-xs text-gray-500 ml-2">({notes.length})</span>
        </h2>
        <i className="ms-auto"></i>
        <button type="button" title="Sort by Date" onClick={handleSortByDate}
          className={`px-0.5 rounded${_sortBy === SORT_BY.DATE ? ' bg-green-900' : ''}`}>&#128290;</button>
        <button type="button" title="Sort by Title" onClick={handleSortByTitle}
          className={`px-0.5 rounded ${_sortBy === SORT_BY.TITLE ? 'bg-green-900' : ''}`}>&#128288;</button>
      </div>
      <ul className="space-y-2">
        {notes.map(note => (
          <li key={note.id} className="relative rounded shadow p-2 border border-gray-200 dark:border-gray-700">
            <div className="mb-2">{note.note}</div>
            <div className="flex gap-2 items-center">
              <div className="text-xs text-gray-500">{formatDate(note.id)}</div>
              <i className="ms-auto"></i>
              <button
                className="p-1 hover:bg-red-900 rounded"
                title="Delete Note"
                onClick={() => dispatch(deleteNote(note))}
                aria-label="Delete Note"
              >
                &#128465;
              </button>
              <button
                className="p-1 hover:bg-blue-900 rounded"
                title="Edit Note"
                onClick={() => dispatch(setCurrentNote({ id: note.id }))}
                aria-label="Edit Note"
              >
                &#9999;
              </button>
              <button
                className="p-1 hover:bg-green-900 rounded"
                title="Copy Note"
                onClick={() => navigator.clipboard.writeText(note.note)}
                aria-label="Copy Note"
              >
                &#128196;
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
