import React from 'react'
import {RiCloseLine} from 'react-icons/ri'
import "../css/Modal.css";
import { useNavigate } from 'react-router-dom';

export default function Modal({setModalOpen}) {
  const navigate = useNavigate();
  return (
    <div className="darkBg" onClick={()=>setModalOpen(false)}>
      <div className="centered">
      <div className='modal'>
        {/* modal header */}
      <div className="modalHeader">
        <h5 className='heading'>Confirm</h5>
      </div>
      <button className='closeBtn' onClick={()=>setModalOpen(false)}>
        <RiCloseLine></RiCloseLine>
      </button>
      {/* modal content */}
      <div className="modalContent">
        Are you really want to logout ?
      </div>
      <div className="modalActions">
        <div className="actionsContainer">
            <button className="logoutBtn" onClick={()=>{setModalOpen(false);
            localStorage.clear();
            navigate("./signin")
            }}>Logout</button>
            <button className="cancelBtn" onClick={()=>setModalOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
    </div>
    </div>    
  )
}
