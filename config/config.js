module.exports = {
    development: {
        port: process.env.PORT || 4000,
        databaseUrl: `mongodb+srv://Joseph:123456abc@cluster0.qihwy.mongodb.net/cubes?retryWrites=true&w=majority`
    },
    production: {}
};