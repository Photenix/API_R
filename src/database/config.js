const {connect} = require('mongoose');

const dbConnection = () => {
    try {
        connect( process.env.MONGO_CNN )
        console.log('Connected to Mongo');
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to Mongo')
    }
}

module.exports = dbConnection();