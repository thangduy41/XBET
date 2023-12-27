import { StarOutlined, TeamOutlined, PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Avatar } from "../../components/shared";
import {useState, useEffect} from "react"
import NewGroupPopup from "./NewGroupPopup"
import {useHistory } from "react-router-dom"

const SideMenu = ({ username, profilePicture, openModal, data}) => {

  const [open, setOpen]= useState(false)
  const history= useHistory()
  

  return (
    <ul className="overflow-hidden">
      <li style={{backgroundColor: "#d7cdcf"}} className="px-4 py-3 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900">
        <Link to="/" onClick={(e)=> {
            e.preventDefault()
            history.goBack()
          }} className="flex items-center text-black">
              <ArrowLeftOutlined
                  className="text-indigo-700 dark:text-indigo-400"
                  style={{ fontSize: "30px", marginRight: "25px" }}
              />
            <h6 className="text-sm dark:text-white">Go back</h6>
          </Link>
      </li>
      <li style={{backgroundColor: "#d7cdcf"}} className="px-4 py-3 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900">
        <Link to={`/user/${username}`} className="flex items-center text-black">
          <Avatar url={profilePicture} className="mr-4" />
          <h6 className="text-sm dark:text-white">My Profile</h6>
        </Link>
      </li>
      <li style={{backgroundColor: "#d7cdcf"}} className="px-4 py-3 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900">
        <Link to="/group" className="flex items-center text-black">
            <StarOutlined
                className="text-indigo-700 dark:text-indigo-400"
                style={{ fontSize: "30px", marginRight: "25px" }}
            />
          <h6 className="text-sm dark:text-white">Your team</h6>
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
          <h6 className="text-sm dark:text-white">Discover</h6>
        </Link>
      </li>
      <li style={{backgroundColor: "#d7cdcf"}} className="px-4 py-3 cursor-pointer mt-4 hover:bg-indigo-100  dark:hover:bg-indigo-900">
        <Link
          to={`/`}
          onClick={(e)=> {
            e.preventDefault()
            setOpen(true)
          }}
          className="flex items-center text-black"
        >
          <TeamOutlined
            className="text-indigo-700 dark:text-indigo-400"
            style={{ fontSize: "30px", marginRight: "25px" }}

          />
          <h6 className="text-sm dark:text-white">New Group</h6>
        </Link>
      </li>
      <NewGroupPopup open={open} setOpen={setOpen} data={data} />
    </ul>
  );
};

export default SideMenu;
