import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createPost,
  deletePost,
  fetchPost,
  setEdit,
  updatePost,
} from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const Post = () => {
  const [id, setId] = useState("");
  const [textBody, setTextBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.post,
  }));

  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]); // if body changes we set Text value

  //get posts handler
  const handleFetch = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Please enter valid post id");
    } else {
      dispatch(fetchPost({ id }));
      setId("");
    }
  };

  //handle delete button
  const handleDelete = () => {
    dispatch(deletePost({ id: post[0].id }));
    window.alert("Post deleted !");
  };

  return (
    <>
      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-md-8">
          <form action="">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Search By ID:
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                value={id}
                onChange={(e) => setId(e.target.value)}
                aria-describedby="emailHelp"
              />
            </div>
            <button
              onClick={handleFetch}
              type="submit"
              className="btn btn-primary"
            >
              Fetch Post
            </button>
            <button
              onClick={() => navigate("/createpost")}
              type="button"
              className="btn btn-warning ms-4"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {post.length > 0 && (
              <>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <textarea
                          value={textBody}
                          onChange={(e) => setTextBody(e.target.value)}
                          className="form-control"
                          id="floatingTextarea"
                        />
                        <div className="d-flex align-items-end justify-content-end">
                          <button
                            href="#"
                            className="btn btn-primary"
                            onClick={() => {
                              dispatch(
                                updatePost({
                                  id: post[0].id,
                                  title: post[0].title,
                                  body: textBody,
                                })
                              );
                              dispatch(setEdit({body: "", edit: false }));
                            }}
                          >
                            Save
                          </button>
                          <button
                            href="#"
                            className="btn btn-danger ms-4"
                            onClick={() =>
                              dispatch(setEdit({ edit: false, body: "" }))
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="card-text">{post[0].body}</p>
                      </>
                    )}
                    {!edit && (
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                          href="#"
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          href="#"
                          className="btn btn-danger ms-4"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Post;
