"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Note, STATE_STORAGE_KEY } from "@/services/interfaces";

type GlobalDataContextType = {
  notes: Note[];
  saveNote: (note: string) => void;
  deleteNote: (id: number) => void;
};

// 1. Create the context with a default value
const GlobalDataContext = createContext<GlobalDataContextType>({
  notes: [],
  saveNote: () => { },
  deleteNote: () => { },
});


// 2. Create the Provider component that will hold the actual state logic
export function GlobalDataProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STATE_STORAGE_KEY);
      if (stored) {
        setNotes(JSON.parse(stored));
      }
    }
  }, []);

  const saveNote = (note: string) => {
    const newNote: Note = {
      id: Date.now(),
      note,
    };
    setNotes(prev => {
      const updatedNotes = [...prev, newNote];
      if (typeof window !== "undefined") {
        localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(updatedNotes));
      }
      return updatedNotes;
    });
  };

  const deleteNote = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <GlobalDataContext.Provider value={{ notes, saveNote, deleteNote }}>
      {children}
    </GlobalDataContext.Provider>
  );
}
// 3. Create a custom hook for easy access to the context
export function useGlobalData() {
  const context = useContext(GlobalDataContext);
  // if (!context) {
  //   throw new Error("useGlobalData must be used within a GlobalDataProvider");
  // }
  return context;
}