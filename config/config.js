module.exports = {
    development: {
        port: process.env.PORT || 4000,
        privateKey: 'CUBE-WORKSHOP',
        databaseUrl: `mongodb+srv://Joseph:123456abc@cluster0.qihwy.mongodb.net/cubes?retryWrites=true&w=majority`
    },
    production: {}
};