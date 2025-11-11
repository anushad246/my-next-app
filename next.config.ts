const dotenv = require("dotenv");
const path = require("path");

const APP_ENV = process.env.APP_ENV || "development";

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${APP_ENV}.local`),
});

console.log("🔧 Environment:", APP_ENV);
console.log("🌐 Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    APP_ENV,
  },
};
