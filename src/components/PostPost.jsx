import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";

const PostPost = function () {
  const [form, setForm] = useState({
    title: "",
    status: "publish",
    content: "",
  });
  const postArticle = async function () {
    return fetch("http://localhost/sito2/wordpress/wp-json/wp/v2/posts/", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
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
      .catch((error) => console.log(error));
  };
  const navigate = useNavigate();

  const handleSubmit = async function (e) {
    e.preventDefault();
    await postArticle();
    e.target.reset();
    navigate("/posts");
  };
  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="title">Titolo</Form.Label>
              <Form.Control
                id="title"
                type="text"
                placeholder="Inserisci titolo"
                onChange={(e) =>
                  setForm((state) => ({
                    ...state,
                    title: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <FloatingLabel controlId="floatingTextarea" label="Articolo" className="mb-3">
              <Form.Control
                as="textarea"
                onChange={(e) =>
                  setForm((state) => ({
                    ...state,
                    content: e.target.value,
                  }))
                }
              />
            </FloatingLabel>
          </Col>
          <Button type="submit">Pubblica</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default PostPost;
