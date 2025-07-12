import Item from "../model/items.model.js";

export const getProfile = (req, res) => {
    const userData = req.user;
    if (!userData) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    res.status(200).json({ profile: userData });
};

export const addItem = async (req, res) => {
    try {
        const user = req.user; // assuming populated user from auth middleware

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found in request" });
        }

        const {
            title,
            description,
            images,
            category,
            type,
            size,
            condition,
            tags
        } = req.body;

        // Validate required fields
        if (!title || !category || !type || !condition) {
            return res.status(400).json({ message: "Title, category, type, and condition are required" });
        }

        const newItem = new Item({
            title,
            description: description || '',
            images: images || [],
            category,
            type,
            size: size || '',
            condition,
            tags: tags || [],
            ownerId: user._id, // linking item to signed-in user
        });

        await newItem.save();

        res.status(201).json({
            message: "Item added successfully",
            item: newItem
        });

    } catch (error) {
        console.error("Add Item Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const user = req.user; // Populated by your auth middleware
        const { itemId } = req.params; // Get item ID from URL

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found in request" });
        }

        if (!itemId) {
            return res.status(400).json({ message: "Item ID is required" });
        }

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Check if the signed-in user owns the item
        if (item.ownerId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Forbidden: You are not allowed to delete this item" });
        }

        await item.deleteOne();

        res.status(200).json({ message: "Item deleted successfully", itemId });
    } catch (error) {
        console.error("Delete Item Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllMyItems = async (req, res) => {
    try {
        const user = req.user; // populated from auth middleware

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const items = await Item.find({ ownerId: user._id }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "User items retrieved successfully",
            count: items.length,
            items
        });
    } catch (error) {
        console.error("Get All My Items Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


