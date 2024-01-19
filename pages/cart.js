import React, { useState } from "react";
// import axios from "axios";
import { parseCookies } from "nookies";
import Image from "next/image";
// import  Button  from "antd";
import StripeCheckout from "react-stripe-checkout";
import baseUrl from "@/helper/baseUrl";
// import baseUrl from "@/helper/BaseUrl";
const Cart = ({ products }) => {
  // const router = useRouter();
  const [Cproduct, setCartProduct] = useState(products.products);
  const cookie = parseCookies();

  const handleRemove = async (pid) => {
    console.log(pid);
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: cookie?.token,
      },
      body: JSON.stringify({
        productId: pid,
      }),
    });
    let data = await res.json();
    setCartProduct(data);
    console.log(data);
    window.location.reload(`${baseUrl}/api/cart`);
  };
  let price = 0;

  console.log(cookie?.token);
  console.log(Cproduct.quantity);
  const handletoken = async (paymentInfo) => {
    console.log(paymentInfo);

    const data = await fetch(`${baseUrl}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie?.token,
      },
      body: JSON.stringify({
        paymentInfo,
      }),
    });
    const payment = await data.json();
    console.log(payment);
  };

  return (
    <div className="text-center container ">
      <h1 className="text-6xl font-extrabold">Cart</h1>
      <div
        className="
          
          overflow-y-auto
          w-11/12
          h-96
          m-auto
          items-center
          bg-white
          border border-gray-200
          rounded-lg
          shadow-md
          scroll-m-20


          "
      >
        {Cproduct.map((p) => {
          {
            price = price + p.quantity * p.product.price;
          }
          return (
            <div
              className="flex justify-between w-11/12 h-32 m-auto items-center bg-white border border-gray-200 rounded-lg shadow-md flex-wrap"
              key={p._id}
            >
              <Image
                src={p.product.mediaurl}
                className="w-40 h-20 ml-2 rounded-lg shadow-lg"
                alt="Product Image"
              />

              <div className="cartitem mr-2">
                <h1 className="text-lg font-bold">{p.product.name}</h1>
                <button
                  className="
                  text-sm
                  font-bold
                  h-6
                  w-20
                  bg-slate-500
                  rounded-lg
                  hover:bg-red-700
                  "
                  onClick={() => handleRemove(p.product._id)}
                >
                  Remove
                </button>
                <h1 className="text-lg">
                  ${p.product.price}x qty:{p.quantity}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h2>Total Price</h2>
        <p>{price}</p>
        <StripeCheckout
          name="Big Buy"
          currency="USD"
          amount={price * 100}
          token={(paymentInfo) => handletoken(paymentInfo)}
          stripeKey="pk_test_51OQpi9Kh7tyffymbIlB9fg5IC1RQO32nM5nMeRNuVx3Tj18EF8Pz9UEwqQjlSqyP2yWtWjK36M2izP8lHa58zmUf00up1bB70H"
          shippingAddress
          billingAddress
          allowRememberMe
          image={Cproduct[0].product.mediaurl}
        >
          <button
            // clear product
            // onClick={() => setCartProduct([])}
            className="
          text-sm
          font-bold
          h-8
          w-20
          bg-slate-500
        rounded-md
        hover:bg-cyan-600
        "
          >
            CheckOut
          </button>
        </StripeCheckout>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const data = await fetch(`${baseUrl}/api/cart`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  // console.log(data);
  const products = await data.json();

  console.log(products);

  return {
    props: { products },
  };
}

export default Cart;
