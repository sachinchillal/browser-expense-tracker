import { createSlice } from '@reduxjs/toolkit';
import { Note, SORT_BY, SORT_ORDER, SortBy, SortOrder } from "@/services/interfaces";

interface NotesState {
  notes: Note[],
  currentNoteId: number | null,
  sortBy: SortBy,
  sortOrder: SortOrder
}

const initialState: NotesState = {
  notes: new Array<Note>(),
  currentNoteId: null,
  sortBy: SORT_BY.DATE,
  sortOrder: SORT_ORDER.DESC
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote: (state, action) => {
      const id = Date.now();
      state.notes.push({ id, note: action.payload.note, updatedAt: id });
    },
    updateNote: (state, action: { payload: { id: number; note: string } }) => {
      const note = state.notes.find(note => note.id === action.payload.id);
      if (note) {
        note.note = action.payload.note;
        note.updatedAt = Date.now();
      }
    },
    deleteNote: (state, action: { payload: { id: number } }) => {
      state.notes = state.notes.filter(note => note.id !== action.payload.id);
    },
    setCurrentNote: (state, action: { payload: { id: number | null } }) => {
      state.currentNoteId = action.payload.id;
    },
    // sort
    /**
     * @deprecated Use setSort instead
     */
    setSortBy: (state, action: { payload: { sortBy: SortBy } }) => {
      state.sortBy = action.payload.sortBy;
    },
    /**
     * @deprecated Use setSort instead
     */
    setSortOrder: (state, action: { payload: { sortOrder: SortOrder } }) => {
      state.sortOrder = action.payload.sortOrder;
    },
    setSort: (state, action: { payload: { sortBy: SortBy, sortOrder: SortOrder } }) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    }
  },
});

export const { createNote, updateNote, deleteNote, setCurrentNote, setSort } = notesSlice.actions;
export default notesSlice.reducer;
