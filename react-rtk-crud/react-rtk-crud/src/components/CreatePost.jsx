import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false);
  const { loading, post } = useSelector((state) => ({ ...state.post }));
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //post function
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };

  //show created post
  const showCreatedPost = () => {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <form>
        <h2 className="text-center bg-dark text-white p-2">Create Post</h2>
        <div className="mb-3 mt-4">
          <input
            type="email"
            placeholder="Enter Post title here"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </div>
        <div className="form-floating">
          <textarea
            value={body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            className="form-control"
            placeholder="add post description"
            id="floatingTextarea"
          />
          <label htmlFor="floatingTextarea">add post description</label>
        </div>
        <div className=" mt-4 d-flex align-items-end justify-content-end">
          <button
            type="submit"
            href="#"
            className="btn btn-danger"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            onClick={() => navigate("/")}
            href="#"
            className="btn btn-primary ms-4"
          >
            Go Home
          </button>
        </div>
      </form>
      <div className="mt-4">{showPost && <div>{showCreatedPost()}</div>}</div>
    </>
  );
};

export default CreatePost;
