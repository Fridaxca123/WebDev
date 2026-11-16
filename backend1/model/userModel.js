//importing postgres connection for db file
const pool = require('../config/db.js')
//define func
//createUser arrow func
//async allows to use await inside the function
//parameters(name email)
const createUser = async (name, email) => {
    const res = await pool.query(
        //values are place holders
        //returning return newly inserted row
        'Insert into users (name, email) values ($1, $2) returning *',
        //provides actual values 
        [name, email]
    );
    return res.rows[0];
};
//export func so other files can use it 
module.exports = { createUser };