import React, { useContext } from "react";
import { useState } from "react";

import axios from "axios";

const SECTION = "fileUpload";

export default function FileUpload() {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 5000) {
        console.log("Problem with server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <div className="sheet">
      <form onSubmit={onSubmit}>
        <div>
          <h4>File Upload</h4>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onFileChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
          </div>
        </div>
        <input type="submit" value="Upload" className="btn btn-primary mt-4" />
      </form>
      {uploadedFile ? (
        <div className="row mt-4">
          <h3>{uploadedFile.fileName}</h3>
        </div>
      ) : null}
    </div>
  );
}

// import React from "react";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import BuyerHome from "./pages/BuyerHome";
// import EstateHome from "./pages/EstateHome";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import ProfileEdit from "./pages/ProfileEdit";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Auth from "./utils/auth";
// import AuthLock from "./components/AuthLock/index";
// import Contact from "./components/Contact/index"

// // Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("id_token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// function App() {
//   console.log(localStorage.getItem("id_token"));
//   console.log(Auth.getProfile());
//   return (
//     <ApolloProvider client={client}>
//       <Router>
//         <div className="flex-column justify-flex-start min-100-vh">
//           <Header />
//           <div className="container">
//             <Routes>
//               <Route path="/" element={<AuthLock />}>
//                 <Route
//                   path="/"
//                   element={
//                     Auth.getProfile()?.data?.role === "Buyer" ? (
//                       <BuyerHome />
//                     ) : (
//                       <EstateHome />
//                     )
//                   }
//                 />
//                 <Route path="/me" element={<Profile />} />
//                 <Route path="/profiles/:username" element={<Profile />} />
//                 <Route path="/editProfile" element={<ProfileEdit />} />
//               </Route>
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="*" element={<div>404 - Page does not exist</div>} />
//               <Route path="/contact" element={<Contact />} />
//             </Routes>
//           </div>
//           <Footer />
//         </div>
//       </Router>
//     </ApolloProvider>
//   );
// }

// export default App;
