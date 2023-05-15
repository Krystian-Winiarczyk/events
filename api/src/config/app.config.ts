export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES,
});
