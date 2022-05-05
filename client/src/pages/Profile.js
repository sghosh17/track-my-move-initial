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
    <main className="flex-row justify-center mb-4 mt-6">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2 profileTitle">
            Viewing {userParam ? `${user.username}'s` : "your"} profile
          </h4>
          <div className="card-body overflow-hidden">
            <div className="col-md-5 float-left text-center">
              <img
                src={`/images/${user.image}`}
                alt={user.name}
                className="profileImage img-fluid my-5"
              />
              <h3>{user.name}</h3>
            </div>
            <div className="col-md-7 float-left">
              <div class="card-body p-4">
                <h3>Information</h3>
                <hr class="mt-0 mb-4" />
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h4>Email</h4>
                    <p class="profileFontSize">{user.email}</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h4>Phone</h4>
                    <p class="profileFontSize">{user.phone}</p>
                  </div>
                </div>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h4>Username</h4>
                    <p class="profileFontSize">{user.username}</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h4>Address</h4>
                    <p class="profileFontSize">{user.address}</p>
                  </div>
                </div>
              </div>
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
