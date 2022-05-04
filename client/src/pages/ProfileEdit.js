import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { EDIT_USER, uploadFileMutation } from "../utils/mutations";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const ProfileEdit = () => {
  const [formState, setFormState] = useState({
    name: "",
    address: "",
    phone: "",
    image: "",
  });

  /* Section to fetch Me data and set in formState */
  const { loading, data: userData } = useQuery(QUERY_ME);
  const userProfile = userData?.me || {};

  useEffect(() => {
    if (userProfile) {
      setFormState({
        name: userProfile?.name,
        address: userProfile?.address,
        phone: userProfile?.phone,
        image: userProfile?.image,
      });
    }
  }, [userProfile?.name]);

  /* This is where I want to change the value of FormState*/

  const [editUser, { error, data }] = useMutation(EDIT_USER);

  const [uploadFile] = useMutation(uploadFileMutation, {});

  const onDrop = useCallback(
    ([file]) => {
      // setFormState({
      //   ...formState,
      //   image: file.name,
      // });
      setFormState((prevState) => ({
        ...prevState,
        image: file.name,
      }));

      uploadFile({ variables: { file } });
    },
    [uploadFile, formState]
  );

  console.log("state", formState);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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

                <img
                  src={`/images/${formState.image}`}
                  alt={formState.name}
                  className="profileImage"
                />

                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  }
                </div>

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
