// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    // Verify user exists in database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
    });

    if (!dbUser) return res.sendStatus(403);

    req.user = { ...user, role: dbUser.role };
    next();
  });
};

// Routes
// In the register endpoint
app.post("/api/register", async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    // Convert role to uppercase to match the enum
    role = role ? role.toUpperCase() : "STUDENT";

    // Validate the role
    if (!["STUDENT", "TEACHER"].includes(role)) {
      return res
        .status(400)
        .json({ error: "Invalid role. Must be 'student' or 'teacher'" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // In production, hash the password!
        role, // Now this will be 'STUDENT' or 'TEACHER'
      },
    });

    // Rest of your code...
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Teacher routes
app.post("/api/homework", authenticateToken, async (req, res) => {
  if (req.user.role !== "TEACHER") {
    return res.status(403).json({ error: "Only teachers can create homework" });
  }

  try {
    const { title, description, dueDate } = req.body;

    const homework = await prisma.homework.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        createdById: req.user.userId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Here you would typically send push notifications to all students
    // For now, we'll just return the created homework
    res.status(201).json(homework);
  } catch (error) {
    console.error("Error creating homework:", error);
    res.status(400).json({ error: "Failed to create homework" });
  }
});

// Student routes
app.get("/api/homework", authenticateToken, async (req, res) => {
  try {
    const homeworks = await prisma.homework.findMany({
      orderBy: { dueDate: "asc" },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(homeworks);
  } catch (error) {
    console.error("Error fetching homeworks:", error);
    res.status(500).json({ error: "Failed to fetch homeworks" });
  }
});

// Update push token
app.post("/api/update-push-token", authenticateToken, async (req, res) => {
  try {
    const { token } = req.body;

    await prisma.user.update({
      where: { id: req.user.userId },
      data: { pushToken: token },
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating push token:", error);
    res.status(500).json({ error: "Failed to update push token" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
