/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import baseUrl from "@/helper/baseUrl";
// import baseUrl from "@/helper/BaseUrl";

const signup = () => {
  const router = useRouter();
  const [name, Setname] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);

    try {
      const { data } = await axios.post(`${baseUrl}/api/signup`, {
        name,
        email,
        password,
      });
      if (data) {
        toast.success(data.message);
        router.push("/login");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Signup api");
    }
  };

  return (
    <div className="m-2 p-10 ">
      <form className="border" onSubmit={(e) => submitHandler(e)}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 m-auto">
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={name}
                onChange={(e) => Setname(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                value={password}
                onChange={(e) => Setpassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => Setemail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="button">
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default signup;
