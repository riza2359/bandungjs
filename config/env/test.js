module.exports = {
    connections: {
        mysqlTest: {
            adapter: 'sails-mysql',
            host: 'localhost',
            user: 'root', 
            password: '',
            database: 'bandungjs-test'
        }
    },
    models: {
        connection: 'mysqlTest',
        migrate: 'drop'
    }
}