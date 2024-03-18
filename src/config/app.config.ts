export default () => ({
    appSecret :  process.env.SECRET_KEY,
    port : process.env.PORT,
    mongoUri : process.env.MONGO_URI

})