import React from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, MapPin, Repeat, Coins } from "lucide-react";

const ItemCard = ({ item }) => {
  const {
    id,
    title,
    image,
    condition,
    size,
    points,
    category,
    isSwappable,
    swapType = "direct",
    location,
    user,
    isLiked = false,
    views = 0,
  } = item;

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement like functionality
    console.log("Like item:", id);
  };

  return (
    <Link to={`/item/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={
              image ||
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            }
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />

          {/* Like Button */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-sm transition-all duration-200"
          >
            <Heart
              className={`h-4 w-4 ${
                isLiked ? "text-red-500 fill-current" : "text-gray-600"
              }`}
            />
          </button>

          {/* Swap Type Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 text-white text-xs font-medium rounded-full flex items-center ${
                swapType === "points" ? "bg-purple-600" : "bg-green-600"
              }`}
            >
              {swapType === "points" ? (
                <>
                  <Coins className="h-3 w-3 mr-1" />
                  {points} pts
                </>
              ) : (
                <>
                  <Repeat className="h-3 w-3 mr-1" />
                  Direct
                </>
              )}
            </span>
          </div>

          {/* Condition Badge */}
          {condition && (
            <div className="absolute bottom-3 right-3">
              <span className="px-2 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded-full">
                {condition}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
            {title}
          </h3>

          {/* Details */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            {size && <span>Size {size}</span>}
            {category && <span className="capitalize">{category}</span>}
          </div>

          {/* Points/Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-lg text-gray-900">
              {swapType === "points" ? `${points} pts` : "Free Swap"}
            </span>
            <div className="flex items-center text-gray-500 text-xs">
              <Eye className="h-3 w-3 mr-1" />
              {views}
            </div>
          </div>

          {/* Location and User */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            {location && (
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{location}</span>
              </div>
            )}
            {user && (
              <span className="truncate ml-2">
                by {user.firstName || user.email}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
