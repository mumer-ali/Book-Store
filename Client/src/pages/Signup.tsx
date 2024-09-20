import React from "react";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import signup from "../assets/signup.png";
import google from "../assets/google.svg";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { PhoneInput } from "../components/ui/phone-input";
import useAuth from "@/store/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    console.log({ ...data, phoneNumber });
    const { firstName, lastName, email, password } = data;
    await axios
      .post("/signup", {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          navigate("/");
        } else {
          toast.error(`Error: ${response.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    if (user) {
      toast.success(`Welcome ${user.firstName}`);
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <div className="hidden lg:block">
        <div className="py-5 flex justify-center items-center">
          <div className="w-1/2">
            <img className="w-full" src={signup} />
          </div>
          <div className="w-1/2 mb-10">
            <div className="w-1/2 m-auto">
              <form onSubmit={registerUser} method="post">
                <h3 className="mb-5 text-3xl font-bold">Register</h3>

                <div className="w-full mb-2">
                  <Label htmlFor="fName">First Name</Label>
                  <Input
                    id="fName"
                    type="text"
                    className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                    value={data.firstName}
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                  />
                </div>

                <div className="w-full mb-2">
                  <Label htmlFor="lName">Last Name</Label>
                  <Input
                    id="lName"
                    type="text"
                    className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                    value={data.lastName}
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
                    }
                  />
                </div>

                <div className="w-full mb-2">
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
                <div className="w-full">
                  <Label htmlFor="phoneNo">Phone Number</Label>
                  <PhoneInput
                    id="phone"
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                  />
                </div>
                <div className="w-full">
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
                <div className="w-full my-3">
                  <Button className="w-full h-10" type="submit">
                    Register
                  </Button>
                </div>
              </form>
              <div>
                <div className="flex justify-center items-center">
                  <p className="m-auto text-sm">OR</p>
                </div>
                <div className="w-full mt-3">
                  <Link to="http://localhost:8000/auth/google/callback">
                    <Button className="w-full bg-white text-black border-1 rounded-sm h-10 border-2 border-gray-100 shadow-md">
                      <img src={google} alt="Google" className="h-7 mr-2" />
                      Register with Google
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

export default Signup;
