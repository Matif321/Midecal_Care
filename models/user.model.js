import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            required: true,


        },

        cnic_number: {
            type: String,
            required: true,
            unique: true,
            match: [/^[0-9]{13}$/, "CNIC must be exactly 13 digits"],
        },

        phone_number: {
            type: String,
            required: true,
            unique: true,
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        location: {
            latitude: {
                type: Number,
                required: true,
            },
            longitude: {
                type: Number,
                required: true,
            },
        },

        age: {
            type: Number,
            required: true,
            min: 0,
        },

        password_hash: {
            type: String,
            required: true,
        },

        is_verified: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["active", "blocked"],
            default: "active",
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);









