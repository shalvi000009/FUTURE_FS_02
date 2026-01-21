import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";

const BestSeller = () => {
  const context = useContext(ShopContext);
  const products = context?.products || [];
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const bestProduct = products.filter(item => item?.bestseller === true);
      setBestSeller(bestProduct.slice(0, 5));
    } else {
      setBestSeller([]);
    }
  }, [products]);

  return (
    <div className="my-10">

      {/* Heading */}
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Our best-selling products are chosen by customers for their quality,
          comfort, and modern style. Explore the favorites that everyone loves.
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {Array.isArray(bestSeller) && bestSeller.length > 0 ? (
          bestSeller.map((item) => {
            const itemId = item?._id || Math.random().toString();
            return (
              <ProductItem
                key={itemId}
                id={itemId}
                name={item?.name || "Unnamed Product"}
                image={item?.image || []}   
                price={item?.price || 0}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            <p>No best sellers available</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default BestSeller;
