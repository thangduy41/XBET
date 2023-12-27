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

const apiUrl = API_URL + '/api/groups';
export default function NewGroupPopup(props) {
  const [members, setMembers]= useState([])
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  
  const handleClickOpen = () => {
      props?.setOpen(true);
    };
    
    const handleClose = () => {
        props?.setOpen(false);
    };
    
    const createGroupApi= async ()=> {
        const res= await axios({
            url: apiUrl, 
            method: "post",
            data: {
                name: groupName, 
                description: groupDescription,
                ownerId: props.data.id,
                members: members,
            }
        })
        const result= await res.data
        return result
    }
    
    const handleCreateGroup = () => {
        // Thực hiện các hành động cần thiết khi tạo nhóm
        // Ví dụ: Gọi API để tạo nhóm với groupName và groupDescription
        
        // Sau khi tạo nhóm, đặt các trường về giá trị mặc định
        setGroupName('');
        setGroupDescription('');
        
        // Đóng dialog
        handleClose();
    };
    
    useEffect(()=> {
      if(props?.data?.id) {
        setMembers(prev=> ([...prev, {user: props.data.id, isOwner: true}]))
      }
    }, [props?.data]) 
  return ( 
    <React.Fragment>
      <Dialog
        open={props?.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create new group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="group-name"
            label="Group Name"
            type="text"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="group-description"
            label="Group Description"
            type="text"
            fullWidth
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={async ()=> {
            try {
                const result= await createGroupApi()
                if(result.ok=== true) {
                    swal("","Create group is successfully", "success")
                    .then(()=> handleClose())
                }
            }
            catch(e) {
                swal("","Create group is failed", "error")
            }
          }} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
