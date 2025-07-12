import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const ratingReceivedSchema = new Schema({
    fromUser: { type: Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
}, { _id: false });

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: String,
        location: {
            city: String,
            state: String,
            country: String,
            zipCode: String
        },
        preferences: {
            categories: [String],
            sizes: [String],
            brands: [String]
        }
    },

    points: {
        balance: { type: Number, default: 0 },
        totalEarned: { type: Number, default: 0 },
        totalSpent: { type: Number, default: 0 }
    },

    rating: {
        average: { type: Number, min: 0, max: 5, default: 0 },
        totalRatings: { type: Number, default: 0 },
        ratingsReceived: [ratingReceivedSchema]
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    status: {
        type: String,
        enum: ['active', 'suspended', 'deleted'],
        default: 'active'
    },

    verification: {
        email: {
            isVerified: { type: Boolean, default: false },
            verificationToken: String,
            verifiedAt: Date
        },
        phone: {
            number: String,
            isVerified: { type: Boolean, default: false },
            verificationCode: String,
            verifiedAt: Date
        }
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastLoginAt: Date
});

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = model('User', userSchema);

export default User;
