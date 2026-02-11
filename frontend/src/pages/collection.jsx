import { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";



const safeAssets = assets || {};

const Collection = () => {
 const { products = [], search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const [Category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const originalProductsRef = useRef([]);

  /* ================= CATEGORY ================= */
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  /* ================= SUB CATEGORY ================= */
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  /* ================= LOAD PRODUCTS ================= */
  useEffect(() => {
    if (Array.isArray(products)) {
      originalProductsRef.current = products;
      setFilterProducts(products);
    }
  }, [products]);

  /* ================= APPLY FILTERS + SEARCH ================= */
  useEffect(() => {
    let filtered = [...originalProductsRef.current];

    // 🔍 SEARCH LOGIC
    if (showSearch && search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📂 CATEGORY FILTER
    if (Category.length > 0) {
      filtered = filtered.filter((item) =>
        Category.includes(item.category)
      );
    }

    // 👕 SUB CATEGORY FILTER
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // 🔃 SORT
    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [Category, subCategory, search, showSearch, sortType, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t">

      {/* ================= FILTER SECTION ================= */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={safeAssets?.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        {/* CATEGORY */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Men", "Women", "Kids"].map((item) => (
              <label key={item} className="flex gap-2 items-center">
                <input type="checkbox" value={item} onChange={toggleCategory} />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* TYPE */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
              <label key={item} className="flex gap-2 items-center">
                <input type="checkbox" value={item} onChange={toggleSubCategory} />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <img
                  src={Array.isArray(item.image) && item.image.length > 0 ? item.image[0] : ""}
                  alt={item.name}
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="p-3 text-sm">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No products found
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Collection;
