import React, { useState, useEffect } from "react";
import "../css/Createpost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState('')

  const notifyA = (data) => toast.error(data);
  const notifyB = (data) => toast.success(data);

  const navigate = useNavigate();

  useEffect(()=>{
    //   Saving post in mongoDB
    if(url){
      fetch("/createpost", {
        method:"post",
        headers:{"Content-Type":"application/json",
                 "Authorization": "Bearer " + localStorage.getItem('jwt')
                },
        body:JSON.stringify({
            body,
            pic: url
        })
    }).then(res=>res.json())    
    .then(data=>{if(data.error){
      notifyA("data.error")
    } else {
      notifyB("Post saved successfully")
      navigate("/")
    }})
    .catch(err=>console.log(err))
    }
  }, [url])
  
  // posting image to cloudinary insta-clone
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "stackcloud");
    fetch("https://api.cloudinary.com/v1_1/stackcloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
    };
  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <div className="createPost">
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id="post-btn" onClick={() => postDetails()}>
          Share
        </button>
      </div>
      <div className="main-div">
        <img
          id="output"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwzM14dJVckDwVOXuArT6jNvdxmP-oSYnUvxH6gVb79g&s" 
          alt=""
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadFile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>
      {/* deltails */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="http://square-vn.com/app/dscms/assets/images/person-1.jpg?v=1584725519"
              alt=""
            />
          </div>
          <h5>Ramesh</h5>
        </div>
        <textarea
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
          type="text"
          placeholder="Write a caption"
        ></textarea>
      </div>
    </div>
  );
}
