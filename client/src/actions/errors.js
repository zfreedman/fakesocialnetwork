export const GET_ERRORS = "GET_ERRORS";

export function getErrors (errors) {
  return {
    type: GET_ERRORS,
    payload: errors,
  };
};
