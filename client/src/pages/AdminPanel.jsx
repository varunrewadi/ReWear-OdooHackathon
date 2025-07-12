import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Users,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Shield,
  BarChart3,
  Settings,
} from "lucide-react";

const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [pendingItems, setPendingItems] = useState([]);
  const [reportedItems, setReportedItems] = useState([]);
  const [users, setUsers] = useState([]);

  // Mock data
  const mockStats = {
    totalUsers: 15420,
    totalItems: 8923,
    pendingItems: 23,
    reportedItems: 7,
    activeSwaps: 1247,
    monthlyGrowth: 12.5,
  };

  const mockPendingItems = [
    {
      id: "1",
      title: "Vintage Denim Jacket",
      user: "sarah@example.com",
      submittedAt: "2024-01-15T10:30:00Z",
      category: "Jackets",
      image:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "2",
      title: "Designer Silk Blouse",
      user: "mike@example.com",
      submittedAt: "2024-01-15T09:15:00Z",
      category: "Tops",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  const mockReportedItems = [
    {
      id: "3",
      title: "Casual Summer Dress",
      user: "emma@example.com",
      reportedBy: "john@example.com",
      reason: "Inappropriate content",
      reportedAt: "2024-01-14T16:45:00Z",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  const mockUsers = [
    {
      id: "1",
      email: "sarah@example.com",
      firstName: "Sarah",
      lastName: "Johnson",
      joinDate: "2023-12-01",
      status: "active",
      swapCount: 15,
      rating: 4.8,
    },
    {
      id: "2",
      email: "mike@example.com",
      firstName: "Mike",
      lastName: "Chen",
      joinDate: "2023-11-15",
      status: "suspended",
      swapCount: 8,
      rating: 3.2,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setPendingItems(mockPendingItems);
      setReportedItems(mockReportedItems);
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApproveItem = (itemId) => {
    // TODO: Implement approve functionality
    console.log("Approving item:", itemId);
    setPendingItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleRejectItem = (itemId) => {
    // TODO: Implement reject functionality
    console.log("Rejecting item:", itemId);
    setPendingItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleRemoveReportedItem = (itemId) => {
    // TODO: Implement remove functionality
    console.log("Removing reported item:", itemId);
    setReportedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleDismissReport = (itemId) => {
    // TODO: Implement dismiss functionality
    console.log("Dismissing report for item:", itemId);
    setReportedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleSuspendUser = (userId) => {
    // TODO: Implement suspend functionality
    console.log("Suspending user:", userId);
  };

  const handleActivateUser = (userId) => {
    // TODO: Implement activate functionality
    console.log("Activating user:", userId);
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">
            Manage users, items, and platform moderation
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalUsers?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalItems?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-50">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pending Items
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingItems}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-red-50">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Reported Items
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.reportedItems}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "pending", label: "Pending Items", icon: AlertTriangle },
                { id: "reported", label: "Reported Items", icon: XCircle },
                { id: "users", label: "Users", icon: Users },
                { id: "settings", label: "Settings", icon: Settings },
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
                <h3 className="text-lg font-semibold text-gray-900">
                  Platform Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Recent Activity
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>• {stats.pendingItems} items pending approval</p>
                      <p>• {stats.reportedItems} items reported</p>
                      <p>• {stats.activeSwaps} active swaps</p>
                      <p>• {stats.monthlyGrowth}% growth this month</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Quick Actions
                    </h4>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 bg-white rounded border hover:bg-gray-50 transition-colors">
                        Review Pending Items
                      </button>
                      <button className="w-full text-left px-3 py-2 bg-white rounded border hover:bg-gray-50 transition-colors">
                        Handle Reports
                      </button>
                      <button className="w-full text-left px-3 py-2 bg-white rounded border hover:bg-gray-50 transition-colors">
                        User Management
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pending" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Pending Items ({pendingItems.length})
                </h3>
                <div className="space-y-4">
                  {pendingItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500">by {item.user}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(item.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleApproveItem(item.id)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRejectItem(item.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reported" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Reported Items ({reportedItems.length})
                </h3>
                <div className="space-y-4">
                  {reportedItems.map((item) => (
                    <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4 mb-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            by {item.user}
                          </p>
                          <p className="text-xs text-gray-400">
                            Reported by {item.reportedBy} on{" "}
                            {new Date(item.reportedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Reason:
                        </span>
                        <p className="text-sm text-gray-600">{item.reason}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleRemoveReportedItem(item.id)}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 transition-colors"
                        >
                          Remove Item
                        </button>
                        <button
                          onClick={() => handleDismissReport(item.id)}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors"
                        >
                          Dismiss Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  User Management
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Join Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Swaps
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.swapCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.rating}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                user.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {user.status === "active" ? (
                              <button
                                onClick={() => handleSuspendUser(user.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Suspend
                              </button>
                            ) : (
                              <button
                                onClick={() => handleActivateUser(user.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Activate
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Platform Settings
                </h3>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Content Moderation
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Auto-approve items from trusted users
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Require manual approval for new users
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      User Management
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Allow user registration
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Require email verification
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
