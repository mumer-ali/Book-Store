import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import login from "../assets/login.png";
import google from "../assets/google.svg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useAuth from "@/store/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    await axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          toast.success("Welcome Back");
          navigate("/");
        } else {
          toast.error(`Error: ${response.status}`);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
      <Navbar />
      <div className="hidden lg:block ">
        <div className="py-5 flex justify-center items-center">
          <div className="w-1/2">
            <img className="w-full m-auto p-16" src={login} />
          </div>
          <div className="w-1/2 mb-10">
            <div className="w-1/2 m-auto">
              <form onSubmit={loginUser}>
                <h3 className="mb-5 text-3xl font-bold">Log In</h3>

                <div className="w-full pt-4">
                  <Label htmlFor="inEmail">Email</Label>
                  <Input
                    id="inEmail"
                    type="email"
                    className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>

                <div className="w-full pt-4">
                  <Label htmlFor="inPass">Password</Label>
                  <Input
                    id="inPass"
                    type="password"
                    className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-between mt-2 items-center">
                  <div>
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="ml-2">
                      Remember me
                    </Label>
                  </div>
                  <div className="lg:text-xs xl:text-sm">
                    <Link to="/ResetPassword">
                      <p className="cursor-pointer m-auto">
                        <u>
                          <b>Forgot Password?</b>
                        </u>
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="w-full my-3">
                  <Button
                    className="w-full h-10"
                    type="submit"
                    variant="default"
                  >
                    Log In
                  </Button>
                </div>
              </form>
              <div>
                <div className="flex justify-center items-center">
                  <p className="m-auto text-sm">OR</p>
                </div>
                <div className="w-full mt-3">
                  <Link to="http://localhost:8000/auth/google/callback">
                    <Button className="w-full bg-white text-black h-10 border-2 border-gray-100 rounded-sm shadow-md">
                      <img src={google} alt="Google" className="h-7 p-1 mr-1" />
                      Log In with Google
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
