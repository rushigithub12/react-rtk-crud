import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";

function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
