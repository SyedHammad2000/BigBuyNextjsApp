/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import baseUrl from "@/helper/baseUrl";
// import baseUrl from "@/helper/BaseUrl";


const create = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router=useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  const [price, setPrice] = useState("");
  const [media, setMedia] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name);
    const mediaurl = await imageUpload();

    try {
      const data = await axios.post(
        `${baseUrl}/api/product`,
        {
          name: name,
          description: description,
          price: price,
          mediaurl: mediaurl.data.url,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data) {
        toast.success("Product Created Succesfully");
      }

      setName("");
      setDescription("");
      setPrice("");
      setMedia("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "ecommerce");
    data.append("cloud_name", "dn3tasa5d");
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dn3tasa5d/image/upload`,
      data
    );
    return res;
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create Product
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Upload Photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setMedia(e.target.files[0])}
                      />
                      {/* <img src={media ? URL.createObjectURL : ""} alt="" /> */}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  type="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => router.push("/")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export const getServerSideProps = async (ctx) => {
  // Get the user session token from the cookies.
  const cookie = parseCookies(ctx);
  const user = cookie?.user ? JSON.parse(cookie?.user) : null;
  if (user?.role != "admin") {
    const { res } = ctx;
    res.writeHead(302, {location:"/"});
    res.end();
  }
  return {
    props: {},
  };
};

export default create;
