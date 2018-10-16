export const TEST_DISPATCH = "TEST_DISPATCH";

export const registerUser = user => {
  return {
    type: TEST_DISPATCH,
    payload: user,
  };
};
