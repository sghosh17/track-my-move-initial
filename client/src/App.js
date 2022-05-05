import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BuyerHome from "./pages/BuyerHome";
import EstateHome from "./pages/EstateHome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";
import ProfileEdit from "./pages/ProfileEdit";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./utils/auth";
import AuthLock from "./components/AuthLock/index";
import Contact from "./components/Contact/index";
import StepContext from "./StepContext";
import { createUploadLink } from "apollo-upload-client";

// Construct our main GraphQL API endpoint
const httpLink = createUploadLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  //uploadLink,
  cache: new InMemoryCache(),
});

function App() {
  console.log(localStorage.getItem("id_token"));
  console.log(Auth.getProfile());
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<AuthLock />}>
                <Route
                  path="/"
                  element={
                    Auth.getProfile()?.data?.role === "Buyer" ? (
                      <StepContext>
                        <BuyerHome />
                      </StepContext>
                    ) : (
                      <EstateHome />
                    )
                  }
                />
                <Route path="/me" element={<Profile />} />
                <Route path="/profiles/:username" element={<Profile />} />
                <Route path="/editProfile" element={<ProfileEdit />} />
                <Route path="/client/src/assets/:file.name" />
                <Route
                  path="/roadmap/:buyerId"
                  element={
                    <StepContext>
                      <BuyerHome />
                    </StepContext>
                  }
                />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<div>404 - Page does not exist</div>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
