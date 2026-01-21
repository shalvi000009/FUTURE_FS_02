import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext({
    products: [],
    currency: "$",
    delivery_fee: 10
});

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const currency = "$";
    const delivery_fee = 10;
    const [search , setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();


    const addToCart = async (itemId,size) => {

        if (!size) {
            toast.error("Please select a size before adding to cart.");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        
        setCartItems(cartData);
           
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
               try{
                   if (cartItems[items][size]>0) {
                    totalCount += cartItems[items][size];
                   }
               }catch(error){
                   
               }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo) {
                for (const item in cartItems[items]) {
                    try {
                        if (cartItems[items][item] > 0) {
                            totalAmount += itemInfo.price * cartItems[items][item];
                        }
                    } catch (error) {

                    }
                }
            }
        }
        return totalAmount;
    }

    // Load products safely
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const assetsModule = await import("../assets/assets");
                const loadedProducts = assetsModule?.products || [];
                setProducts(Array.isArray(loadedProducts) ? loadedProducts : []);
            } catch (error) {
                console.warn("Failed to load products from assets:", error);
                setProducts([]);
            }
        };
        loadProducts();
    }, []);

    const value = {
        products: Array.isArray(products) ? products : [],
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
        navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;