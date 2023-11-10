import { useState } from "react";
import Notes from "./components/Notes"

function App() {
  const [notesTitle, setNotesTitle] = useState("");
  const [notesDesc, setNotesDesc] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: notesTitle, desc: notesDesc }),
      });

      if (response.ok) {
        console.log("Note added successfully");
        window.location.reload();
      } else {
        console.error("Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
      <Notes/>
      <div className="NotesForm"> 
      <form onSubmit={handleSubmit}>
        <label htmlFor="notesTitle">Add Notes Title</label>
        <input
          type="text"
          id="notesTitle"
          value={notesTitle}
          onChange={(e) => setNotesTitle(e.target.value)}
        />
        <label htmlFor="notesDesc">Add Notes Description</label>
        <input
          type="text"
          id="notesDesc"
          value={notesDesc}
          onChange={(e) => setNotesDesc(e.target.value)}
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default App;
