import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success,setSuccess] = useState(false);

  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: user._id,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      // user id is required from backend
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({type: "UPDATE_SUCCESS", payload: res.data})
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" })
    }
  }
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            {/* <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
            /> */}
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" onChange={e => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" onChange={e => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
        {success && (<p>Profile has been updated</p>)}
      </div>
      <Sidebar />
    </div>
  );
}
