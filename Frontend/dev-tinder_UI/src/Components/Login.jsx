import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setphotoUrl] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [about, setabout] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setisLoginForm] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlesignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password, age, gender, photoUrl },
        { withCredentials: true }
      );
      console.log("Signup data being sent:", res.data.data);
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.error(err);
      setError(err?.response?.message || "something went wrong");
    }
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.message || "something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Login" : "SignUp"}</h2>
          <div>
            <div className="join  my-5">
              <div>
                {!isLoginForm && (
                  <>
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
                      onChange={(e) => setage(e.target.value)}
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
                      className="input my-4"
                      value={about}
                      onChange={(e) => setabout(e.target.value)}
                    />
                  </>
                )}
                <label className="input validator join-item w-[20rem]">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </div>
            </div>
          </div>
          <label className="input validator my-5 w-[20rem]">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="5"
              pattern="(?=.*\d)(?=.*[a-z]).{5,}"
              title="Must be more than 5 characters, including number, lowercase letter"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 5 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
          </p>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary "
              onClick={isLoginForm ? handleLogin : handlesignup}
            >
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setisLoginForm((value) => !value)}
          >
            {isLoginForm ? "New User?Signup here" : "Existing User?Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
