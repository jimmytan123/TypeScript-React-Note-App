import * as React from 'react';
import { Note } from '../models/note.model';
import Notes from './NoteItem';

interface INoteListProps {
  notes: Note[];
  deleteNotes: (id: string) => void;
  handleEditClick: (id: string) => void;
  handleFlagClick: (id: string) => void;
}

const NoteList: React.FC<INoteListProps> = ({
  notes,
  deleteNotes,
  handleEditClick,
  handleFlagClick,
}) => {
  const renderNotes = (): JSX.Element[] => {
    return notes.map((note) => {
      return (
        <Notes
          note={note}
          key={note.id}
          handleDelete={deleteNotes}
          handleEditClick={handleEditClick}
          handleFlagClick={handleFlagClick}
        />
      );
    });
  };

  return (
    <>
      <h2 className="mt-3 mb-5">Notes</h2>
      <div>{renderNotes()}</div>
    </>
  );
};

export default NoteList;
