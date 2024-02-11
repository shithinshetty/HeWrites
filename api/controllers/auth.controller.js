import User from "../modals/user.modal.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return (
      res.status(400), json({ message: "All The Fields Are Required My man" })
    );
  }
  const newuser = new User({
    username,
    email,
    password,
  });
  try {
    await newuser.save();
    res.send("Signup is success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
