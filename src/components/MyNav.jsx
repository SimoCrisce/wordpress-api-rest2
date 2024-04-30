import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const MyNav = function () {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-3">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <div>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </div>
          <div>
            <Link to="/posts" className="nav-link">
              I miei post
            </Link>
          </div>
          <div>
            <Link to="/post" className="nav-link">
              Pubblica un articolo
            </Link>
          </div>
          <div>
            <Link to="/postImg" className="nav-link">
              Aggiungi immagine
            </Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNav;
