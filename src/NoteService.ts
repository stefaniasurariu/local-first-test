// src/NoteService.ts
import { db, Note } from './db';

export const getNotes = async (): Promise<Note[]> => {
  return await db.notes.toArray();
};

export const updateNote = async (id: number, title: string, content: string) => {
  await db.notes.update(id, { title, content, updatedAt: new Date() });
};

export const deleteNote = async (id: number) => {
  await db.notes.delete(id);
};

const SERVER_URL = 'https://local-first-test-3.onrender.com';

export const syncNotesWithServer = async () => {
  const response = await fetch(`${SERVER_URL}/notes`);
  const serverNotes: Note[] = await response.json();

  const localNotes = await db.notes.toArray();

  // Sync logic: This is a simplified example; you'd handle conflicts and duplicates in a real app
  serverNotes.forEach(async (serverNote) => {
    const localNote = localNotes.find(n => n.id === serverNote.id);
    if (!localNote) {
      await db.notes.add(serverNote);
    } else if (new Date(serverNote.updatedAt) > new Date(localNote.updatedAt)) {
      await db.notes.update(localNote.id!, serverNote);
    }
  });
};

export const addNote = async (title: string, content: string) => {
  const note = { title, content, updatedAt: new Date() };
  const response = await fetch(`${SERVER_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  const newNote = await response.json();
  await db.notes.add(newNote);
};