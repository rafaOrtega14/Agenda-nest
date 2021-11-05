export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_URL,
  },
  neutrino: {
    host: process.env.NEUTRINOAPI_URL,
    user: process.env.NEUTRINOAPI_USER,
    key: process.env.NEUTRINOAPI_KEY,
  },
});
