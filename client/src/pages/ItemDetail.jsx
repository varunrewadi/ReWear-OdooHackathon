import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Heart,
  Share2,
  MapPin,
  User,
  Repeat,
  Coins,
  MessageCircle,
  ArrowLeft,
  Star,
  Eye,
} from "lucide-react";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapType, setSwapType] = useState("direct");

  // Mock item data
  const mockItem = {
    id: id,
    title: "Vintage Denim Jacket",
    description:
      "Classic 90s denim jacket in excellent condition. Perfect for any casual outfit. This timeless piece features a comfortable fit and authentic vintage styling that never goes out of fashion.",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    condition: "Excellent",
    size: "M",
    brand: "Levi's",
    color: "Blue",
    category: "Jackets",
    points: 120,
    swapType: "direct",
    location: "New York, NY",
    user: {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah@example.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      rating: 4.8,
      swapCount: 15,
    },
    views: 156,
    likes: 23,
    createdAt: "2024-01-10",
    tags: ["vintage", "denim", "casual", "sustainable"],
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setItem(mockItem);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: Implement like functionality
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    navigator
      .share?.({
        title: item.title,
        text: item.description,
        url: window.location.href,
      })
      .catch(() => {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
      });
  };

  const handleSwapRequest = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowSwapModal(true);
  };

  const confirmSwap = () => {
    // TODO: Implement swap request
    console.log("Swap request:", { itemId: id, swapType });
    setShowSwapModal(false);
    // Show success message
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Item not found
          </h2>
          <p className="text-gray-600 mb-4">
            The item you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/browse")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Items
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index
                        ? "border-green-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {item.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLike}
                    className={`p-2 rounded-lg transition-colors ${
                      isLiked
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {item.views} views
                </span>
                <span>{item.likes} likes</span>
                <span>
                  Listed {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Swap Type Badge */}
              <div className="mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    item.swapType === "points"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {item.swapType === "points" ? (
                    <>
                      <Coins className="h-4 w-4 mr-1" />
                      {item.points} points
                    </>
                  ) : (
                    <>
                      <Repeat className="h-4 w-4 mr-1" />
                      Direct Swap
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Price/Points */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {item.swapType === "points"
                    ? `${item.points} pts`
                    : "Free Swap"}
                </span>
                <button
                  onClick={handleSwapRequest}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Request Swap
                </button>
              </div>
            </div>

            {/* Item Details */}
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Item Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Condition:</span>
                  <p className="font-medium text-gray-900">{item.condition}</p>
                </div>
                <div>
                  <span className="text-gray-500">Size:</span>
                  <p className="font-medium text-gray-900">{item.size}</p>
                </div>
                <div>
                  <span className="text-gray-500">Brand:</span>
                  <p className="font-medium text-gray-900">{item.brand}</p>
                </div>
                <div>
                  <span className="text-gray-500">Color:</span>
                  <p className="font-medium text-gray-900">{item.color}</p>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <p className="font-medium text-gray-900">{item.category}</p>
                </div>
                <div>
                  <span className="text-gray-500">Location:</span>
                  <p className="font-medium text-gray-900 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About the Seller
              </h3>
              <div className="flex items-center space-x-4">
                <img
                  src={item.user.avatar}
                  alt={item.user.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {item.user.firstName} {item.user.lastName}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {item.user.rating}
                    </div>
                    <span>•</span>
                    <span>{item.user.swapCount} swaps</span>
                  </div>
                </div>
                <button className="text-green-600 hover:text-green-700 font-medium">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Request Swap
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Swap Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="direct"
                      checked={swapType === "direct"}
                      onChange={(e) => setSwapType(e.target.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      Direct Swap
                    </span>
                  </label>
                  {item.swapType === "points" && (
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="points"
                        checked={swapType === "points"}
                        onChange={(e) => setSwapType(e.target.value)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Use Points ({item.points} pts)
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSwap}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
