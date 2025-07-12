import Item from "../model/items.model.js";

export const getAllItems = async (req, res) => {
  try {
    const {
      category,
      type,
      condition,
      search,
      sort = "newest",
      limit = 20,
      page = 1,
    } = req.query;

    // Build filter object
    const filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    if (type && type !== "all") {
      filter.type = type;
    }

    if (condition && condition !== "all") {
      filter.condition = condition;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case "newest":
        sortObj = { createdAt: -1 };
        break;
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "price-low":
        sortObj = { price: 1 };
        break;
      case "price-high":
        sortObj = { price: -1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get items with pagination
    const items = await Item.find(filter)
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip(skip)
      .populate("ownerId", "profile.firstName profile.lastName email");

    // Get total count for pagination
    const totalItems = await Item.countDocuments(filter);

    res.status(200).json({
      success: true,
      items,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalItems / parseInt(limit)),
        totalItems,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Get All Items Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 10 } = req.query;

    const items = await Item.find({ category })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate("ownerId", "profile.firstName profile.lastName email");

    res.status(200).json({
      success: true,
      category,
      items,
      count: items.length,
    });
  } catch (error) {
    console.error("Get Items By Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id).populate(
      "ownerId",
      "profile.firstName profile.lastName email"
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Get Item By ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
