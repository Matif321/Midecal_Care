
// import express from "express"
// import connectDB from "./DATABASE/db.js"
// import dotenv from "dotenv";
// import userRoutes from "/routes/user.route.js"

// dotenv.config();
// connectDB();
// app.use(express.json());
// app.use("/api/users", userRoutes)
// const app = express()
// const port = process.env.MONGO_URI || 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// connectDB();

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

import express from "express";
import connectDB from "./DATABASE/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"; // ✅ correct path

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Start server
const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

export default app;


