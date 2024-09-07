import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
const App = () => {
  return (
    <div>
      <Header />
      <Container className="my-4">
        <Outlet />
      </Container>
    </div>
  );
};

export default App;
