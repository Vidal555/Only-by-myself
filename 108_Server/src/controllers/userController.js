import User from '../models/userModel';


export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createUser = async (req, res) => {
  const { name, email, password} = req.body;

  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
