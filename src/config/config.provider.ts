export default () => ({
    PORT: parseInt(process.env.PORT),
    JWT_SECRET: process.env.JWT_SECRET
})