import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
      console.log("API response:", res.data);
      dispatch(addFeed(res.data));
    } catch (err){
      console.error(err);
    }
  };
  useEffect(()=>{
    getFeed();
  },[]);
  if(!feed) return;
  if(feed.length<=0) return <h1 className="flex justify-center my-10">No More Users Available</h1>
  return( 
    feed &&(
  <div className="flex justify-center my-10">
    <Usercard user = {feed[0]}/>
  </div>
    )
  );
};
export default Feed;
