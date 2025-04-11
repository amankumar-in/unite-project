export default {
  routes: [
    {
      method: "GET",
      path: "/hello",
      handler: "hello.find",
      config: {
        auth: false,
      },
    },
  ],
};
