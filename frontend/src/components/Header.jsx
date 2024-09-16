import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { BsCart4, BsPersonCircle } from "react-icons/bs";
import { CiLock, CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useGetCartQuery } from "../slices/cartApiSlice";
import { clearCredentials } from "../slices/authSlice";
import logo from "../assets/images/logos/Logo02.png";
import defaultImg from "../assets/default/defaultprofile.png";
import { parseImageUrl } from "../utils/imageUtils";
import "../styles/header.style.css";

const Header = () => {
  const userInfo = useSelector((state) => state.auth);
  const userProfileImage = userInfo?.userInfo?.ImageUrl;
  const userName = userInfo?.userInfo?.name;
  const dispatch = useDispatch();

  const profileImage =
    userProfileImage && parseImageUrl(userProfileImage) !== defaultImg
      ? parseImageUrl(userProfileImage)
      : defaultImg;

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

  const { data: cart, error, isLoading } = useGetCartQuery();
  const cartCount = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header className="header">
      <Navbar expand="lg" className="header-container">
        <LinkContainer to="/" className="header-brand">
          <Navbar.Brand>
            <img src={logo} alt="PharmaCart" />
            PharmaCart
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="header-toggle"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="header-collapse">
          <Nav className="header-nav">
            {userName ? (
              <>
                <NavDropdown
                  title={
                    <div className="header-dropdown">
                      <img src={profileImage} alt={userName} />
                      {userName}
                    </div>
                  }
                  id="username"
                  align="end"
                >
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
                      Cart <Badge className="header-badge">{cartCount}</Badge>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <CiLogout /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="header-link">
                    <FaSignInAlt /> Sign in
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link className="header-link">
                    <FaSignOutAlt /> Sign up
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
