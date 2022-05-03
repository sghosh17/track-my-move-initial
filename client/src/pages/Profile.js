import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import "../profile.css";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  console.log("UserProfile JS - " + JSON.stringify(user));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log!
      </h4>
    );
  }

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">
            Viewing {userParam ? `${user.username}'s` : "your"} profile
          </h4>
          <div className="card-body overflow-hidden">
            <div className="col-md-5 float-left">
              <img
                src={`/images/${user.image}`}
                alt={user.name}
                className="profileImage"
              />
            </div>
            <div className="col-md-7 float-left">
              <p>Username : {user.username}</p>
              <p>Name : {user.name}</p>
              <p>Address : {user.address}</p>
              <p>Email : {user.email}</p>
              <p>Contact Number : {user.phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {Auth.getProfile()?.data?.role === "Buyer" ? ( //If a buyer loggedIn then only Edit button will show up
          <>
            <Link className="btn btn-lg btn-info m-2" to="/editProfile">
              Edit Profile
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default Profile;
