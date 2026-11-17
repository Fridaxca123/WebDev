//eceive an HTTP request, validate the incoming data, call the model/repository, and send an HTTP response.
//import modelu containing db
const userModel = require('../model/userModel');
//define controller 
const createUser = async (req, res) => {
    try {
        //extract info
        const { name, email } = req.body;
        //validate inputs
        if (!name?.trim() || !email?.trim()) {
            return res.status(400).json({ error: 'Name and email are compulsory' });
        }
        //call the model
        const newUser = await userModel.createUser(name.trim(), email.trim());
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
module.exports = { createUser };
