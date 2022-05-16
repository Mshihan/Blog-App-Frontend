import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";

const SIGNIN_USER = gql`
  mutation ($user: SigninCredentials!) {
    signin(user: $user) {
      token
      userErrors {
        message
      }
    }
  }
`;

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [signIn, { data, loading }] = useMutation(SIGNIN_USER);

  const handleClick = () => {
    signIn({
      variables: {
        user: {
          email: email,
          password: password,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.signin.userErrors.length > 0) {
        setError(data.signin.userErrors[0].message);
      }

      if (data.signin.token) {
        localStorage.setItem("token", data.signin.token);
      }
    }
  }, [data]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signin</Button>
      </Form>
    </div>
  );
}
