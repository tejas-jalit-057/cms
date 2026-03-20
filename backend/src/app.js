import express from "express";

import studentRoutes from "./routes/student.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes);

// test route
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

export default app;
