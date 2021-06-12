import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaComment, FaEnvelope,FaGlobe } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import Header from "./Header";

function ContactDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const getUserDetail = async (userID) => {
    try {
      setLoading(true);
      const userListData = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );
      const userData = await userListData.json();
      const filteredUser = userData.find(
        (user) => user.id === parseInt(userID)
      );
      if (filteredUser) {
        setUserDetails(filteredUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserDetail(id);
  }, [id]);

  const goBack = () => {
    history.push("/");
  };

  const renderContactOption = (type, value) => {
    return (
      <div className="contact-card">
        <div className="userinfo">
          <div className="username">{value}</div>
          <div className="user_phone_type">{type}</div>
        </div>
        <div className="contact-options">
          {type === "Phone" ? (
            <>
              <button className="btn btn-icon">
                <FaComment />
              </button>
              <button className="btn btn-icon">
                <FaPhoneAlt />
              </button>
            </>
          ) : null}
          {type === "email" ? (
            <button className="btn btn-icon">
              <FaEnvelope />
            </button>
          ) : null}
          {type === "website" ? (
            <button className="btn btn-icon">
              <FaGlobe />
            </button>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <section className="contact-details">
      <Header
        isAddOption={true}
        title={userDetails.name || ""}
        isheaderFixed={true}
        backButtonHandler={goBack}
      />
      <div className="detailed-view">
        {userDetails.id ? (
          <div
            className="big-avatar"
            style={{
              backgroundImage: `url(https://randomuser.me/api/portraits/men/${userDetails.id}.jpg)`,
            }}
          ></div>
        ) : (
          <div className="big-avatar"></div>
        )}
        <div className="contact-option">
          {userDetails.phone && renderContactOption("Phone", userDetails.phone)}
          {userDetails.email && renderContactOption("email", userDetails.email)}
          {userDetails.website && renderContactOption("website", userDetails.website)}
          
        </div>
      </div>
    </section>
  );
}

export default ContactDetails;
