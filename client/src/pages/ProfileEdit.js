import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../utils/mutations";

//import Auth from "../utils/auth";

const ProfileEdit = () => {
  const [formState, setFormState] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [editUser, { error, data }] = useMutation(EDIT_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await editUser({
        variables: { ...formState },
      });

      window.location.assign("/me");

      // Auth.login(data.addUser.token);
    } catch (e) {
      console.log(e.networkError.result.errors);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Edit Profile</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your address"
                  name="address"
                  type="address"
                  value={formState.address}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Contact Number"
                  name="phone"
                  type="text"
                  value={formState.phone}
                  onChange={handleChange}
                />

                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileEdit;
