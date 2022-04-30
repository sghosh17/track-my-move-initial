import React from "react";
import { useNavigate } from "react-router-dom";

import Auth from "../../utils/auth";

const ViewBuyerCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="template" key={user._id}>
      <h3
        onClick={() => {
          navigate(`/roadmap/${user._id}`);
        }}
      >
        {user.username}
      </h3>
      <h3>{user.address}</h3>
      <p className="email">{user.email}</p>
    </div>
  );
};

export default ViewBuyerCard;
