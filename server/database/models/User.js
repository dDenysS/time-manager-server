const GlobalSettings = require('./GlobalSettings')

class User extends GlobalSettings {
    static get tableName() {
        return 'users'
    }
}

module.exports = User
