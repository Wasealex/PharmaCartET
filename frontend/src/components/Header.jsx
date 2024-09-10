import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { BsCart4, BsPersonCircle } from "react-icons/bs";
import { CiLock, CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import logo from "../assets/images/logos/Logo02.png";

const Header = () => {
  const userInfo = useSelector((state) => state.auth);
  const userName = userInfo?.userInfo?.name;
  const dispatch = useDispatch();

  const isAdmin = userInfo?.userInfo?.isAdmin;
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="header">
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="justify-content-between"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="PharmaCart" width="30px" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {userName ? (
                <>
                  <NavDropdown title={userName} id="username" align="end">
                    {isAdmin && (
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>
                          <CiLock /> Admin Dashboard
                        </NavDropdown.Item>
                      </LinkContainer>
                    )}
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <BsPersonCircle /> Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/cart">
                      <NavDropdown.Item>
                        <BsCart4 />
                        Cart <Badge bg="danger">1</Badge>
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <CiLogout />
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign in
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
