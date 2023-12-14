import { StarOutlined, TeamOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Avatar } from "../../components/shared";

const SideMenu = ({ username, profilePicture, openModal}) => {
  return (
    <ul className="overflow-hidden">
      
      <li style={{backgroundColor: "#d7cdcf"}} className="px-4 py-3 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900">
        <Link to={`/user/${username}`} className="flex items-center text-black">
          <Avatar url={profilePicture} className="mr-4" />
          <h6 className="text-sm dark:text-white">My Profile</h6>
        </Link>
      </li>
      <li style={{backgroundColor: "#d7cdcf"}} className="px-4 py-3 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900">
        <Link to="/create-post" onClick={(e)=> {e.preventDefault();openModal()}} className="flex items-center text-black">
          <PlusOutlined
            className="text-indigo-700 dark:text-indigo-400"
            style={{ fontSize: "30px", marginRight: "25px" }}
          />
          <h6 className="text-sm dark:text-white">Create post</h6>
        </Link>
      </li>
      <li style={{backgroundColor: "#d7cdcf"}} className="px-4 py-3 cursor-pointer mt-4 hover:bg-indigo-100  dark:hover:bg-indigo-900">
        <Link
          to={`/user/${username}/following`}
          className="flex items-center text-black"
        >
          <TeamOutlined
            className="text-indigo-700 dark:text-indigo-400"
            style={{ fontSize: "30px", marginRight: "25px" }}
          />
          <h6 className="text-sm dark:text-white">Friend list</h6>
        </Link>
      </li>
      <li style={{backgroundColor: "#d7cdcf"}} className="px-4 py-3 cursor-pointer mt-4 hover:bg-indigo-100  dark:hover:bg-indigo-900">
        <Link
          to={`/user/${username}/followers`}
          className="flex items-center text-black"
        >
          <TeamOutlined
            className="text-indigo-700 dark:text-indigo-400"
            style={{ fontSize: "30px", marginRight: "25px" }}
          />
          <h6 className="text-sm dark:text-white">Group</h6>
        </Link>
      </li>
      <li style={{backgroundColor: "#d7cdcf"}} className="px-4 py-3 cursor-pointer mt-4 hover:bg-indigo-100  dark:hover:bg-indigo-900">
        <Link
          to={`/user/${username}/bookmarks`}
          className="flex items-center text-black"
        >
          <StarOutlined
            className="text-indigo-700 dark:text-indigo-400"
            style={{ fontSize: "30px", marginRight: "25px" }}
          />
          <h6 className="text-sm dark:text-white">Repository</h6>
        </Link>
      </li>
    </ul>
  );
};

export default SideMenu;
