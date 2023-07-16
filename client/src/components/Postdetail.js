import React from "react";
import "../css/Postdetail.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Postdetail({ item, togglePostDetail }) {
  const notifyA = (data) => toast.error(data);
  const notifyB = (data) => toast.success(data);
  const navigate = useNavigate();
  
    const removePost =(postId)=>{

      if(window.confirm("Do you really want to delete this post")){
        fetch(`/deletePost/${postId}`, {
            method:'delete',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        }).then(res=>res.json())
        .then((result)=>{
          console.log(result)
          notifyB(result.message)
          togglePostDetail()
          navigate("/")
        })
        .catch((err)=>{
          console.log(err)
          notifyA("Error in deleting data")
        })
      }       
    }

  return (
    <div className="showComment">
      <div
        className="close-comment"
        onClick={() => {
          togglePostDetail();
        }}
      >
        <span className="material-symbols-outlined material-symbols-outlined-comment">
          close
        </span>
      </div>
      <div className="container">
        <div className="postPic">
          <img src={item.photo} alt="" />
        </div>
        <div className="details">
          {/* card header */}
          <div
            className="card-header"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            <div className="card-pic">
              <img
                src="http://square-vn.com/app/dscms/assets/images/person-1.jpg?v=1584725519"
                alt=""
              />
            </div>
            <h5>{item.postedBy.name}</h5>
            <div className="deletePost">
              <span className="material-symbols-outlined" onClick={()=>{removePost(item._id)}}>delete</span>
            </div>
          </div>

          {/* Comment section */}
          <div
            className="comment-section"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            {item.comments.map((comment) => {
              return (
                <p className="comm">
                  <span className="commenter" style={{ fontWeight: "bolder" }}>
                    {comment.postedBy.name}{" "}
                  </span>
                  <span className="commentText">{comment.comment}</span>
                </p>
              );
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
                //   value={comment}
                //   onChange={(e) => {
                //     setComment(e.target.value);
                //   }}
              />
              <button
                className="comment"
                //   onClick={() => {makeComment(comment, item._id); toggleComment()}}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
