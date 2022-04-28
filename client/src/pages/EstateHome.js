import React, { useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import UserProfile from "../components/UserProfile";
import { QUERY_USERS } from "../utils/queries";
import "../profile.css";
import "../EstateHome.css";

const EstateHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];
  if (loading) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input
            id="searchInput"
            type="text"
            placeholder="Search here..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div className="template_Container">
          {users
            .filter((user) => {
              console.log(user);
              if (searchTerm === "") {
                return user;
              } else if (
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) +
                user.address.normalize().includes(searchTerm.normalize())
              ) {
                return user;
              }
            })
            .map((user) => {
              return (
                <div className="template" key={user._id}>
                  <h3>{user.name}</h3>
                  <h3>{user.address}</h3>
                  <p className="email">{user.email}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default EstateHome;
