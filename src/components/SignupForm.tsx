import axios from "axios";

import { Loader2 } from "lucide-react";

import { useRef, useState } from "react";
import type { RefObject } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Link, useNavigate } from "react-router-dom";

import { signUpValidation } from "../../modules/validation";

interface signUpFormProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SignupForm(props: signUpFormProps) {
  const usernameRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    usernameMessage: "",
    passwordMessage: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function submitNewUser(): Promise<void> {
    const error = signUpValidation(
      usernameRef.current?.value,
      passwordRef.current?.value,
    );

    if (error.passwordMessage === "" && error.usernameMessage === "") {
      setLoading(true);

      try {
        setShowErrorMessage(false);

        const response = await axios.post("http://13.58.53.141:3000/sign-up", {
          username: usernameRef.current?.value.trim(),
          password: passwordRef.current?.value.trim(),
        });

        //if it succeeds than auto login
        if (response.data.user) {
          const logIn = await axios.post("http://13.58.53.141:3000/log-in", {
            username: usernameRef.current?.value.trim(),
            password: passwordRef.current?.value.trim(),
          });

          if (logIn.data.token) {
            localStorage.setItem("token", logIn.data.token);
            localStorage.setItem("user", JSON.stringify(logIn.data.user));
            setShowErrorMessage(false);
            props.setLoggedIn(true);
            setLoading(false);
            navigate("/creater-interface/");
          }
        } else {
          setLoading(false);
          console.log("create user failed");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      //ts work around if statement
      if (
        error.usernameMessage !== undefined &&
        error.passwordMessage !== undefined
      ) {
        setErrorMessage({
          usernameMessage: error.usernameMessage,
          passwordMessage: error.passwordMessage,
        });
      }
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="flex justify-center items-center h-[90vh] w-[100vw] mt-[10vh]">
      <Card className="w-[25vw] mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            ref={usernameRef}
            type="text"
            name="username"
            placeholder="Username"
          />
          {showErrorMessage && (
            <p className="mt-1 ml-1 mb-[-.5vh] error-message text-xs">
              {errorMessage.usernameMessage}
            </p>
          )}
        </CardContent>
        <CardContent>
          <Input
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="Password"
          />
          {showErrorMessage && (
            <p className="mt-1 ml-1 mb-[-.5vh] error-message text-xs">
              {errorMessage.passwordMessage}
            </p>
          )}
        </CardContent>
        <CardContent>
          {!loading ? (
            <Button className="w-full" onClick={submitNewUser}>
              Submit
            </Button>
          ) : (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          )}
        </CardContent>
        <CardFooter>
          <Link to="/log-in">Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
