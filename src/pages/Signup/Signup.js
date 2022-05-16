import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const SIGNUP_USER = gql`
  mutation ($user: UserInput!) {
    signup(user: $user) {
      token
      userErrors {
        message
      }
    }
  }
`;

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);

  const [signup, { data, loading }] = useMutation(SIGNUP_USER);

  if (data)
    if (data.signup.userErrors.length > 0)
      setError(data.signup.userErrors[0].message);

  const handleClick = () => {
    signup({
      variables: {
        user: {
          name: name,
          bio: bio,
          password: password,
          email: email,
        },
      },
    });

    if (data.signup.token) localStorage.setItem("token", data.signup.token);
  };

  if (loading) return <div>loading...</div>;
  if (!data) return <div>404.....</div>;

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signup</Button>
      </Form>
    </div>
  );
}
