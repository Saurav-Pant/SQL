import React, { useState, useEffect } from 'react';

interface Note {
  id: number;
  title: string;
  desc: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [updateNoteId, setUpdateNoteId] = useState<number | null>(null);
  const [updateNoteTitle, setUpdateNoteTitle] = useState<string>('');
  const [updateNoteDesc, setUpdateNoteDesc] = useState<string>('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:8080/notes');
      if (response.ok) {
        const data: Note[] = await response.json();
        setNotes(data);
      } else {
        console.error('Failed to fetch notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleUpdateNote = (noteId: number) => {
    setUpdateNoteId(noteId);

    // Find the note to update
    const noteToUpdate = notes.find((note) => note.id === noteId);
    if (noteToUpdate) {
      setUpdateNoteTitle(noteToUpdate.title);
      setUpdateNoteDesc(noteToUpdate.desc);
    }
  };

  const handleUpdateNoteSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/notes/${updateNoteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updateNoteTitle,
          desc: updateNoteDesc,
        }),
      });

      if (response.ok) {
        // Update local state with the updated note
        const updatedNotes = notes.map((note) =>
          note.id === updateNoteId ? { ...note, title: updateNoteTitle, desc: updateNoteDesc } : note
        );
        setNotes(updatedNotes);

        // Close the modal
        setUpdateNoteId(null);
      } else {
        console.error('Failed to update note');
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted note from the local state
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setNotes(updatedNotes);
      } else {
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="notes-container">
      {notes.map((note) => (
        <div key={note.id} className="note">
          <h3>{note.title}</h3>
          <p>{note.desc}</p>
          <button className="update-btn" onClick={() => handleUpdateNote(note.id)}>Update</button>
          <button className="delete-btn" onClick={() => handleDeleteNote(note.id)}>Delete</button>
        </div>
      ))}

      {/* Update Note Modal */}
      {updateNoteId !== null && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setUpdateNoteId(null)}>
              &times;
            </span>
            <h2>Update Note</h2>
            <label>Title:</label>
            <input
              type="text"
              value={updateNoteTitle}
              onChange={(e) => setUpdateNoteTitle(e.target.value)}
              className="update-input"
            />
            <label>Description:</label>
            <textarea
              value={updateNoteDesc}
              onChange={(e) => setUpdateNoteDesc(e.target.value)}
              className="update-textarea"
            ></textarea>
            <button className="update-submit-btn" onClick={handleUpdateNoteSubmit}>Update Note</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
