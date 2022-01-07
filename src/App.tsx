import { useState, useEffect } from 'react';
import { Note } from './models/note.model';
import { Container, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import CreateNotes from './components/CreateNotes';
import EditNotes from './components/EditNotes';
import NoteList from './components/NotesList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './components/Footer';

function App() {
  // state to keep track of note items, initial state based on the item in the local storage
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesInStorage = localStorage.getItem('notes');

    if (notesInStorage) {
      return JSON.parse(notesInStorage);
    } else {
      return [];
    }
  });

  // update localstorage when notes state changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // to keep track of if the app is in the editing mode
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  // to keep track of the note that is being currently editing
  const [curEditingNote, setCurEditingNote] = useState<Note[]>([]);

  // function to create new note item
  const addNotes = (title: string, text: string, color: string) => {
    setNotes([
      ...notes,
      {
        id: uuidv4().toString(),
        title: title,
        text: text,
        color: color,
        date: new Date().toLocaleDateString(),
        flag: false,
      },
    ]);

    const notify = () =>
      toast.success('Note added successfully!', {
        autoClose: 2000,
        hideProgressBar: true,
      });
    notify();
  };

  // function to delete new note item based on the note id
  const deleteNotes = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));

    const notify = () =>
      toast.error('Note deleted successfully!', {
        autoClose: 2000,
        hideProgressBar: true,
      });
    notify();
  };

  // function to edit(update) new note item based on the note id
  const updateNotes = (
    id: string,
    updatedTitle: string,
    updatedText: string,
    updatedColor: string
  ) => {
    setNotes(
      notes.map((note) => {
        return note.id === id
          ? {
              ...note,
              title: updatedTitle,
              text: updatedText,
              color: updatedColor,
              date: new Date().toLocaleDateString(),
            }
          : note;
      })
    );

    setIsEditing(false);

    const notify = () =>
      toast.success('Note updated successfully!', {
        autoClose: 2000,
        hideProgressBar: true,
      });
    notify();
  };

  // function to handle click event when user click the edit button
  const handleEditClick = (id: string) => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    //console.log(notes[noteIndex]);
    setIsEditing(true);
    setCurEditingNote([notes[noteIndex]]);

    const notify = () =>
      toast.info(`Editing Note: ${notes[noteIndex].title}`, {
        autoClose: 2000,
      });
    notify();
  };

  // function to handle click event when user click the red flag button
  const handleFlagClick = (id: string) => {
    setNotes(
      notes.map((note) => {
        return note.id === id
          ? {
              ...note,
              flag: !note.flag,
            }
          : note;
      })
    );
  };

  return (
    <>
      <Header />
      <ToastContainer newestOnTop />
      <Container className="mt-5">
        <Row>
          <Col md={5}>
            {isEditing ? (
              <EditNotes editItem={curEditingNote} updateNotes={updateNotes} />
            ) : (
              <CreateNotes addNotes={addNotes} />
            )}
          </Col>
          <Col md={7}>
            {notes.length === 0 ? (
              <div className='empty-list'>
                <h2 className="mt-3 mb-5">Notes</h2>
                <p>Empty... Please add some notes...</p>
              </div>
            ) : (
              <NoteList
                notes={notes}
                deleteNotes={deleteNotes}
                handleEditClick={handleEditClick}
                handleFlagClick={handleFlagClick}
              />
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default App;
