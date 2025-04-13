export default {
  routes: [
    {
      method: "PUT",
      path: "/ticket-purchases/by-reference/:referenceNumber",
      handler: "ticket-purchase.updateByReference",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
