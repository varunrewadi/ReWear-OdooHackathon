import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryData = [
    {
      id: "Clothing",
      name: "Clothing",
      description: "General clothing items and apparel",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
      itemCount: 1,
      featuredItems: [
        {
          id: "1",
          title: "Sample T-Shirt",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
          price: 25,
        },
      ],
    },
    {
      id: "Outerwear",
      name: "Outerwear",
      description: "Jackets, coats, and blazers",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600",
      itemCount: 1,
      featuredItems: [
        {
          id: "2",
          title: "Denim Jacket",
          image:
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=200",
          price: 45,
        },
      ],
    },
    {
      id: "Tops",
      name: "Tops",
      description: "Shirts, blouses, t-shirts, and sweaters",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
      itemCount: 45,
      featuredItems: [
        {
          id: "3",
          title: "Vintage Cotton T-Shirt",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
          price: 25,
        },
        {
          id: "4",
          title: "Wool Sweater",
          image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200",
          price: 35,
        },
      ],
    },
    {
      id: "Bottoms",
      name: "Bottoms",
      description: "Pants, jeans, skirts, and shorts",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
      itemCount: 32,
      featuredItems: [
        {
          id: "5",
          title: "Classic Denim Jeans",
          image:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200",
          price: 40,
        },
        {
          id: "6",
          title: "High-Waist Skirt",
          image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200",
          price: 30,
        },
      ],
    },
    {
      id: "Dresses",
      name: "Dresses",
      description: "Casual and formal dresses for every occasion",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
      itemCount: 28,
      featuredItems: [
        {
          id: "7",
          title: "Vintage Floral Dress",
          image:
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200",
          price: 65,
        },
        {
          id: "8",
          title: "Summer Maxi Dress",
          image:
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200",
          price: 55,
        },
      ],
    },
    {
      id: "Shoes",
      name: "Shoes",
      description: "Sneakers, boots, heels, and sandals",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      itemCount: 19,
      featuredItems: [
        {
          id: "9",
          title: "Vintage Sneakers",
          image:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200",
          price: 50,
        },
        {
          id: "10",
          title: "Leather Boots",
          image:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200",
          price: 75,
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const response = await fetch('/api/categories');
        // const data = await response.json();

        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setCategories(categoryData);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover sustainable fashion items organized by category. Each
            category features carefully curated items from our community.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Category Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {category.itemCount} items
                  </span>
                </div>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>

                {/* Featured Items */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                    Featured Items
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {category.featuredItems.map((item) => (
                      <div key={item.id} className="text-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-20 object-cover rounded mb-2"
                        />
                        <p className="text-xs text-gray-600 truncate">
                          {item.title}
                        </p>
                        <p className="text-sm font-medium text-green-600">
                          ${item.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Browse Button */}
                <Link
                  to={`/browse?category=${category.id}`}
                  className="inline-flex items-center justify-center w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Browse {category.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-6">
              Browse all items or list your own sustainable fashion piece
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/browse"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Browse All Items
              </Link>
              <Link
                to="/add-item"
                className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
              >
                List Your Item
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
