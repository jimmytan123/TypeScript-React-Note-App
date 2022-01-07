import { useRef, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

interface ICreateNotesProps {
  addNotes: (title: string, text: string, color: string) => void;
}

const CreateNotes: React.FC<ICreateNotesProps> = ({ addNotes }) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const colorRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string>('');

  const handleFormSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (titleRef.current?.value === '' || textRef.current?.value === '') {
      return setError('All fields must be filled');
    }

    setError('');

    addNotes(
      titleRef.current!.value,
      textRef.current!.value,
      colorRef.current!.value
    );

    // clear form
    titleRef.current!.value = '';
    textRef.current!.value = '';
    colorRef.current!.value = '#fff1c2';
  };

  return (
    <>
      <h2 className="mt-3">Create Notes</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleFormSubmit} className="mt-3 mb-3">
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control ref={titleRef} type="text" placeholder="Enter Title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Text</Form.Label>
          <Form.Control
            ref={textRef}
            as="textarea"
            rows={3}
            placeholder="Enter Notes"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="colorInput">Color</Form.Label>
          <Form.Control
            ref={colorRef}
            type="color"
            id="colorInput"
            list="presetColors"
            title="Choose note color"
            defaultValue="#fff1c2"
          />
          <datalist id="presetColors">
            <option value="#fff1c2" />
            <option value="#ffb3c1" />
            <option value="#cbeef3" />
          </datalist>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CreateNotes;
