import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import { useSelector } from "react-redux";
const HomeScreen = () => {
  const userInfo = useSelector((state) => state.auth);
  const userName = userInfo?.userInfo?.name;
  return <div>{userName ? <Welcome /> : <Hero />}</div>;
};

export default HomeScreen;
