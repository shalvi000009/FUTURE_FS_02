import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts.jsx';

const Product = () => {
  const { productId } = useParams();
  const { products, currency , addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
   
  const fetchProductData = () => {
    // Find product using string comparison for ID compatibility
    const product = products.find((item) => String(item._id) === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) return <div className='opacity-0'>Loading...</div>;

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 p-4'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between gap-3'>
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                className='w-[24%] sm:w-full cursor-pointer flex-shrink-0'
                alt={`product-${index}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='Selected Product' />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          {/* Ratings */}
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className='w-3 h-5' />
            <img src={assets.star_icon} alt="" className='w-3 h-5' />
            <img src={assets.star_icon} alt="" className='w-3 h-5' />
            <img src={assets.star_icon} alt="" className='w-3 h-5' />
            <img src={assets.star_dull_icon} alt="" className='w-3 h-5' />
            <p className='pl-2'>(122)</p>
          </div>

          {/* Price */}
          <p className='mt-5 text-3xl font-medium'>
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className='mt-5 text-gray-500 md:w-4/5'>
            {productData.description}
          </p>

          {/* Sizes */}
          {productData.sizes && productData.sizes.length > 0 && (
            <>
              <div className='flex flex-col gap-4 my-8'>
                <p>Select Size</p>
                <div className='flex gap-2'>
                  {productData.sizes.map((item, index) => (
                    <button onClick={() => setSize(item)}
                      key={index}
                      className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={()=> addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Add to Cart</button>
              <hr className='mt-8 sm:w-4/5' />
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% Original Products.</p>
                <p>Cash on delivery available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ---------- Description & Review Section ---------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* ---------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  );
};

export default Product;
