import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const STATUS_STEPS = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const TrackOrder = () => {
  const { orderId } = useParams();
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token || !orderId) {
        setError("Missing order or authentication.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${backendUrl}/api/order/track/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 404) {
          setError("Order not found or does not belong to you.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (!data.success) {
          setError(data.message || "Failed to load order.");
        } else {
          setOrder(data.order);
        }
      } catch (e) {
        setError(e.message || "Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [backendUrl, orderId, token]);

  const currentIndex = useMemo(() => {
    if (!order) return -1;
    if (order.status === "Cancelled") return -2;
    const idx = STATUS_STEPS.findIndex(
      (s) => s.toLowerCase() === String(order.status).toLowerCase()
    );
    return idx;
  }, [order]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2 font-medium">Unable to track order</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const dateString = new Date(order.date).toLocaleString();

  return (
    <div className="border-t pt-10 pb-16">
      <div className="mb-6">
        <Title text1="TRACK" text2="ORDER" />
      </div>

      {/* Order header */}
      <div className="bg-white border rounded-xl p-4 md:p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-sm md:text-base font-mono">{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Placed on</p>
            <p className="text-sm md:text-base">{dateString}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-lg font-semibold">
              {currency}
              {order.amount}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment</p>
            <p className="text-sm md:text-base">
              {order.paymentMethod} &middot;{" "}
              <span className={order.payment ? "text-green-600" : "text-orange-500"}>
                {order.payment ? "Paid" : "Pending"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border rounded-xl p-4 md:p-6 mb-8 shadow-sm">
        <p className="text-sm font-medium mb-4">Order progress</p>
        {order.status === "Cancelled" ? (
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <span className="w-3 h-3 bg-red-600 rounded-full"></span>
            <p>This order has been cancelled.</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {STATUS_STEPS.map((step, index) => {
              const isCompleted = index <= currentIndex;
              const isCurrent = index === currentIndex;
              return (
                <div key={step} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                        isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                      } ${isCurrent ? "ring-4 ring-green-100" : ""}`}
                    >
                      {isCompleted ? "✔" : index + 1}
                    </div>
                    <p className={`mt-2 text-xs md:text-sm text-center font-medium ${isCompleted ? "text-green-600" : "text-gray-400"}`}>
                      {step}
                    </p>
                  </div>
                  {index < STATUS_STEPS.length - 1 && (
                    <div
                      className={`hidden md:block flex-1 h-[3px] mx-2 -mt-6 ${
                        index < currentIndex ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Address + items */}
      <div className="grid md:grid-cols-[2fr_3fr] gap-6">
        {/* Address */}
        <div className="bg-white border rounded-xl p-4 md:p-6 shadow-sm">
          <p className="text-sm font-medium mb-3">Delivery address</p>
          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-medium">
              {order.address?.firstName} {order.address?.lastName}
            </p>
            <p>{order.address?.street}</p>
            <p>
              {order.address?.city}, {order.address?.state}
            </p>
            <p>
              {order.address?.country} - {order.address?.zipcode}
            </p>
            <p className="mt-2 text-gray-600">Phone: {order.address?.phone}</p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white border rounded-xl p-4 md:p-6 shadow-sm">
          <p className="text-sm font-medium mb-3">Products</p>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm border-b last:border-b-0 pb-3 last:pb-0"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">
                    Qty: {item.quantity} &middot; Size: {item.size}
                  </p>
                </div>
                <p className="font-medium">
                  {currency}
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;

