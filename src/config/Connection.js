const { DATABASE } = require('../../.env');
const mongoose = require('mongoose');

class Connection {
    constructor() {
        this.dataBaseConnectionMongoDB();
    }

    dataBaseConnectionMongoDB() {
        this.mongoDBConnection = mongoose.connect(DATABASE)
        .then(() => {
            console.log("Conexão estabelecida com sucesso");
        })
        .catch((error) => {
            console.log(`Erro ao estabelecer conexão com mongoDB: ${error}`)
        })

    }

}

module.exports = new Connection();