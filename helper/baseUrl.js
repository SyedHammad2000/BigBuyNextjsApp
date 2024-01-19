const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://ecommerceapplication-8psj.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
