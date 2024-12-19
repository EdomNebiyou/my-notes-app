import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    return res.status(400).json({msg:"all fields are required"})
  }
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });


    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(
      payload,
      'your-jwt-secret', // Replace with your actual secret
      { expiresIn: 360000 } // 10 hours
    );

    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite:'strict',
      maxAge:360000 
    }); 
    user={...user._doc,password:undefined}
    res.json({ token ,user});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({msg:"all fields are required"})
  }
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await user.comparePassword(password); // Use the comparePassword method
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(
      payload,
      'your-jwt-secret', // Replace with your actual secret
      { expiresIn: 360000 } // 10 hours
    );

    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite:'strict',
      maxAge:360000 
    });
    user={...user._doc,password:undefined}
    res.json({ token ,user});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Logout a user
// @route   POST /api/users/logout
// @access  Private 
const logoutUser = (req, res) => {
  res.clearCookie('token'); 
  res.json({ msg: 'Logged out' });
};

export { registerUser, loginUser, logoutUser };