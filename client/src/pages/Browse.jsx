import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, Grid, List, Heart, Eye } from "lucide-react";
import ItemCard from "../components/ItemCard";

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");

  // Initialize filters from URL params on mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Sample data for demonstration - replace with actual API call
  const sampleItems = [
    {
      _id: "1",
      title: "Vintage Denim Jacket",
      description: "Classic vintage denim jacket in excellent condition",
      images: [
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400",
      ],
      category: "Outerwear",
      type: "Jacket",
      condition: "Excellent",
      size: "M",
      price: 45,
      owner: {
        firstName: "Sarah",
        lastName: "Johnson",
      },
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      _id: "2",
      title: "Sustainable Cotton T-Shirt",
      description: "Eco-friendly cotton t-shirt, perfect for everyday wear",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      ],
      category: "Tops",
      type: "T-Shirt",
      condition: "Good",
      size: "L",
      price: 25,
      owner: {
        firstName: "Mike",
        lastName: "Chen",
      },
      createdAt: "2024-01-14T15:45:00Z",
    },
    {
      _id: "3",
      title: "Retro Floral Dress",
      description: "Beautiful vintage floral dress, perfect for summer",
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
      ],
      category: "Dresses",
      type: "Dress",
      condition: "Excellent",
      size: "S",
      price: 65,
      owner: {
        firstName: "Emma",
        lastName: "Davis",
      },
      createdAt: "2024-01-13T09:20:00Z",
    },
    {
      _id: "4",
      title: "Classic Black Blazer",
      description: "Professional black blazer, great for office wear",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      ],
      category: "Outerwear",
      type: "Blazer",
      condition: "Good",
      size: "M",
      price: 55,
      owner: {
        firstName: "David",
        lastName: "Wilson",
      },
      createdAt: "2024-01-12T14:15:00Z",
    },
    {
      _id: "5",
      title: "Comfortable Jeans",
      description: "High-quality denim jeans with perfect fit",
      images: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      ],
      category: "Bottoms",
      type: "Jeans",
      condition: "Excellent",
      size: "32",
      price: 40,
      owner: {
        firstName: "Lisa",
        lastName: "Brown",
      },
      createdAt: "2024-01-11T11:30:00Z",
    },
    {
      _id: "6",
      title: "Wool Sweater",
      description: "Cozy wool sweater for cold weather",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      ],
      category: "Tops",
      type: "Sweater",
      condition: "Good",
      size: "L",
      price: 35,
      owner: {
        firstName: "Alex",
        lastName: "Taylor",
      },
      createdAt: "2024-01-10T16:45:00Z",
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Clothing", label: "Clothing" },
    { value: "Outerwear", label: "Outerwear" },
    { value: "Tops", label: "Tops" },
    { value: "Bottoms", label: "Bottoms" },
    { value: "Dresses", label: "Dresses" },
    { value: "Shoes", label: "Shoes" },
    { value: "Accessories", label: "Accessories" },
  ];

  const types = [
    { value: "all", label: "All Types" },
    { value: "T-Shirt", label: "T-Shirts" },
    { value: "Sweater", label: "Sweaters" },
    { value: "Jacket", label: "Jackets" },
    { value: "Dress", label: "Dresses" },
    { value: "Jeans", label: "Jeans" },
    { value: "Blazer", label: "Blazers" },
    { value: "Shirt", label: "Shirts" },
    { value: "Blouse", label: "Blouses" },
    { value: "Skirt", label: "Skirts" },
    { value: "Pants", label: "Pants" },
    { value: "Shorts", label: "Shorts" },
    { value: "Coat", label: "Coats" },
    { value: "Sneakers", label: "Sneakers" },
    { value: "Boots", label: "Boots" },
    { value: "Heels", label: "Heels" },
    { value: "Sandals", label: "Sandals" },
    { value: "Bag", label: "Bags" },
    { value: "Jewelry", label: "Jewelry" },
    { value: "Hat", label: "Hats" },
    { value: "Scarf", label: "Scarves" },
  ];

  const conditions = [
    { value: "all", label: "All Conditions" },
    { value: "New", label: "New" },
    { value: "Like New", label: "Like New" },
    { value: "Good", label: "Good" },
    { value: "Fair", label: "Fair" },
  ];

  // Initial load effect
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:5500/api/items");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();

        if (data.success) {
          setItems(data.items);
        } else {
          setItems(sampleItems);
        }
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items");
        setItems(sampleItems);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []); // Only run on initial load

  // Filter effect with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchFilteredItems = async () => {
        try {
          setLoading(true);

          // Build query parameters
          const params = new URLSearchParams();
          if (selectedCategory !== "all")
            params.append("category", selectedCategory);
          if (selectedType !== "all") params.append("type", selectedType);
          if (selectedCondition !== "all")
            params.append("condition", selectedCondition);
          if (searchQuery) params.append("search", searchQuery);
          params.append("sort", sortBy);

          const response = await fetch(
            `http://localhost:5500/api/items?${params.toString()}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch items");
          }
          const data = await response.json();

          if (data.success) {
            setItems(data.items);
          }
        } catch (err) {
          console.error("Error fetching filtered items:", err);
          // Don't set error for filter changes, just log
        } finally {
          setLoading(false);
        }
      };

      fetchFilteredItems();
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, selectedType, selectedCondition, searchQuery, sortBy]);

  // Update URL parameters when filters change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (selectedCategory === "all") {
        newSearchParams.delete("category");
      } else {
        newSearchParams.set("category", selectedCategory);
      }

      setSearchParams(newSearchParams);
    }, 500); // 500ms debounce for URL updates

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, setSearchParams]);

  // Use items directly since filtering is done server-side
  const sortedItems = items;

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the filter
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Items
          </h1>
          <p className="text-gray-600">
            Discover sustainable fashion items from our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {types.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition
              </label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {conditions.map((condition) => (
                  <option key={condition.value} value={condition.value}>
                    {condition.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View
              </label>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`flex-1 px-3 py-2 flex items-center justify-center ${
                    viewMode === "grid"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`flex-1 px-3 py-2 flex items-center justify-center ${
                    viewMode === "list"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedItems.length} of {items.length} items
          </p>
        </div>

        {/* Items Grid */}
        {sortedItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedType("all");
                setSelectedCondition("all");
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {sortedItems.map((item) => (
              <ItemCard key={item._id} item={item} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
