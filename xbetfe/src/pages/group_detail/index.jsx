import { CoffeeOutlined, UndoOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps, useHistory, useParams } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withAuth } from "../../components/hoc";
import axios from "axios"
import MemberGroup from "./MemberGroup"
import AddMember from "./AddMember"
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

const GroupDetail = (props) => {
  const [groups, setGroups] = useState([]);
  const [openMemberGroup, setOpenMemberGroup]= useState(false)
  const [openAddMember, setOpenAddMember]= useState(false)
  const [change, setChange]= useState(false)
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
    console.log("TRIGGER", from);
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
    const fetchGroupDetail = async () => {
      try {
        const response = await axios.get(API_URL + `/api/groups/${id}`);
        setGroups(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    fetchGroupDetail();
  }, [id]);

  return (
    <div className="laptop:px-6% pt-20 flex items-start">
      {/*  --- SIDE MENU --- */}
      <div className="hidden laptop:block laptop:w-1/4 laptop:rounded-md bg-white laptop:sticky laptop:top-20 mr-4 laptop:shadow-lg divide-y-2 dark:bg-indigo-1000">
        {props.isAuth && (
          <SideMenu
            openModal={openModal}
            username={state.auth.username}
            data={state.auth}
            profilePicture={state.auth.profilePicture?.url}
          />
        )}
      </div>
      <div style={{width: '100%'}}>
        <div style={{width: "100%", backgroundColor: "#d9d9d9", padding: 20, textAlign: "center"}}>Avatar group</div>
        <div style={{width: "100%", padding: 10, backgroundColor: '#dbb5b5'}}>
          <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid #000"}}>
            <div style={{padding: 10, backgroundColor: "#e3e1e3",  display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 80, cursor: "pointer"}}>{groups?.name}</div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 10}}>
              <div onClick={()=> {
                setOpenMemberGroup(true)
              }} style={{padding: 10, backgroundColor: "#e3e1e3",  display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 80, cursor: "pointer"}}>Member</div>
              <div onClick={()=> {
                setOpenAddMember(true)
              }} style={{padding: 10, backgroundColor: "#e3e1e3",  display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 80, cursor: "pointer"}}>Add</div>
            </div>
          </div>
          <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0"}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 10}}>
              <div onClick={()=> {
                openModal()

              }}  style={{padding: 10, backgroundColor: "#d37374",  display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 80, cursor: "pointer"}}>discuss</div>
              <div onClick={()=> {
                openModal()

              }} style={{padding: 10, backgroundColor: "#e3e1e3",  display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 80, cursor: "pointer"}}>Post</div>
            </div>
          </div>
        </div>
        {state.newsFeed.items.length !== 0 && (
          <div className="mb-8">
            <TransitionGroup component={null}>
              <div ref={infiniteRef}>
                {state.newsFeed.items?.filter(item=> item.groupId === groups._id).map(
                  (post) =>
                    post.author && ( // avoid render posts with null author
                      <CSSTransition
                        timeout={500}
                        classNames="fade"
                        key={post.id}
                      >
                        <PostItem
                          key={post.id}
                          post={post}
                          likeCallback={likeCallback}
                        />
                      </CSSTransition>
                    )
                )}
              </div>
            </TransitionGroup>
            {state.isLoadingFeed && (
              <div className="flex justify-center py-6">
                <Loader />
              </div>
            )}
            {state.error && (
              <div className="flex justify-center py-6">
                <p className="text-gray-400 italic">
                  {state.error.error?.message || "Something went wrong."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>    
      <PostModals
        deleteSuccessCallback={deleteSuccessCallback}
        updateSuccessCallback={updateSuccessCallback} 
      />
      {isOpen && (
          <CreatePostModal
            groupId={groups._id}
            isOpen={isOpen}
            openModal={openModal}
            closeModal={closeModal}
            dispatchCreatePost={dispatchCreatePost}
          />
        )}
      {/* ---- NEWS FEED ---- */}
      <MemberGroup
        groupId={groups._id}
        open={openMemberGroup}
        setOpen={setOpenMemberGroup}
        change={change}
        setChange={setChange}
      />
      <AddMember
        groupId={groups._id}
        open={openAddMember}
        setOpen={setOpenAddMember}
        change={change}
        setChange={setChange}
      />
    </div>
  );
};

export default withAuth(GroupDetail);
