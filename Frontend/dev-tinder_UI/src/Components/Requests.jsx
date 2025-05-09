import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const reviewRequest = async(Status,_id)=>{
    try{
        const res = await axios.post(BASE_URL+ "/request/review/"+Status + "/" +_id,{},{withCredentials:true});
        dispatch(removeRequests(_id));
        console.log(res?.data)
    }catch(err){
        console.error(err);
    }
  }
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
      console.log(res?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) {
    return;
  }
  if (requests.length === 0) {
    return <h1 className="flex justify-center my-10"> No Requests Found!!!</h1>;
  }
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, about, gender } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4   rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                className="w-20 h-20 rounded-full"
                alt="photo"
                src={photoUrl}
              ></img>
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{about}</p>
              <p>{age + " " + gender}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2"onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
              <button className="btn btn-secondary mx-2"onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
