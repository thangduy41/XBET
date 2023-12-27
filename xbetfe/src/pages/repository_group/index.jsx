import { CoffeeOutlined, UndoOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps, useHistory, useParams } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withAuth } from "../../components/hoc";
import axios from "axios"
import {
  CreatePostModal,
  PostItem,
  PostModals,
  SuggestedPeople,
} from "../../components/main";
import { Avatar, Loader, PostLoader } from "../../components/shared";
import { SUGGESTED_PEOPLE } from "../../constants/routes";
import { useDocumentTitle, useModal } from "../../hooks";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  clearNewsFeed,
  createPostStart,
  deleteFeedPost,
  getNewsFeedStart,
  hasNewFeed,
  updateFeedPost,
  updatePostLikes,
} from "../../redux/action/feedActions";
import socket from "../../socket/socket";
import SideMenu from "./SideMenu";
import * as Tab from "../profile/Tabs";
import {API_URL } from "../../config.js"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const RepositoryGroup = (props) => {
  const [status, setStatus]= useState(0)
  const [groups, setGroups] = useState([]);
  const [groupDetail, setGroupDetail]= useState({})
  const [change, setChange]= useState(false)
  const [searchQuery, setSearchQuery]= useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {id }= useParams()
  const history= useHistory()
  const state = useSelector(
    (state) => ({
      newsFeed: state.newsFeed,
      auth: state.auth,
      error: state.error.newsFeedError,
      isLoadingFeed: state.loading.isLoadingFeed,
      isLoadingCreatePost: state.loading.isLoadingCreatePost,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const from = props.location.state?.from || null;

  useDocumentTitle("XBet | Social Network");
  useEffect(() => {
    // console.log("TRIGGER", from);
    if (state.newsFeed.items.length === 0 || from === "/") {
      dispatch(clearNewsFeed());
      dispatch(getNewsFeedStart({ offset: 0 }));
    }

    socket.on("newFeed", () => {
      dispatch(hasNewFeed());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNewsFeed = () => {
    dispatch(getNewsFeedStart({ offset: state.newsFeed.offset }));
  };

  const likeCallback = (postID, state, newLikeCount) => {
    dispatch(updatePostLikes(postID, state, newLikeCount));
  };

  const updateSuccessCallback = (post) => {
    dispatch(updateFeedPost(post));
  };

  const deleteSuccessCallback = (postID) => {
    dispatch(deleteFeedPost(postID));
  };

  const dispatchCreatePost = (form) => {
    dispatch(createPostStart(form));
  };

  const onClickNewFeed = () => {
    dispatch(clearNewsFeed());
    dispatch(getNewsFeedStart({ offset: 0 }));
    dispatch(hasNewFeed(false));
  };

  const infiniteRef = useInfiniteScroll({
    loading: state.isLoadingFeed,
    hasNextPage: !state.error && state.newsFeed.offset > 0,
    onLoadMore: fetchNewsFeed,
    scrollContainer: "window",
  });

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const userId= state.auth.id
        const response = await axios.get(API_URL + `/api/users/${userId}/groups`);
        setGroups(response.data.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    fetchUserGroups();
  }, [state.auth, change]);

  useEffect(() => {
    const fetchGroupDetail = async () => {
      try {
        
        const response = await axios.get(API_URL + `/api/groups/${id}`);
        setGroupDetail(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    fetchGroupDetail();
  }, [state.auth, change]);
  
  const searchGroup= async ()=> {
    const result= await axios({
      url: API_URL + "/api/groups/search",
      params: {
        query: searchQuery
      }
    })
  }

  return (
    <div className="laptop:px-6% pt-20 flex items-start">
      {/*  --- SIDE MENU --- */}
      <div className="hidden laptop:block laptop:w-1/4 laptop:rounded-md bg-white laptop:sticky laptop:top-20 mr-4 laptop:shadow-lg divide-y-2 dark:bg-indigo-1000">
        {props.isAuth && (
          <SideMenu
            change={change}
            setChange={setChange}
            openModal={openModal}
            username={state.auth.username}
            data={state.auth}
            profilePicture={state.auth.profilePicture?.url}
          />
        )}
      </div>
      <div style={{padding: 10, backgroundColor: "#e3e1e3", width: "100%"}}>
        <div style={{width: "100%", padding: 30, backgroundColor: "#a19797", textAlign: "center", marginBottom: 12, borderRadius: 10}}>
          <div>{groupDetail?.name}'s repository</div>
          <div>(repository where documents are stored in groups you join)</div>
        </div>
        <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "8px 0"}}>
            <div style={{padding: 10, textAlign: "center", backgroundColor: "#dcb2b2"}}>
                {"<<"} Back
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20}}>
                <div onClick={handleClick} style={{padding: 10, textAlign: "center", backgroundColor: "#7a77ca", borderRadius: 10, fontWeight: 600, color: "#fff"}}>
                    Upload
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={()=> {
                        openModal()
                    }}>Upload</MenuItem>
                    <MenuItem onClick={handleClose}>Download</MenuItem>
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                    <MenuItem onClick={handleClose}>Share</MenuItem>
                </Menu>
                <div>{"<1 / 1>"}</div>
            </div>
        </div>
        {/* <div style={{width: '100%', height: 40, borderRadius: 80, backgroundColor: "#cf8f8f", marginBottom: 20}}>
          <input style={{width: "100%", height: "100%", border: "none", outlineColor: "#2e89ff", backgroundColor: "inherit", borderRadius: 80, padding: 10, paddingLeft: 20}} placeholder="Search group" />
        </div> */}
        {/* <>
          {
            state.newsFeed?.items?.filter(item=> item.isLink=== true)?.map((item, key)=> <div style={{width: "100%", margin: "12px 0", padding: 10, borderRadius: 10, backgroundColor: "rgb(207, 143, 143)"}}>
              <div>{item.name}</div>
              <div>{item.description}</div>
            </div>)
          }
        </> */}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Modification date</TableCell>
                    <TableCell>File size</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        state.newsFeed?.items?.filter(item=> item.isLink=== true)?.filter(item=> item.groupId === id)?.map((item, key)=> <TableRow key={key}>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.author.username}</TableCell>
                            <TableCell>{"No"}</TableCell>
                            <TableCell>{"No"}</TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
            </TableContainer>
      </div>
      {/* --- SUGGESTED PEOPLE --- */}
      {/* <div className="hidden laptop:block laptop:w-1/4 laptop:sticky laptop:top-20 ml-4">
        {props.isAuth && <SuggestedPeople />}
        new feature
        <div style={{ marginTop: 16 }}>
          {props?.isAuth && (
            <>
              <Tab.Following
                is_page_home={true}
                username={state.auth.username}
              />
            </>
          )}
        </div>
      </div> */}
      {/*  --- ALL POST MODALS (DELETE COMMENT NOT INCLUDED) --- */}
      {/* --- CREATE POST MODAL ----- */}
      {isOpen && (
          <CreatePostModal
            groupId={id}
            isFromRepo={true}
            isOpen={isOpen}
            openModal={openModal}
            closeModal={closeModal}
            dispatchCreatePost={dispatchCreatePost}
          />
        )}
      <PostModals
        deleteSuccessCallback={deleteSuccessCallback}
        updateSuccessCallback={updateSuccessCallback}
      />
    </div>
  );
};

export default withAuth(RepositoryGroup);
