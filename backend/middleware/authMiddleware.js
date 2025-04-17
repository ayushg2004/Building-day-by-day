import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    next(); // Proceed to next middleware/route
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
