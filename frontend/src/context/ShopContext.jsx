import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets, products as assetProducts } from "../assets/assets";

// Create context
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = "https://future-fs-02-backend-bvky.onrender.com";

  const [products, setProducts] = useState(assetProducts || []);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  /* ===================== ADD TO CART ===================== */
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size]
        ? (cartData[itemId][size] += 1)
        : (cartData[itemId][size] = 1);
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* ===================== CART COUNT ===================== */
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        totalCount += cartItems[items][size];
      }
    }
    return totalCount;
  };

  /* ===================== UPDATE QUANTITY ===================== */
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* ===================== CART AMOUNT ===================== */
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const size in cartItems[items]) {
          totalAmount += itemInfo.price * cartItems[items][size];
        }
      }
    }
    return totalAmount;
  };

  /* ===================== GET PRODUCTS ===================== */
  const getProductsData = async () => {
    // Use ONLY static products from assets for the user catalog
    const allProducts = assetProducts || [];
    console.log("Loaded products from assets:", allProducts.length);
    setProducts(allProducts);
  };

  /* ===================== GET USER CART ===================== */
  const getUserCart = async (userToken) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/cart/get`,
        { headers: { token: userToken } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ===================== LOAD DATA ===================== */
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  /* ===================== CONTEXT VALUE ===================== */
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
