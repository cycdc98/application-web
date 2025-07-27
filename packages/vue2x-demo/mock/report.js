export default [
  {
    url: "/api/report",
    method: "post",
    response: ({ body }) => {
      console.log(`report: ${JSON.stringify(body)}`);
    },
  },
];
