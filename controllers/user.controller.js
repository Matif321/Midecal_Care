// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";

// /* =========================
//    CREATE USER (SIGNUP)
// ========================= */
// export const registerUser = async (req, res) => {
//     try {
//         const {
//             full_name,
//             cnic_number,
//             phone_number,
//             gender,
//             address,
//             latitude,
//             longitude,
//             age,
//             password,
//         } = req.body;

//         if (
//             !full_name ||
//             !cnic_number ||
//             !phone_number ||
//             !gender ||
//             !address ||
//             !latitude ||
//             !longitude ||
//             !age ||
//             !password
//         ) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const userExists = await User.findOne({
//             $or: [{ cnic_number }, { phone_number }],
//         });

//         if (userExists) {
//             return res
//                 .status(400)
//                 .json({ message: "User already exists" });
//         }

//         const password_hash = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             full_name,
//             cnic_number,
//             phone_number,
//             gender,
//             address,
//             location: { latitude, longitude },
//             age,
//             password_hash,
//         });

//         res.status(201).json({
//             message: "User registered successfully",
//             user_id: user._id,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

// /* =========================
//    READ ALL USERS
// ========================= */
// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select("-password_hash");
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

// /* =========================
//    READ SINGLE USER
// ========================= */
// export const getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).select("-password_hash");

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

// /* =========================
//    UPDATE USER
// ========================= */
// export const updateUser = async (req, res) => {
//     try {
//         const user = await User.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         ).select("-password_hash");

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json({
//             message: "User updated successfully",
//             user,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

// /* =========================
//    DELETE USER
// ========================= */
// export const deleteUser = async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };




import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

/* =========================
   CREATE USER (SIGNUP)
========================= */
export const registerUser = async (req, res) => {
    try {
        const {
            full_name,
            cnic_number,
            phone_number,
            gender,
            address,
            latitude,
            longitude,
            age,
            password,
        } = req.body;

        if (
            !full_name ||
            !cnic_number ||
            !phone_number ||
            !gender ||
            !address ||
            !latitude ||
            !longitude ||
            !age ||
            !password
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({
            $or: [{ cnic_number }, { phone_number }],
        });

        if (userExists) {
            return res
                .status(400)
                .json({ message: "User already exists" });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            full_name,
            cnic_number,
            phone_number,
            gender,
            address,
            location: { latitude, longitude },
            age,
            password_hash,
        });

        res.status(201).json({
            message: "User registered successfully",
            user_id: user._id,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =========================
   LOGIN USER
========================= */
export const loginUser = async (req, res) => {
    try {
        const { cnic_number, password } = req.body;

        if (!cnic_number || !password) {
            return res.status(400).json({ message: "CNIC and password are required" });
        }

        // Find user by CNIC
        const user = await User.findOne({ cnic_number });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Optional: check if user is blocked
        if (user.status === "blocked") {
            return res.status(403).json({ message: "Your account is blocked" });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        res.status(200).json({
            message: "Login successful",
            user_id: user._id,
            full_name: user.full_name,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

/* =========================
   READ ALL USERS
========================= */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password_hash");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =========================
   READ SINGLE USER
========================= */
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password_hash");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =========================
   UPDATE USER
========================= */
export const updateUser = async (req, res) => {
    try {
        // If password is being updated, hash it
        if (req.body.password) {
            req.body.password_hash = await bcrypt.hash(req.body.password, 10);
            delete req.body.password; // remove plain password
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select("-password_hash");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =========================
   DELETE USER
========================= */
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
