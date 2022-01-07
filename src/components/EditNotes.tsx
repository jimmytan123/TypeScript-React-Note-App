import { useState } from 'react';
import { Note } from '../models/note.model';
import { Alert, Button, Form } from 'react-bootstrap';

interface IEditNotesProps {
  editItem: Note[];
  updateNotes: (
    id: string,
    updatedTitle: string,
    updatedText: string,
    updatedColor: string
  ) => void;
}

const EditNotes: React.FC<IEditNotesProps> = ({ editItem, updateNotes }) => {
  const [error, setError] = useState<string>('');

  const [title, setTitle] = useState<string>(editItem[0].title);
  const [text, setText] = useState<string>(editItem[0].text);
  const [color, setColor] = useState<string>(editItem[0].color);

  const handleEditFormSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (title === '' || text === '') {
      return setError('All fields must be filled');
    }

    setError('');

    updateNotes(editItem[0].id, title, text, color);

    // clear form
    setTitle('');
    setText('');
    setColor('');
  };

  return (
    <>
      <h2 className="mt-3">Update Notes</h2>
      <h3>Title: {editItem[0].title}</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleEditFormSubmit} className="mt-3 mb-3">
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            type="text"
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Text</Form.Label>
          <Form.Control
            value={text}
            as="textarea"
            rows={3}
            placeholder="Enter Notes"
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="colorInput">Color</Form.Label>
          <Form.Control
            value={color}
            type="color"
            id="colorInput"
            list="presetColors"
            title="Choose note color"
            onChange={(e) => setColor(e.target.value)}
          />
          <datalist id="presetColors">
            <option value="#fff1c2" />
            <option value="#ffb3c1" />
            <option value="#cbeef3" />
          </datalist>
        </Form.Group>
        <Button type="submit" variant="success">
          Update
        </Button>
      </Form>
    </>
  );
};

export default EditNotes;
