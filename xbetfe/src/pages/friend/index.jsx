import { CoffeeOutlined, UndoOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps, useHistory, Switch  , Route } from "react-router-dom";
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

const Group = (props) => {
  const [status, setStatus]= useState(1)
  const [groups, setGroups] = useState([]);
  const [friendRequest, setFriendRequest]= useState([])
  const [listFriend, setListFriend]= useState([])
  const [change, setChange]= useState(false)
  const [change2, setChange2]= useState(false)
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

  useEffect(()=> {
    setInterval(()=> {
      setChange2(prev=> !prev)
    }, 3000)
  }, [])

  useEffect(() => {
    const fetchUserHint = async () => {
      try {
        const userId= state.auth.id
        const response = await axios.get(API_URL + `/api/friendships/hints/${userId}`);
        setGroups(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    fetchUserHint();
  }, [state.auth, change, change2]);

  useEffect(() => {
    const fetchFriendRequest = async () => {
      try {
        const userId= state.auth.id
        const response = await axios.get(API_URL + `/api/friendships/friend-requests/${userId}`);
        setFriendRequest(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    fetchFriendRequest();
  }, [state.auth, change, change2]);

  useEffect(() => {
    const fetchListFriend = async () => {
      try {
        const userId= state.auth.id
        const response = await axios.get(API_URL + `/api/friendships/friends/${userId}`);
        setListFriend(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    fetchListFriend();
  }, [state.auth, change, change2]);


  const sendFriendRequest= async (friendId)=> {
    const res= await axios({
      url: API_URL + "/api/friendships/send-request",
      method: "post",
      data: {
        userId: state.auth.id,
        friendId
      }
    })
    const result= await res.data
    console.log(result)
  }

  const sendAcceptRequest= async (friendId)=> {
    const res= await axios({
      url: API_URL + "/api/friendships/accept-request",
      method: "post",
      data: {
        userId: state.auth.id,
        friendId
      }
    })
    const result= await res.data
    console.log(result)
  }

  const sendRemoveFriend= async (friendId)=> {
    const res= await axios({
      url: API_URL + "/api/friendships/remove-friend",
      method: "post",
      data: {
        userId: state.auth.id,
        friendId
      }
    })
    const result= await res.data
    console.log(result)
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
        <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16}}>
            <div onClick={()=> setStatus(1)} style={{padding: 10, borderRadius: 10, background: "#cad832", cursor: "pointer", cursor: "pointer"}}>Hints</div>
            <div onClick={()=> setStatus(2)} style={{padding: 10, borderRadius: 10, background: "#cad832", cursor: "pointer", cursor: "pointer"}}>All friends</div>
            <div onClick={()=> setStatus(3)} style={{padding: 10, borderRadius: 10, background: "#cad832", cursor: "pointer", cursor: "pointer"}}>Friend request</div>
        </div>  
        <Switch>

        </Switch>
        {
          status===1 && <>
            {groups?.map((item, key)=> <div style={{marginBottom: 12, backgroundColor: "#d4aaab", padding: 10, borderRadius: 10, display: 'flex', justifyContent: "space-between", alignItems: "center"}} key={key} >
              <div style={{margin: "12px 0", padding: 10, backgroundColor: "#966d6d"}}>{item.username}</div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 20}}>
                  <div onClick={()=> {
                    sendFriendRequest(item._id)
                  }} style={{padding: 10, borderRadius: 10, backgroundColor: "#2e89ff", textAlign: "center", cursor: "pointer"}}>Add</div>
                  <div  style={{padding: 10, borderRadius: 10, backgroundColor: "#fff", textAlign: "center", cursor: "pointer"}}>Delete</div>
                </div>
            </div>)}  
          </>
        }
        {
          status=== 2 && <>
            {listFriend?.map((item, key)=> <div style={{marginBottom: 12, backgroundColor: "#d4aaab", padding: 10, borderRadius: 10, display: 'flex', justifyContent: "space-between", alignItems: "center"}} key={key} >
                <div style={{margin: "12px 0", padding: 10, backgroundColor: "#966d6d"}}>{item.username}</div>
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 20}}>
                    <div onClick={()=> {
                      
                    }} style={{padding: 10, borderRadius: 10, backgroundColor: "#2e89ff", textAlign: "center", cursor: "pointer"}}>Message</div>
                    <div onClick={()=> {
                    sendRemoveFriend(item.id)
                  }} style={{padding: 10, borderRadius: 10, backgroundColor: "#fff", textAlign: "center", cursor: "pointer"}}>Delete</div>
                  </div>
              </div>)}  
          </>
        }
        {
          status=== 3 && <>
            {friendRequest?.map((item, key)=> <div style={{marginBottom: 12, backgroundColor: "#d4aaab", padding: 10, borderRadius: 10, display: 'flex', justifyContent: "space-between", alignItems: "center"}} key={key} >
                <div style={{margin: "12px 0", padding: 10, backgroundColor: "#966d6d"}}>{item?.friend.username}</div>
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 20}}>
                    <div onClick={()=> {
                      sendAcceptRequest(item.friend._id)
                    }} style={{padding: 10, borderRadius: 10, backgroundColor: "#2e89ff", textAlign: "center", cursor: "pointer"}}>Accept</div>
                    <div style={{padding: 10, borderRadius: 10, backgroundColor: "#fff", textAlign: "center", cursor: "pointer"}}>Delete</div>
                  </div>
              </div>)}  
          </>
        }
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
      <PostModals
        deleteSuccessCallback={deleteSuccessCallback}
        updateSuccessCallback={updateSuccessCallback}
      />
    </div>
  );
};

export default withAuth(Group);
