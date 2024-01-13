import UserModel from "@/models/user";
import connectToDB from "@/configs/db";
import { hashPassword } from "@/utils/auth";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }

  try {
    connectToDB();
    const { firstName, lastName, userName, email, password } = req.body;
    //! Validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !userName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return res.status(422).json({ message: "Data is not Valid !!" });
    }
    //! isUserExist
    const isUserExist = await UserModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (isUserExist) {
      return res
        .status(422)
        .json({ message: "This Username or Email already Exist!!" });
    }
    // GenerateToken

    //! Create
    //? HashPassword
    const hashedPassword = await hashPassword(password);
    await UserModel.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      role: "USER",
    });

    return res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unknown Internal Server Error", err });
  }
};

export default handler;
