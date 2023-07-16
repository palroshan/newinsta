import React, { useState, useEffect, useRef } from "react";

export default function ChangeProfile({ changeProfile }) {
  const hiddenFileInput = useRef(null);

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const postDetails = () => {
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

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(()=>{
    if(image){
        postDetails()
    }
  }, [image])

  useEffect(()=>{
    if(url){
        postPic()
    }
  }, [url])

//   saving profile pic to mongodb
  const postPic =()=>{
    fetch("/uploadprofilepic", {
        method:"put",
        headers:{"Content-Type":"application/json",
                 "Authorization": "Bearer " + localStorage.getItem('jwt')
                },
        body:JSON.stringify({
            pic: url
        })
    }).then(res=>res.json())    
    .then(data=>{
        console.log(data)
        changeProfile()
        window.location.reload()
      })
    .catch(err=>console.log(err))
  }


  return (
    <div className="profilePic darkBg">
      <div className="changePic centered">
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ borderTop: "1px solid #00000033" }}>
          <button
            className="upload-btn"
            style={{ color: "rgb(0,149,246)" }}
            onClick={handleClick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={hiddenFileInput}
            onChange={(e)=>{setImage(e.target.files[0])}}
          />
        </div>
        <div style={{ borderTop: "1px solid #00000033" }}>
          <button className="upload-btn" style={{ color: "rgb(237,73,86)" }} onClick={()=>
            {setUrl(null)
            postPic()}
          }>
            Remove Profile Photo
          </button>
        </div>
        <div style={{ borderTop: "1px solid #00000033" }}>
          <button
            className="upload-btn"
            onClick={() => {
              changeProfile();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
