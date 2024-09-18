import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import defaultImg from "../assets/default/defaultprofile.png";
import { parseImageUrl } from "../utils/imageUtils";
import "../styles/signing.style.css";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null); // State for the image file

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo?.name);
    setEmail(userInfo?.email);
  }, [userInfo]);

  // Determine which image to display
  const profileImage =
    userInfo.ImageUrl && userInfo.ImageUrl !== defaultImg
      ? parseImageUrl(userInfo.ImageUrl)
      : defaultImg;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const formData = new FormData();
      formData.append("_id", userInfo._id);
      formData.append("name", name);
      formData.append("email", email);
      if (password) formData.append("password", password);
      if (image) formData.append("image", image); // Append the image file

      try {
        const res = await updateProfile(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated");
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="sign-screen">
      {isLoading && <Loader />}
      <FormContainer>
        <img
          src={profileImage}
          alt="profile"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          className="ms-3 mb-3 d-inline-block align-top rounded-circle border border-3"
        />
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="image">
            <Form.Label>Upload Profile Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {isLoading && <Loader />}
          <Button type="submit" variant="primary" className="my-3">
            Update
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ProfileScreen;
