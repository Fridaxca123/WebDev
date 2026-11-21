//eceive an HTTP request, validate the incoming data, call the model/repository, and send an HTTP response.
//import modelu containing db
const userModel = require('../model/userModel');
//define controller 
const createUser = async (req, res) => {
    try {
        //extract info
        const { name, email, password } = req.body;
        //validate inputs
        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({ error: 'All files need to be filled' });
        }
        else if (password.trim().length < 8) {
            return res.status(400).json({ error: 'Password must have 8 characters' });

        }
        //call the model
        const newUser = await userModel.createUser(name.trim(), email.trim(), password.trim());
        //sends response
        res.status(201).json(newUser); //201 created
        //if something goes wrong like db connection failing
    } catch (error) {
        console.error('createUser error:', error); //log error for debugging
        if (error.code === '23505') {
            return res.status(400).json({ error: 'That email has been used before.' });
        }
        res.status(500).json({ error: 'Internal server error' });

    }
}
const getUsers = async (req, res) => {
    try {
        const users = await userModel.fetchAll();
        req.status(201).json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving users' });

    }
}

module.exports = { createUser, getUsers };


