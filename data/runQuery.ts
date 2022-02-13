export const runQuery = async ({ queryFn, errorFn, label }) => {
  let response;
  try {
    response = await queryFn();
  } catch (e) {
    response = await errorFn(e);
  }

  console.log("[ database-query ]", { query: label });
  return JSON.parse(JSON.stringify(response));
};