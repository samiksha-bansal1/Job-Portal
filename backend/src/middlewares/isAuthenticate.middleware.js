import jwt from "jsonwebtoken";

const SECRET_KEY = "secretkey123$^12341";

const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated. Please log in.",
      });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.id = decoded.userId;
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again.",
      });
    }
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
    });
  }
};

export default isAuthenticate;
