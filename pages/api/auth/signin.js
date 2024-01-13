import UserModel from "@/models/user";
import connectToDB from "@/configs/db";
import { generateToken, verifyPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }

  try {
    connectToDB();

    const { identifier, password } = req.body;
    // Check Fields isn't empty
    if (!identifier.trim() || !password.trim()) {
      return res.status(422).json({ message: "Data is not valid !!" });
    }

    // Check if the user exist or not
    const user = await UserModel.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found !!" });
    }

    // Check User Password is Valid or not
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res
        .status(422)
        .json({ message: "username or password is not correct !!" });
    }

    //! If All The Information Was Correct
    const token = generateToken({ email: user.email });

    return res
      .setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24,
        })
      )
      .status(200)
      .json({ message: "User Logged In Successfully :))" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "UnKnown Internal Server Error !!" });
  }
};

export default handler;
