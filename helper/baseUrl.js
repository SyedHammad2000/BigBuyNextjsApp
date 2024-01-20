const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://big-buy-nextjs-app.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
