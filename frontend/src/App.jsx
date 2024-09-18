import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <Outlet />
      </Container>
      <ToastContainer />
    </div>
  );
};

export default App;
