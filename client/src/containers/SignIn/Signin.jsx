import { Form, Container, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/Forms/SignInput";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "../../components/Header/Header";
import './Signin.css';
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email, password
    };
    dispatch(login(user));
  }

  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }

  const fixed = "top";
  const navbarpos = "navbarBorderBottom";

  return (
    <div>
      <Header fixed={fixed} navbarpos={navbarpos} />
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            {auth.error ? <div className="errorMsg">
              {'Invalid E-mail or Password...'}
            </div> : null
            }
            <Form onSubmit={userLogin} className="mainContent">
              <Input
                label="Email address:"
                placeholder="Enter Email"
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password:"
                placeholder="Enter Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="btn">
                Sign In!
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;