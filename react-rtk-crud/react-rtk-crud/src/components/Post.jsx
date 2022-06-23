import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost } from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const Post = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post } = useSelector((state) => ({ ...state.post }));

  const handleFetch = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Please enter valid post id");
    } else {
      dispatch(fetchPost({ id }));
      setId("");
    }
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
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post[0].body}</p>
                    <div className="d-flex align-items-end justify-content-end">
                      <button href="#" className="btn btn-primary">
                        Edit
                      </button>
                      <button href="#" className="btn btn-danger ms-4">
                        Delete
                      </button>
                    </div>
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
