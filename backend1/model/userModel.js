//importing postgres connection for db file
const pool = require('../config/db.js')
//define func
//createUser arrow func
//async allows to use await inside the function using async so you dont block
//parameters(name email)
const createUser = async (name, email) => {
    //return promise and await waits until the promise is resolved
    const res = await pool.query(
        //values are place holders
        //returning return newly inserted row
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        //provides actual values 
        [name, email]
    );
    return res.rows[0];
};
//export func so other files can use it 
module.exports = { createUser };