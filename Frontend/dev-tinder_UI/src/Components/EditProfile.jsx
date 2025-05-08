import React, { useState } from "react";
import Usercard from "./Usercard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [error, setError] = useState("");
  const [age, setAge] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [about, setabout] = useState(user.about);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const[showToast,setshowToast] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setshowToast(true);
      setTimeout(()=>{
        setshowToast(false)
      },3000);
    } catch (err) {
      setError(err.data);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <div>
                <div className="join  my-5">
                  <div>
                    <label className="fieldset-legend my-5 w-[20rem]">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label className="fieldset-legend my-4 w-[20rem]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label className="fieldset-legend my-4 w-[20rem]">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input"
                      value={photoUrl}
                      onChange={(e) => setphotoUrl(e.target.value)}
                    />
                    <label className="fieldset-legend my-4 w-[20rem]">
                      Age
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <label className="fieldset-legend my-4 w-[20rem]">
                      Gender
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input"
                      value={gender}
                      onChange={(e) => setgender(e.target.value)}
                    />
                    <label className="fieldset-legend my-4 w-[20rem]">
                      About
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input"
                      value={about}
                      onChange={(e) => setabout(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary " onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <Usercard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
     { showToast && (<div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Saved successfully.</span>
        </div>
      </div>
    )}
    </>
  );
};

export default EditProfile;
