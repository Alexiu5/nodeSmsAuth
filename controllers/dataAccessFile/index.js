const connection = require('../../database/database')

let findUser = (id_user)=>{
    let query = `SELECT * FROM users WHERE id_user = ${id_user}`
    return connection()
        .then((conn)=> {
            let result = conn.query(query)
            conn.end()
            return result
        })
        .catch((err)=> console.log(err))
}

let searchUserByPhone = (phone_number)=>{
    let query = `SELECT id_user FROM users WHERE phone_number = ?`
    return connection()
                .then((conn)=> {
                    let result = conn.query(query, phone_number)
                    conn.end()
            return result
                })
                .catch((err)=> console.log(err))
}

let getUserById = (username) =>{
    let query = `SELECT * FROM users where username = ${username}`
    return connection()
            .then(conn => {
                let result = conn.query(query)
                conn.end()
            return result
            })
            .catch((err)=> console.log(err))
}

let registerUser = (user)=>{
    let query = 'INSERT INTO users SET ?'
    return connection()
        .then((conn)=> {
            let result = conn.query(query, user)
            conn.end()
            return result
        })
        .catch((err)=> console.log(err))    
}

let searchUserState= (username)=>{
    let query = `SELECT * FROM users usr WHERE username ='${username}'`
    return connection()
        .then((conn)=>{
            let result = conn.query(query)
            conn.end()
            return result
        })
        .catch((err)=> console.log(err))
}

let registerCode = (id_user, code)=>{
    let query = `INSERT INTO sms_verification (id_user , sms_code) Values (${id_user},'${code}')`
    return connection()
        .then((conn)=>{
            let result = conn.query(query)
            conn.end()
            return result
        })
        .catch((err)=> console.log(err))
}

let searchCode = (username)=>{
    let query = `SELECT sms.sms_code FROM sms_verification sms INNER JOIN users usr ON sms.id_user = usr.id_user WHERE usr.username = '${username}'`
    return connection()
        .then((conn)=>{
            let result = conn.query(query)
            conn.end()
            return result
        })
        .catch((err)=> console.log(err))
}


let updateState = (state, username)=>{
    let query = ` UPDATE users SET state = ${state} WHERE username = '${username}'`
    return connection()
        .then((conn)=>{
            let result = conn.query(query)
            conn.end()
            return result
        })
        .catch((err)=> console.log(err))
}

let login = (username, password)=>{
    let user_credentials = [username, password ]
    let query = `SELECT * FROM users WHERE username = ? AND password = ? `
    return connection()
        .then((conn)=> {
            let result = conn.query(query, user_credentials)
            conn.end()
            return result
        })
        .catch((err)=> console.log(err))
}


module.exports = {
    findUser,
    registerUser,
    login,
    searchUserByPhone,
    getUserById,
    searchUserState,
    registerCode,
    searchCode,
    updateState
} 