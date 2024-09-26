// import { getServerSideProps } from 'next/dist/build/templates/pages'
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Heading,
  Text,
  Stack,
  Divider,
  ButtonGroup,
  Button,
  Input,
  Img,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import Image from "next/image";
// import {} from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import baseUrl from "@/helper/baseUrl";
// import baseUrl from "@/helper/BaseUrl";

const ProductId = ({ productid }) => {
  const [quantity, setquantity] = useState("1");
  const router = useRouter();
  const cookie = parseCookies();
  const user = cookie?.user ? JSON.parse(cookie?.user) : "";
  console.log(user?.role);
  console.log(cookie?.token);

  const deleteProduct = async () => {
    const { res } = await axios.delete(
      `${baseUrl}/api/product/${productid._id}`
    );
    await router.push("/");
  };
  const AddtoCart = async () => {
    const { data } = await axios.put(
      `${baseUrl}/api/cart`,
      {
        quantity,
        productId: productid._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookie?.token,
        },
      }
    );
    console.log(quantity);
    toast.success(`Your ${quantity} ${data.message}`);
  };

  return (
    <div
      className=" flex flex-col justify-center items-center text-lg "
      style={{ height: "100vh" }}
    >
      <div className="w-96 h-96 text-center bg-green-100  rounded-xl ">
        <div className="flex justify-center items-center my-2 hover:opacity-65">
          <img
            src={productid.mediaurl}
            className="w-52 h-48 rounded-lg"
            alt="Product"
          />
        </div>
        <h1>{productid.name}</h1>
        <p>US:${productid.price}</p>
        <div className="flex justify-center">
          <Input
            style={{ width: "10rem" }}
            variant="flushed"
            type="number"
            placeholder="Add Quantity"
            onChange={(e) => setquantity(Number(e.target.value))}
          />
          <Button
            className=" ms-5"
            colorScheme="teal"
            onClick={() => AddtoCart()}
          >
            <FiPlus />
          </Button>
          {user?.role === "admin" ? (
            <Button
              colorScheme="red"
              className=" ms-2"
              onClick={() => deleteProduct()}
            >
              <AiFillDelete />
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const { data } = await axios.get(`${baseUrl}/api/product/${id}`);
  // const data = await res.json();

  return {
    props: {
      productid: data,
    },
  };
}

// export async function getStaticProps({ params: { id } }) {
//   const { data } = await axios.get(`${baseUrl}/api/product/${id}`);
//   // const data = await res.json();

//   return {
//     props: {
//       productid: data,
//     },
//   };
// }
// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: "abc" } }],
//     fallback: true,
//   };
// }

export default ProductId;
