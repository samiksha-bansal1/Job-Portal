import jwt from "jsonwebtoken";

const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticate",
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid tiken",
        success: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export default isAuthenticate;
