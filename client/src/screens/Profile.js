import React, {useState, useEffect} from 'react'
import "../css/Profile.css"
import Postdetail from '../components/Postdetail';
import ChangeProfile from '../components/ChangeProfile';

export default function Profile() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/64/64572.png"
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [changePic, setChangePic] = useState(false);


// to show post details
const togglePostDetail =(posts)=>{
  if(show){
    setShow(false);
  } else {
    setShow(true);
    setPosts(posts)
  }
}

// to show changeprofile
const changeProfile = ()=>{
  if(changePic){
    setChangePic(false)
  } else {
    setChangePic(true)
  }
}

  useEffect(()=>{
    fetch("/myposts", {
      headers: {
        Authorization: "Bearer "+ localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then((result) => {
      setPic(result.myposts)
      setUser(result.user)
      console.log(pic);
    })
  }, [])
  
  
  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img onClick={()=>{changeProfile()}} src={
            user.Photo?user.Photo:picLink
          } alt="" />
        </div>
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{display:"flex"}}>
            <p> {pic.length} posts  </p>
            <p> {user.followers? user.followers.length : "0"} followers   </p>
            <p> {user.following?user.following.length: "0"} following   </p>
          </div>
        </div>
      </div>
      <hr style={{
        width:"90",
        margin:"auto",
        opacity:"0.8",
        margin:"25px auto"
      }}/>
      <div className="gallery">
      {pic.map((pics)=>{
        return <img key={pics._id} src={pics.photo} onClick={()=>{togglePostDetail(pics)}} className='item'></img>
      })}
      </div>
      {show && <Postdetail item={posts} togglePostDetail={togglePostDetail}/>}
      {changePic && <ChangeProfile changeProfile={changeProfile}/>}
      
    </div>
  )
}
