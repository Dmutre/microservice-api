export default () => ({
  port: parseInt(process.env.PORT, 10),
  host: process.env.HOST,
  db: {
    port: parseInt(process.env.DB_PORT, 10),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
});
