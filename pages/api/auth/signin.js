import UsersModel from "@/models/user";
import connectToDB from "@/configs/db";
import { serialize } from "cookie";
import { generateToken, verifyPassword } from "@/utils/auth";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }
  try {
    connectToDB();
    const { identifier, password } = req.body;
    // Check Fields isn't empty
    if (!identifier.trim() || !password.trim()) {
      return res.status(422).json({ message: "Data is not Valid!!" });
    }
    // Check if the user exist or not
    const user = await UsersModel.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });
    if (!user) {
      return res.status(404).json({ message: "User Not Found !!" });
    }
    // Check User Password is Valid or not
    const isValidPassword = await verifyPassword(password, user.password);
    console.log("isValidPassword: ", isValidPassword);

    if (!isValidPassword) {
      return res
        .status(422)
        .json({ message: "username or password is not valid !!" });
    }

    //! If All The Information Was Correct
    const token = generateToken({ email: user.email });
    console.log("token => ", token);

    res
      .setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24,
        })
      )
      .status(200)
      .json({ message: "User Login Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unknown Internal Server Error :=>", err });
  }
};

export default handler;
