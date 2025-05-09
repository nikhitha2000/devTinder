import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import Feed from "./Feed";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Error from "./Error";
import Connections from "./Connections";
import Requests from "./Requests";
function App() {
  return (
    <div>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
      <Route path="/"element={<Body />}>
      <Route path="/"element={<Feed />}></Route>
      <Route path="/login"element={<Login />}></Route>
      <Route path="/profile"element={<Profile />}></Route>
      <Route path="/connections"element={<Connections />}></Route>
      <Route path="/requests"element={<Requests />}></Route>
      </Route>
      <Route path="/error" element= {<Error />}></Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
