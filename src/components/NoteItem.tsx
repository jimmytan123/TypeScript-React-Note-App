import { Button, Card } from 'react-bootstrap';
import { Note } from '../models/note.model';
import { FaFlag, FaRegFlag } from 'react-icons/fa';

interface INotesProps {
  note: Note;
  handleDelete: (id: string) => void;
  handleEditClick: (id: string) => void;
  handleFlagClick: (id: string) => void;
}

const Notes: React.FC<INotesProps> = ({
  note,
  handleDelete,
  handleEditClick,
  handleFlagClick,
}) => {
  return (
    <div className="mb-3">
      <Card
        style={{ backgroundColor: note.color }}
        className={note.flag ? 'flag' : ''}
      >
        <Card.Body>
          <div className="note-card-header">
            <Card.Title>{note.title}</Card.Title>
            <button onClick={() => handleFlagClick(note.id)}>
              {note.flag ? <FaFlag /> : <FaRegFlag />}
            </button>
          </div>
          <Card.Text>{note.text}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">{note.date}</Card.Subtitle>
          <Button
            onClick={() => handleDelete(note.id)}
            className="mt-2"
            variant="danger"
          >
            Delete
          </Button>
          <Button
            onClick={() => handleEditClick(note.id)}
            className="mt-2 ms-2"
            variant="success"
          >
            Edit
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Notes;
