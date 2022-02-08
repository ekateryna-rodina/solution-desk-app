module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["robohash.org"],
  },
  env: {
    UPLOAD_PRESET: process.env.UPLOAD_PRESET,
    CLOUD_NAME: process.env.CLOUD_NAME,
  },
};
