// import express from "express";
// import {
//     registerUser,
//     getAllUsers,
//     getUserById,
//     updateUser,
//     deleteUser,
// } from "../controllers/user.controller.js";

// const router = express.Router();

// router.post("/signup", registerUser);
// router.get("/", getAllUsers);
// router.get("/:id", getUserById);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

// export default router;


import express from "express";
import {
    registerUser,
    loginUser,        // ✅ import loginUser from controller
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Signup
router.post("/signup", registerUser);

// Login ✅
router.post("/login", loginUser);

// Read all users
router.get("/", getAllUsers);

// Read single user
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

export default router;
