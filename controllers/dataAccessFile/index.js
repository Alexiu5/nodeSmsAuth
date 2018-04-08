const connection = require('../../database/database')

let findUser = (id_user)=>{
    let query = `SELECT * FROM users WHERE id_user = ${id_user}`
    return connection()
        .then((conn)=> conn.query(query), id_user)
}

let registerUser = (user)=>{
    let query = 'INSERT INTO users SET ?'
    let consulta = 
        connection()
            .then((conn)=> conn.query(query, user))    
}

let login = (username, password)=>{
    let user_credentials = [username, password ]
    let query = `SELECT * FROM users WHERE username = ? AND password = ? `
    return connection()
            .then((conn)=> conn.query(query, user_credentials))
}


module.exports = {
    findUser,
    registerUser,
    login
} 