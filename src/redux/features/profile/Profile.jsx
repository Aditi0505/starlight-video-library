import { useSelector } from "react-redux";
import { Sidebar } from "../../../components";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <>
      <Sidebar />
      <div className="flex-center profile full-height">
        <div className="flex-column ">
          <h1>Your Profile</h1>
          <p className="text-md text-left">{`Name: ${user.firstName} ${user.lastName}`}</p>
          <p className="text-md text-left">{`Email: ${user.email}`}</p>
        </div>
      </div>
    </>
  );
};
export { Profile };
