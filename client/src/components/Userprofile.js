import React, { useState, useEffect } from "react";
import "../css/Profile.css";
import Postdetail from "./Postdetail";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/64/64572.png"

  const navigate = useNavigate()
  const { userid } = useParams();
  const [user, setUser] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isFollow, setIsFollow] = useState(false);

  // to follow
  const followUser = (userId) => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setIsFollow(true)
      });

  };
  // to unfollow
  const unfollowUser = (userId) => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {console.log(data)
      setIsFollow(false)
      });
  };

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setUser(result.user);
        setPosts(result.posts);
        if(result.user._id === JSON.parse(localStorage.getItem("user"))._id){
          navigate("/profile")
        }
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id)
          
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow]);
  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            src={
              user.Photo?user.Photo:picLink
            }
            alt=""
          />
        </div>
        <div className="profile-data">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>{user.name}</h1>
            <button
              className="followBtn"
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
            >
              {isFollow ? "following" : "follow"}
            </button>
          </div>
          <div className="profile-info" style={{ display: "flex" }}>
            <p> {posts.length} posts </p>
            <p> {user.followers?user.followers.length:"0"} followers </p>
            <p> {user.following?user.following.length:"0"} following </p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90",
          margin: "auto",
          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      <div className="gallery">
        {posts.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              //  onClick={()=>{togglePostDetail(pics)}}
              className="item"
            ></img>
          );
        })}
      </div>
      {/* {show && <Postdetail item={posts} togglePostDetail={togglePostDetail}/>} */}
    </div>
  );
}
