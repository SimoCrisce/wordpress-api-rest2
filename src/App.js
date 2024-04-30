import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Posts from "./components/Posts";
import MyNav from "./components/MyNav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SinglePost from "./components/SinglePost";
import PostPost from "./components/PostPost";
import EditPost from "./components/EditPost";
import PostImage from "./components/PostImage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/post" element={<PostPost />} />
          <Route path="/post/:id" element={<EditPost />} />
          <Route path="/postImg" element={<PostImage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
