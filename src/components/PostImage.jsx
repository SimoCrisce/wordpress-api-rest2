import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const PostImage = function () {
  const [image, setImage] = useState(null);

  const formData = new FormData();
  formData.append("file", image);

  const postArticleImage = function () {
    // l'immagine viene aggiunta nei media di wordpress
    fetch("http://localhost/sito2/wordpress/wp-json/wp/v2/media", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Basic " + btoa("simone:deUa DcRL UbBk JsAf SspL zwdB"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel reperimento dei dati richiesti");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  const navigate = useNavigate();

  const handleSubmit = async function (e) {
    e.preventDefault();
    postArticleImage();
    e.target.reset();
  };
  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="file">File</Form.Label>
              <Form.Control
                id="file"
                type="file"
                placeholder="Inserisci titolo"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
          </Col>

          <Button type="submit">Pubblica</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default PostImage;
