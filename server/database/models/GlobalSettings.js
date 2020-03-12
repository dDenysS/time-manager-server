const Model = require('../index')
const {snakeCaseMappers} = require('objection')

class GlobalSettings extends Model {

    constructor() {
        super()
    }
    static get columnNameMappers() {
        return snakeCaseMappers()
    }

    $beforeInsert() {
        this.created_at = new Date().toISOString()
        this.updated_at = new Date().toISOString()
    }

    $beforeUpdate(opt, queryContext){
        super.$beforeUpdate(opt, queryContext)
        this.updated_at = new Date().toISOString()
    }
}

module.exports = GlobalSettings
