/**
 * A simple hello controller
 */

export default {
  // GET /api/hello
  find: async (ctx) => {
    return {
      message: "Hello from Strapi!",
      status: "success",
      timestamp: new Date().toISOString(),
    };
  },
};
