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

interface loginFormProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginForm(props: loginFormProps) {
  const usernameRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function checkLoginCreds(): Promise<void> {
    setLoading(true);

    try {
      const response = await axios.post("https://fierce-dawn-84888-34f3e45a7f77.herokuapp.com/log-in", {
        username: usernameRef.current?.value.trim(),
        password: passwordRef.current?.value.trim(),
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setShowErrorMessage(false);
        props.setLoggedIn(true);
        setLoading(false);
        navigate("/creater-interface/");
      } else {
        setLoading(false);
        setShowErrorMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center items-center h-[90vh] w-[100vw] mt-[10vh]">
      <Card className="w-[25vw] mx-auto">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            ref={usernameRef}
            type="text"
            name="username"
            placeholder="Username"
          />
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
              Username or Password is Incorrect.
            </p>
          )}
        </CardContent>
        <CardContent>
          {!loading ? (
            <Button className="w-full" onClick={checkLoginCreds}>
              Submit
            </Button>
          ) : (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to="/creater-interface/sign-up">Sign Up</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
