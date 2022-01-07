import * as React from 'react';
import { Container, Navbar } from 'react-bootstrap';

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>TypeScript React Note-Taker</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
