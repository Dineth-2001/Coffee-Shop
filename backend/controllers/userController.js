import userModel from '../models/userModel.js';

// Add a new user
const addUser = async (req, res) => {
    const { user_name, email, password } = req.body;

    if (!user_name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const user = new userModel({
        user_name,
        email,
        password
    });
    
    try {
        await user.save()
        res.json({success: true, message: 'User added successfully'})
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Failed to add user'})
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await userModel.findAll();
        res.json(users);
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Failed to get users'})
    }
};

export { addUser, getUsers };
