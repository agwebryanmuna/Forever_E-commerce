import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) return res.json({ success: false, message: "Not authorized" });

  try {
    const decode_token = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decode_token.id;

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
