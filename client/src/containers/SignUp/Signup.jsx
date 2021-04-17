import { Form, Container, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/Forms/SignInput";
import { useState } from "react";
import './Signup.css';
import Header from "../../components/Header/Header";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/userActions";

const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const validate = () => {
    if (!email.includes('@')) {
      setError("Invalid email...");
      return false;
    }
    if (name.length < 3) {
      setError("Name cannot be less than 3 characters...");
      return false;
    }
    if (contactNumber < 6) {
      setError("Enter a valid phone number...");
      return false;
    }
    if (!password.includes('1') && !password.includes('2') && !password.includes('3') && !password.includes('4') && !password.includes('5') && !password.includes('6') && !password.includes('7') && !password.includes('8') && !password.includes('9') && !password.includes('0') && !password.includes('A') && !password.includes('B') && !password.includes('C') && !password.includes('D') && !password.includes('E') && !password.includes('F') && !password.includes('G') && !password.includes('H') && !password.includes('I') && !password.includes('J') && !password.includes('K') && !password.includes('L') && !password.includes('M') && !password.includes('N') && !password.includes('O') && !password.includes('P') && !password.includes('Q') && !password.includes('R') && !password.includes('S') && !password.includes('T') && !password.includes('U') && !password.includes('V') && !password.includes('W') && !password.includes('X') && !password.includes('Y') && !password.includes('Z')) {
      setError("Password must contain at least one number and one capital number...");
      return false;
    }
    setError('')
    return true;
  }

  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      name, email, contactNumber, password
    }

    const isValid = validate();
    if (isValid)
      dispatch(signup(user));
  }

  const renderExistError = () => {
    return (
      <div className="errorMsg">
        {'E-mail or phone number already exists...'}
      </div>
    );
  }

  const renderValidationError = () => {
    return (
      <div className="errorMsg">
        {error}
      </div>
    );
  }

  if (user.authenticate) {
    return <Redirect to={`/`} />
  }

  if (user.loading) {
    return <h1>Loading...</h1>
  }

  const fixed = "top";
  const navbarpos = "navbarBorderBottom";

  return (
    <div>
      <Header fixed={fixed} navbarpos={navbarpos} />
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            {error ? renderValidationError() : user.error ? renderExistError() : null}
            <Form onSubmit={userSignup} className="mainContent">
              <Input
                label="Name:"
                placeholder="Enter Name"
                value={name}
                type="text"
                inputMessage="We'll never share your email with anyone else."
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="Email address:"
                placeholder="Enter email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Phone Number:"
                placeholder="Enter Phone Number:"
                value={contactNumber}
                type="text"
                onChange={(e) => setContactNumber(e.target.value)}
              />

              <Input
                label="Password:"
                placeholder="Enter Password:"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button className="btn" type="submit">
                Sign Up!
                </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
