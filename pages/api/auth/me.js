import UserModel from "@/models/user";
import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return false;
  }
  try {
    connectToDB();

    const { token } = req.cookies;
    "token => ", token;

    if (!token) {
      return res.json.status(401).json({ message: "You are not login !!" });
    }
    const tokenPayload = verifyToken(token);
    "tokenPayload => ", tokenPayload;
    if (!tokenPayload) {
      return res.json.status(401).json({ message: "You are not login !!" });
    }
    const user = await UserModel.findOne(
      { email: tokenPayload.email },
      "firstName lastName role"
    );
    return res.status(200).json({ data: user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unknown Internal Server Error", err });
  }
};

export default handler;
