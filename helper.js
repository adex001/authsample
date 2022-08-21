const db = require('./database');

class Helper {
    findUser (email) {
        return db.find(a => email === a.email)
    }

    saveUser (data) {
        return db.push(data);
    }

    getAllUsers () {
        return db;
    }
}

module.exports = new Helper();
