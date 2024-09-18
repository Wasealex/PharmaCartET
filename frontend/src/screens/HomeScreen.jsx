import LandingPage from "../components/LandingPage";
import Welcome from "../components/Welcome";
import { useSelector } from "react-redux";
const HomeScreen = () => {
  const userInfo = useSelector((state) => state.auth);
  const userName = userInfo?.userInfo?.name;
  return <div>{userName ? <Welcome /> : <LandingPage />}</div>;
};

export default HomeScreen;
