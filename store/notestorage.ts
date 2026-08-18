import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import {
  persist,
  createJSONStorage,
} from 'zustand/middleware';

export type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  isFavourite: boolean;
  createdAt: string;
};

type NoteStore = {
  notes: Note[];

  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateNote: (
    id: string,
    updatedNote: Partial<Note>
  ) => void;
  toggleFavourite: (id: string) => void;
  clearAllNotes: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [],

      addNote: (note) =>
        set((state) => ({
          notes: [note, ...state.notes],
        })),

      updateNote: (id, updatedNote) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  ...updatedNote,
                }
              : note
          ),
        })),

      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter(
            (note) => note.id !== id
          ),
        })),

      clearAllNotes: () =>
        set({
          notes: [],
        }),

      toggleFavourite: (id) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  isFavourite: !note.isFavourite,
                }
              : note
          ),
        })),
    }),

    {
      name: 'quicknotes-storage',
      storage: createJSONStorage(
        () => AsyncStorage
      ),
    }
  )
);