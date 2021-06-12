import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaComment, FaEllipsisH, FaPhoneAlt } from "react-icons/fa";
import Loader from "react-loader-spinner";
import Header from "./Header";

function ContactCard() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [viewCallOption, setViewCallOption] = useState(null);
  const [userlist, setuserlist] = useState([]);


  const fetchUserList = async () => {
    try {
      setLoading(true);
      const userListData = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const userData = await userListData.json();
      setuserlist(userData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const navigateToDetail = (id) => {
    history.push(`/contact-details/${id}`);
  };
  
  const toggleOption = (event, userID) => {
    console.log(event);
    event.stopPropagation();
    if (userID === viewCallOption) {
      setViewCallOption(null);
    } else {
      setViewCallOption(userID);
    }
  };

  return (
    <>
      <Header />
      <section className="contact-list-wrapper">
        {loading ? (
          <div className="loading-wrap">
            <Loader type="ThreeDots" color="#665551" height={40} width={40} />
          </div>
        ) : (
          userlist?.map((user) => (
            <div
              key={user.id}
              className="contact-card"
              onClick={() => navigateToDetail(user.id)}
            >
              <div className="avatar-details">
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url(https://randomuser.me/api/portraits/men/${user.id}.jpg)`,
                  }}
                ></div>
                <div className="userinfo">
                  <div className="username">{user.name}</div>
                  <div className="user_phone_type">{"home"}</div>
                </div>
              </div>
              <div className="contact-options">
                {viewCallOption === user.id ? (
                  <>
                    <button className="btn btn-icon">
                      <FaComment />
                    </button>
                    <button className="btn btn-icon">
                      <FaPhoneAlt />
                    </button>
                  </>
                ) : null}
                <button
                  className={
                    "btn btn-icon " +
                    (viewCallOption === user.id ? "btn-disabled" : "")
                  }
                  onClick={(e) => toggleOption(e, user.id)}
                >
                  <FaEllipsisH />
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default ContactCard;
