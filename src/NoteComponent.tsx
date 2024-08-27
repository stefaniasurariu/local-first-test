// src/NoteComponent.tsx
import React, { useState, useEffect } from 'react';
import { getNotes, addNote, updateNote, deleteNote, syncNotesWithServer } from './NoteService';
import { Note } from './db';

const NoteComponent: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     const allNotes = await getNotes();
  //     setNotes(allNotes);
  //   };

  //   fetchNotes();
  // }, []);


  ///

  useEffect(() => {
    const fetchAndSyncNotes = async () => {
      await syncNotesWithServer();
      const allNotes = await getNotes();
      setNotes(allNotes);
    };

    fetchAndSyncNotes();
  }, []);

  const handleAddNote = async () => {
    await addNote(title, content);
    setTitle('');
    setContent('');
    setNotes(await getNotes());
  };

  // Rest of the component...

  return (
    <div>
      <h1>Notes</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAddNote}>Add Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteComponent;
