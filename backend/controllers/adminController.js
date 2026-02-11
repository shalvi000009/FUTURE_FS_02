import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

// Admin dashboard stats
const getAdminStats = async (req, res) => {
  try {
    const [ordersCount, productsCount, usersCount, revenueAgg] = await Promise.all([
      orderModel.countDocuments({}),
      productModel.countDocuments({}),
      userModel.countDocuments({}),
      orderModel.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
    ]);

    const revenue = revenueAgg?.[0]?.total || 0;

    res.json({
      success: true,
      stats: {
        orders: ordersCount,
        products: productsCount,
        users: usersCount,
        revenue,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getAdminStats };
