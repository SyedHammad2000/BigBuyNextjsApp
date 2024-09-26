import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
// import baseUrl from "@/helper/BaseUrl";
import Image from "next/image";
import baseUrl from "@/helper/baseUrl";

const page = ({ products }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [productsPerPage] = useState(4);
  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  return (
    <div className="">
      <div className="bg-white">
        <h2 className="text-center">Products</h2>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className=" *:font-mono mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {currentProducts.map((product) => (
              <div key={product._id} className="group relative">
                {/* <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.mediaurl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  /> */}
                <div
                  className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg
                  gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
                >
                  <img src={product.mediaurl} alt="" srcset="" />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <Link href={"/product/[id]"} as={`/product/${product._id}`}>
                      <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastProduct >= products.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// export const getStaticProps = async () => {
//   const { data } = await axios.get(`${baseUrl}/api/product`);
//   // const data = await res.json();

//   return {
//     props: {
//       products: data,
//     },
//   };
// };

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${baseUrl}/api/product`);
  // const data = await res.json();

  return {
    props: {
      products: data,
    },
  };
};

export default page;
