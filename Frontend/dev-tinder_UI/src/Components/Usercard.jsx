import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

function Usercard({ user }) {
  const dispatch = useDispatch();
  const { _id,firstName, lastName, photoUrl, age, gender, about } = user;
  const handleSendRequest = async (Status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + Status + "/" + _id ,{},{withCredentials:true}
      );
      dispatch(removeUserFromFeed(_id));
      console.log(res?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="my-5">
        <img src={user.photoUrl} alt="user photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age + "," + gender}</p>
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary"onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
          <button className="btn btn-secondary"onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
        </div>
      </div>
    </div>
  );
}

export default Usercard;
