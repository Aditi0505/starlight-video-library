import { useSelector } from "react-redux";
import { Sidebar } from "../../../components";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Sidebar />
      <div className="flex-center profile full-height">
        <div className="flex-column ">
          <h1>Your Profile</h1>
          <p className="text-md text-left">{`Name: ${
            userData.firstName ?? user.firstName
          } ${userData.lastName ?? user.lastName}`}</p>
          <p className="text-md text-left">{`Email: ${
            userData.email ?? user.email
          }`}</p>
        </div>
      </div>
    </>
  );
};
export { Profile };
