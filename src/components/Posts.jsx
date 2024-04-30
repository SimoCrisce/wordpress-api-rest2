import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Posts = function () {
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => fetchWP(), [currentPage]);
  const fetchWP = function () {
    fetch(`http://localhost/sito2/wordpress/wp-json/wp/v2/posts?page=${currentPage}&_embed=1`, {
      headers: {
        Authorization: "Basic " + btoa("simone:deUa DcRL UbBk JsAf SspL zwdB"),
      },
    })
      .then((response) => {
        if (response.ok) {
          setLastPage(parseInt(response.headers.get("X-WP-TotalPages")));
          return response.json();
        } else {
          throw new Error("Errore nel reperimento dei dati richiesti");
        }
      })
      .then((p) => {
        setPosts(p);
        console.log(p);
      })
      .catch((error) => console.log(error));
  };
  const changePage = (page) => {
    setCurrentPage(page);
  };

  function generatePaginationArray() {
    let paginationArr = [];
    for (let i = 1; i <= lastPage; i++) {
      paginationArr.push({
        n: i,
        active: currentPage === i,
      });
    }
    return paginationArr;
  }
  return (
    <Container>
      {posts.map((post) => {
        const deleteArticle = function () {
          fetch("http://localhost/sito2/wordpress/wp-json/wp/v2/posts/" + post.id, {
            method: "DELETE",
            headers: { Authorization: "Basic " + btoa("simone:deUa DcRL UbBk JsAf SspL zwdB") },
          }).then(() => {
            fetchWP();
          });
        };
        const date = new Date(post.date);

        return (
          <Row className="justify-content-between align-items-center" key={post.id}>
            <Col xs={8}>
              <div className="d-flex gap-3 border border-black p-3 mb-3">
                <img
                  width="200px"
                  src={
                    post._embedded["wp:featuredmedia"]
                      ? post._embedded["wp:featuredmedia"][0].source_url
                      : "https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile.png"
                  }
                  alt=""
                />
                <div className="d-flex flex-column align-items-start">
                  <span className="bg-danger text-white rounded-1 px-1">
                    {posts[0]._embedded["wp:term"][0][0].name}
                  </span>
                  <h2>
                    <Link to={"/posts/" + post.id} className="text-decoration-none">
                      {post.title.rendered}
                    </Link>
                  </h2>
                  <span>
                    Pubblicato il: {date.toLocaleDateString()} da {post._embedded.author[0].slug}
                  </span>
                  <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
                </div>
              </div>
            </Col>
            <Col sm={2}>
              <div className="d-flex justify-content-between">
                <Link to={"/post/" + post.id} className="btn btn-success">
                  Modifica
                </Link>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteArticle();
                  }}
                >
                  Elimina
                </Button>
              </div>
            </Col>
          </Row>
        );
      })}
      ;
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <span className="page-link" onClick={() => currentPage !== 1 && changePage(currentPage - 1)}>
              Previous
            </span>
          </li>
          {generatePaginationArray().map((page) => (
            <li key={page.n} className={`page-item ${page.active && "active"}`}>
              <span className="page-link" onClick={() => changePage(page.n)}>
                {page.n}
              </span>
            </li>
          ))}
          <li className={`page-item ${currentPage === lastPage && "disabled"}`}>
            <span className="page-link" onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}>
              Next
            </span>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default Posts;
