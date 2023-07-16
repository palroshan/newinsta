import React, { useEffect, useState } from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


export default function MyFollowingPost() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/64/64572.png"

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState();
  const [item, setItem] = useState([]);

  const notifyA = (data) => toast.error(data);
  const notifyB = (data) => toast.success(data);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }
    // Fetching all the posts
    fetch("/myfollowingpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

  // show and hide comment
  const toggleComment =(posts)=>{
    if(show){
      setShow(false);
    } else {
      setShow(true);
      setItem(posts)
      console.log(item)
    }
  }

  const likePost = (id) => {
    // Fetching the likes
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
      })
      .catch((error) => console.log("Error in likepost"));
  };

  const unlikePost = (id) => {
    // Fetching the likes
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
      })
      .catch((error) => console.log("Error in unlikepost"));
  };
  // fuction to make comment
  const makeComment = (comment, id) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: comment,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("")
        notifyB("Comment posted")
        console.log(result)})
      .catch((error) => console.log("Error in likepost"));
  };

  return (
    <div className="home">
      {data.map((posts) => {
        return (
          <div className="card">
            <div className="card-header">
              <div className="card-pic">
                <img
                  src={
                    posts.postedBy.Photo?posts.postedBy.Photo:picLink
                  }
                  alt=""
                />
              </div>
              <h5>
              <Link to={`/profile/${posts.postedBy._id}`}>
                {posts.postedBy.name}
              </Link>
              </h5>
            </div>
            <div className="card-image">
              <img src={posts.photo} alt="" />
            </div>
            <div className="card-content">
              {
                posts.like.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                ) ? (
                  <span
                    className="material-symbols-outlined material-symbols-outlined-red"
                    onClick={() => {
                      unlikePost(posts._id);
                    }}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined"
                    onClick={() => {
                      likePost(posts._id);
                    }}
                  >
                    favorite
                  </span>
                )
                // (console.log("likes"))
              }

              <p>{posts.like.length} Likes</p>
              <p>{posts.body}</p>
              <p style={{fontWeight:"bold" , cursor :"pointer"}} onClick={()=>{toggleComment(posts)}}>View all comments</p>
            </div>
            {/* Add comments */}
            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="comment"
                onClick={() => makeComment(comment, posts._id)}
              >
                Post
              </button>
            </div>
          </div>
        );
      })}

      {/* Show comment */}
      {
        show && 
        (<div className="showComment">
        <div className="close-comment" onClick={()=>{
          toggleComment()
        }}>
          <span className="material-symbols-outlined material-symbols-outlined-comment">close</span>
        </div>
        <div className="container">
          <div className="postPic">
            <img
              src={item.photo}
              alt=""
            />
          </div>
          <div className="details">
            <div className="card-header"
              style={{ borderBottom: "1px solid #00000029" }}
            >
              <div className="card-pic">
                <img
                  src="http://square-vn.com/app/dscms/assets/images/person-1.jpg?v=1584725519"
                  alt=""
                />
              </div>
              <h5>{item.postedBy.name}</h5>
            </div>

            {/* Comment section */}
            <div
              className="comment-section"
              style={{ borderBottom: "1px solid #00000029" }}
            >
              {item.comments.map((comment)=>{
                  return (<p className="comm">
                  <span className="commenter" style={{ fontWeight: "bolder" }}>
                    {comment.postedBy.name}{" "}
                  </span>
                <span className="commentText">{comment.comment}</span>
                </p>)
              })}

              <div className="card-content">
                <p>{item.like.length} Likes</p>
                <p>{item.body}</p>
              </div>

              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {makeComment(comment, item._id); toggleComment()}}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>)
      }
      
    </div>
  );
}
