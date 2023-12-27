import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import swal from "sweetalert"
import {API_URL } from "../../config.js"

const apiUrl = API_URL;
export default function AddMember(props) {
  const [members, setMembers]= useState([])
//   const [change, setChange]= useState([])
  
  const handleClickOpen = () => {
      props?.setOpen(true);
    };
    
    const handleClose = () => {
        props?.setOpen(false);
    };
    
    const getNonMemberGroup= async ()=> {
        const res= await axios({
            url: apiUrl + "/api/groups/" + props?.groupId + "/non-members", 
            method: "get",
        })
        const result= await res.data
        return result
    }
    
    const handleCreateGroup = () => {
        // Thực hiện các hành động cần thiết khi tạo nhóm
        // Ví dụ: Gọi API để tạo nhóm với groupName và groupDescription
        
        // Sau khi tạo nhóm, đặt các trường về giá trị mặc định
        
        // Đóng dialog
        handleClose();
    };
    useEffect(()=> {
        (async ()=> {
            if(props?.groupId) {
                const result= await getNonMemberGroup()
                setMembers(result)
            }
        })()
    }, [props?.groupId, props?.change])

    const AddMemberToGroup= async (memberId)=> {
        const res= await axios({
            url: apiUrl + "/api/groups/" + props?.groupId + "/members", 
            method: "post",
            data: {
                memberId
            }
        })
        const result= await res.data
        return result
    }
  return ( 
    <React.Fragment>
      <Dialog
        open={props?.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Member in group</DialogTitle>
        <DialogContent> 
            {
                members?.map((item, key)=> <div key={key} style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 100, marginBottom: 12}}>
                    <div>{item?.username}</div>
                    <div onClick={async ()=> {
                        const result= await AddMemberToGroup(item._id)
                        console.log(result)
                        props?.setChange(prev=> !prev)
                    }} style={{backgroundColor: "#f9bebe", textAlign: "center", padding: 10, borderRadius: 10}}>
                        Add
                    </div>
                </div>)
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
