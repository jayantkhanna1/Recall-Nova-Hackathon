import React, { useEffect, useState } from "react";
import DashboardIcons from "../../assets/DashboardIcons";
import { getUserData, updateUserData } from "../../services/Dashboard/User";
import { successToast } from "../../utils/toast";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
const Profile = () => {
  const [data, setData] = useState();
  const [usernamevalue, setusernamevalue] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData();
        setData(response?.user);
        setusernamevalue(response?.user?.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const handleSaveClick = async () => {
    // setIsEditing(false);
    try {
      await updateUserData(data);
      successToast("Profile Updated Successfully");
      setIsEditing(false);
      //   console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const inputFields = [
    {
      name: "Display Name",
      key: "name",
      type: "text",
    },
    {
      name: "Display Email",
      key: "email",
      type: "text",
    },
    {
      name: "Display Phone",
      key: "phone",
      type: "number",
    },
    {
      name: "Organization Name",
      key: "organization_name",
      type: "text",
    },
    {
      name: "Business Name",
      key: "business_name",
      type: "text",
    },
    {
      name: " Designation",
      key: "designation",
      type: "text",
    },
    {
      name: "Type Of Business ",
      key: "type_of_business",
      type: "text",
    },
  ];
  return (
    <>
      <div className="mobile-nav">
        <MobileNavbar />
      </div>

      <div className="dashboard">
        <div className="new-dashboard-grid">
          <div className="profile-my-account">
            <div className="analytics-header profile-page-header">
              <div className="analytics-header-heading">
                <img src={DashboardIcons.Back} alt="" />
                <h1>My Account 🚹</h1>
              </div>
            </div>
            <div className="user-icon">
              <div className="user-page-user-icon">
                <div className="edit-img">
                  <img src={DashboardIcons.Edit} alt="" />
                </div>
                <div className="user-page-user-icon-inner">
                  {usernamevalue?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="user-details">
                <h2>{usernamevalue}</h2>
                <div className="pill">{data?.type_of}</div>
              </div>
            </div>
            <div className="profile-page-user-info-cards">
              <div className="profile-page-user-info-card">
                <div className="profile-page-user-info-card-header">
                  <h2>Account Details</h2>

                  {!isEditing ? (
                    <div className="edit-button">
                      <button onClick={handleEditClick}>
                        <img src={DashboardIcons.BlackEdit} alt="" />
                        Edit
                      </button>
                    </div>
                  ) : null}
                </div>
                {inputFields.map((field) => (
                  <div className="profile-page-user-info-card-item">
                    <p>{field.name}</p>
                    <div className="input-authentication">
                      <input
                        key={field.key}
                        onChange={(e) => handleInputChange(e, field.key)}
                        value={data?.[field.key]}
                        readOnly={!isEditing}
                        type={field.type}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!isEditing ? null : (
            <div className="save-btn">
              <button className="secondary">Cancel</button>
              <button onClick={handleSaveClick}>Save</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
