import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {

  const context = useContext(ShopContext);
  const products = context?.products || [];
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    } else {
      setLatestProducts([]);
    }
  }, [products])

  return (
    <div className="my-10">
      {/* Section Heading */}
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals, thoughtfully designed to blend style,
          comfort, and quality. Explore the latest trends crafted to elevate
          your everyday look.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {Array.isArray(latestProducts) && latestProducts.length > 0 ? (
          latestProducts.map((item, index) => {
            const itemId = item?._id || `latest-${index}`;
            return (
              <ProductItem
                key={itemId}
                id={itemId}
                image={item?.image || []}
                name={item?.name || "Unnamed Product"}
                price={item?.price || 0}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            <p>Loading products...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LatestCollection
