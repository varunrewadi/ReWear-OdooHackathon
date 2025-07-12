import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { ArrowRight, Recycle, Users, Award, TrendingUp } from "lucide-react";

const Landing = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Categories with images - matching existing data
  const categories = [
    {
      id: "Clothing",
      name: "Clothing",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      count: 1,
    },
    {
      id: "Outerwear",
      name: "Outerwear",
      image:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      count: 1,
    },
    {
      id: "Tops",
      name: "Tops",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      count: 45,
    },
    {
      id: "Bottoms",
      name: "Bottoms",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      count: 32,
    },
    {
      id: "Dresses",
      name: "Dresses",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      count: 28,
    },
    {
      id: "Shoes",
      name: "Shoes",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      count: 19,
    },
  ];

  // Mock featured clothing items data
  const mockFeaturedItems = [
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
    },
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
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeaturedItems(mockFeaturedItems);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Sustainable Fashion Through{" "}
                <span className="text-green-600">Community Exchange</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of fashion lovers exchanging pre-loved clothing.
                Reduce waste, save money, and discover unique pieces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto flex items-center justify-center">
                    Start Browsing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
                <Link to="/add-item">
                  <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto">
                    List an Item
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Fashion exchange illustration"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">15K+</h3>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Recycle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">50K+</h3>
              <p className="text-gray-600">Items Exchanged</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">98%</h3>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">2M+</h3>
              <p className="text-gray-600">CO2 Saved (lbs)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/browse?category=${category.id}`}>
                <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer p-4 text-center group">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-20 h-20 mx-auto mb-3 rounded-full object-cover"
                  />
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Items
              </h2>
              <p className="text-xl text-gray-600">
                Discover the latest additions to our community
              </p>
            </div>
            <Link to="/browse">
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
                >
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How ReWear Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to start your sustainable fashion journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Items</h3>
              <p className="text-gray-600">
                Upload photos and details of clothing you no longer wear
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Exchange</h3>
              <p className="text-gray-600">
                Find items you love and propose swaps or use points
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy & Repeat</h3>
              <p className="text-gray-600">
                Refresh your wardrobe sustainably and earn points
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
