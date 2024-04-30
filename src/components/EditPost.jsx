import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = function () {
  const [post, setPost] = useState(null);
  const params = useParams();
  useEffect(() => {
    fetch("http://localhost/sito2/wordpress/wp-json/wp/v2/posts/" + params.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel reperimento dei dati richiesti");
        }
      })
      .then((singlePost) => {
        setPost({
          title: singlePost.title.rendered,
          content: singlePost.content.rendered,
        });
        console.log(singlePost);
      })
      .catch((error) => console.log(error));
  }, []);
  const editArticle = async function () {
    return fetch("http://localhost/sito2/wordpress/wp-json/wp/v2/posts/" + params.id, {
      method: "PUT",
      body: JSON.stringify(post),
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
    await editArticle();
    e.target.reset();
    navigate("/posts");
  };
  return (
    <Container>
      <Row>
        {post && (
          <Form onSubmit={handleSubmit}>
            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="title">Titolo</Form.Label>
                <Form.Control
                  id="title"
                  type="text"
                  placeholder="Inserisci titolo"
                  onChange={(e) =>
                    setPost((state) => ({
                      ...state,
                      title: e.target.value,
                    }))
                  }
                  value={post.title}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <FloatingLabel controlId="floatingTextarea" label="Articolo" className="mb-3">
                <Form.Control
                  as="textarea"
                  onChange={(e) =>
                    setPost((state) => ({
                      ...state,
                      content: e.target.value,
                    }))
                  }
                  value={post.content}
                />
              </FloatingLabel>
            </Col>
            <Button variant="success" type="submit">
              Modifica
            </Button>
          </Form>
        )}
      </Row>
    </Container>
  );
};

export default EditPost;
