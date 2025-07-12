import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Package,
  Heart,
  Repeat,
  Coins,
  TrendingUp,
  Plus,
  Eye,
  MessageCircle,
  Star,
  Filter,
  Search,
} from "lucide-react";
import ItemCard from "../components/ItemCard";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [myItems, setMyItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [swapRequests, setSwapRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockMyItems = [
    {
      id: "1",
      title: "Vintage Denim Jacket",
      image:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      condition: "Excellent",
      size: "M",
      points: 120,
      category: "jackets",
      isSwappable: true,
      swapType: "direct",
      views: 45,
      likes: 12,
    },
    {
      id: "2",
      title: "Designer Silk Blouse",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      condition: "Good",
      size: "S",
      points: 95,
      category: "tops",
      swapType: "points",
      views: 23,
      likes: 8,
    },
  ];

  const mockLikedItems = [
    {
      id: "3",
      title: "Casual Summer Dress",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      condition: "Like New",
      size: "L",
      points: 80,
      category: "dresses",
      isSwappable: true,
      swapType: "direct",
      views: 67,
      likes: 15,
    },
    {
      id: "4",
      title: "Wool Winter Coat",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      condition: "Good",
      size: "M",
      points: 150,
      category: "coats",
      swapType: "points",
      views: 34,
      likes: 9,
    },
  ];

  const mockSwapRequests = [
    {
      id: "1",
      itemTitle: "Vintage Denim Jacket",
      requesterName: "Sarah Johnson",
      requesterImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      status: "pending",
      date: "2024-01-15",
      swapType: "direct",
    },
    {
      id: "2",
      itemTitle: "Designer Silk Blouse",
      requesterName: "Mike Chen",
      requesterImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      status: "accepted",
      date: "2024-01-14",
      swapType: "points",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMyItems(mockMyItems);
      setLikedItems(mockLikedItems);
      setSwapRequests(mockSwapRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    {
      title: "My Items",
      value: myItems.length,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Liked Items",
      value: likedItems.length,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Swap Requests",
      value: swapRequests.length,
      icon: Repeat,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Points Earned",
      value: "1,250",
      icon: Coins,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const handleSwapRequest = (requestId, action) => {
    // TODO: Implement swap request handling
    console.log(`${action} swap request:`, requestId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.firstName || user?.email}! Here's what's
            happening with your sustainable fashion journey.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: TrendingUp },
                { id: "my-items", label: "My Items", icon: Package },
                { id: "liked", label: "Liked Items", icon: Heart },
                { id: "requests", label: "Swap Requests", icon: Repeat },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Activity
                  </h3>
                  <Link
                    to="/add-item"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* My Items Preview */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">
                      My Items
                    </h4>
                    <div className="space-y-3">
                      {myItems.slice(0, 2).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.views} views • {item.likes} likes
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Swap Requests */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">
                      Recent Swap Requests
                    </h4>
                    <div className="space-y-3">
                      {swapRequests.slice(0, 2).map((request) => (
                        <div
                          key={request.id}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <img
                            src={request.requesterImage}
                            alt={request.requesterName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {request.requesterName}
                            </p>
                            <p className="text-xs text-gray-500">
                              wants to swap for "{request.itemTitle}"
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              request.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "my-items" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    My Items
                  </h3>
                  <Link
                    to="/add-item"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "liked" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Liked Items
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {likedItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "requests" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Swap Requests
                </h3>
                <div className="space-y-4">
                  {swapRequests.map((request) => (
                    <div key={request.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={request.requesterImage}
                            alt={request.requesterName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {request.requesterName}
                            </p>
                            <p className="text-sm text-gray-600">
                              Wants to swap for "{request.itemTitle}"
                            </p>
                            <p className="text-xs text-gray-500">
                              {request.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {request.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleSwapRequest(request.id, "accept")
                                }
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleSwapRequest(request.id, "decline")
                                }
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              >
                                Decline
                              </button>
                            </>
                          )}
                          {request.status === "accepted" && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              Accepted
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
