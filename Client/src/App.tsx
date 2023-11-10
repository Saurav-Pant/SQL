import { useState } from "react";
import "./App.css";

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
      } else {
        console.error("Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
