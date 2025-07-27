export default [
  {
    url: "/api/hello",
    method: "post",
    response: () => {
      return {
        message: "Hello World!",
        currentTime: Date.now(),
      };
    },
  },
];
