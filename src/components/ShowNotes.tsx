import React, { useEffect, useState } from "react";
import { useGlobalData } from "../providers/GlobalDataProvider";
import { Note, STATE_STORAGE_KEY_SORT_DIRECTION, STATE_STORAGE_KEY_SORT_TYPE } from "@/services/interfaces";

function formatDate(id: number) {
  const date = new Date(id);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
enum SORT_DIRECTIONS {
  ASC = "ASC",
  DESC = "DESC"
}
type SortDirection = keyof typeof SORT_DIRECTIONS;
enum SORT_TYPES {
  TITLE = "TITLE",
  DATE = "DATE"
}
type SortType = keyof typeof SORT_TYPES;

const ShowNotes: React.FC = () => {
  const { notes, deleteNote } = useGlobalData();
  const [sortedNotes, setSortedNotes] = useState(notes);
  const [sortDirection, setSortDirection] = useState<SortDirection>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(STATE_STORAGE_KEY_SORT_DIRECTION) as SortDirection) || SORT_DIRECTIONS.DESC;
    }
    return SORT_DIRECTIONS.DESC;
  });
  const [sortType, setSortType] = useState<SortType>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(STATE_STORAGE_KEY_SORT_TYPE) as SortType) || SORT_TYPES.DATE;
    }
    return SORT_TYPES.DATE;
  });

  useEffect(() => {
    sortNotes(notes, sortType, sortDirection);
  }, [notes]);

  const sortNotes = (_notes: Note[], _sortType: SortType, _sortDirection: SortDirection) => {
    if (_sortType === SORT_TYPES.DATE) {
      _notes.sort((a, b) =>
        _sortDirection === SORT_DIRECTIONS.DESC ? b.id - a.id : a.id - b.id
      );
    } else if (_sortType === SORT_TYPES.TITLE) {
      _notes.sort((a, b) =>
        _sortDirection === SORT_DIRECTIONS.DESC
          ? b.note.localeCompare(a.note)
          : a.note.localeCompare(b.note)
      );
    }
    setSortedNotes(_notes);
  }

  const handleSortByDate = () => {
    const newSortDirection = sortDirection === SORT_DIRECTIONS.DESC ? SORT_DIRECTIONS.ASC : SORT_DIRECTIONS.DESC;

    sortNotes(sortedNotes, SORT_TYPES.DATE, newSortDirection);

    setSortType(SORT_TYPES.DATE);
    setSortDirection(newSortDirection);
    if (typeof window !== "undefined") {
      localStorage.setItem(STATE_STORAGE_KEY_SORT_TYPE, SORT_TYPES.DATE);
      localStorage.setItem(STATE_STORAGE_KEY_SORT_DIRECTION, newSortDirection);
    }
  };
  const handleSortByTitle = () => {
    const newSortDirection = sortDirection === SORT_DIRECTIONS.DESC ? SORT_DIRECTIONS.ASC : SORT_DIRECTIONS.DESC;

    sortNotes(sortedNotes, SORT_TYPES.TITLE, newSortDirection);

    setSortType(SORT_TYPES.TITLE);
    setSortDirection(newSortDirection);
    if (typeof window !== "undefined") {
      localStorage.setItem(STATE_STORAGE_KEY_SORT_TYPE, SORT_TYPES.TITLE);
      localStorage.setItem(STATE_STORAGE_KEY_SORT_DIRECTION, newSortDirection);
    }
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
          <span className="text-xs text-gray-500 ml-2">({sortedNotes.length})</span>
        </h2>
        <i className="ms-auto"></i>
        <button type="button" title="Sort by Date" onClick={handleSortByDate}
          className={`px-0.5 rounded${sortType === SORT_TYPES.DATE ? ' bg-green-900' : ''}`}>&#128290;</button>
        <button type="button" title="Sort by Title" onClick={handleSortByTitle}
          className={`px-0.5 rounded ${sortType === SORT_TYPES.TITLE ? 'bg-green-900' : ''}`}>&#128288;</button>
      </div>
      <ul className="space-y-2">
        {sortedNotes.map(note => (
          <li key={note.id} className="relative rounded shadow p-2 border border-gray-200 dark:border-gray-700">
            <div className="mb-2">{note.note}</div>
            <div className="flex gap-2 items-center">
              <div className="text-xs text-gray-500">{formatDate(note.id)}</div>
              <i className="ms-auto"></i>
              <button
                className="p-1 hover:bg-red-900 rounded"
                title="Delete Note"
                onClick={() => deleteNote(note.id)}
                aria-label="Delete Note"
              >
                &#128465;
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

export default ShowNotes;
