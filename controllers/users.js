import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email });
    console.log(user)
    if (!user)
      return res.status(400).send("Invalid credentials. Please try again.");

    const existingUser = user[0];
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!correctPassword) {
      return res
        .status(400)
        .send("Invalid credentials. Try with another password");
    }
    const secret = process.env.TOKEN;
    const token = jwt.sign(
      { user_id: existingUser._id, email: existingUser.email },
      secret,
      {
        expiresIn: "2h",
      }
    );

    existingUser.token = token;
    console.log(existingUser);
    res.status(201).json(existingUser);
  } catch (error) {
    console.log({ error });
  }
};

export const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(first_name && last_name && email && password)) {
     return res.status(400).send("All input is required. Please fill in each gap");
    }

    const user = await User.find({ email });
    
    if (user[0]) return res.status(402).send("There is already a user with that email");

    const encodedPassword = await bcrypt.hash(password, 10);

    const newuser = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encodedPassword,
    });


    const secret = process.env.TOKEN;
    const token = jwt.sign({ user_id: newuser._id, email }, secret, {
      expiresIn: "2h",
    });

    newuser.token = token;
    console.log(newuser);
    res.status(200).json(newuser);
  } catch (error) {
    console.log(error);
  }
};
