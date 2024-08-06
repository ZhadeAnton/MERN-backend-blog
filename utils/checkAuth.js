import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.replace(/Bearer\s?/, "");

  if (token) {
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET);
      console.log('result', result)

      req.userId = result._id;
      next();
    } catch (err) {
      return res.status(401).json({ message: "No token provided" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
