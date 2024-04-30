import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";

const SinglePost = function () {
  const [post, setPost] = useState(null);
  const params = useParams();

  useEffect(() => fetchPost(), [params.id]);
  const fetchPost = function () {
    fetch("http://localhost/sito2/wordpress/wp-json/wp/v2/posts/" + params.id + "?_embed=1", {
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
      .then((singlePost) => {
        setPost(singlePost);
        console.log(singlePost);
      })
      .catch((error) => console.log(error));
  };
  const date = new Date(post && post.date);
  return (
    post && (
      <Container>
        <span className="bg-danger text-white rounded-1 px-1">{post._embedded["wp:term"][0][0].name}</span>
        <h1>{post.title.rendered}</h1>
        <p>
          Pubblicato il: {date.toLocaleDateString()} da {post._embedded.author[0].slug}
        </p>
        <img
          width="500px"
          src={
            post._embedded["wp:featuredmedia"]
              ? post._embedded["wp:featuredmedia"][0].source_url
              : "https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile.png"
          }
          alt=""
        />
        <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
      </Container>
    )
  );
};

export default SinglePost;
