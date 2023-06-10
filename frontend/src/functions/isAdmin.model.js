const isAdmin = (string, arr) => {
  let isTrue = false;
  arr?.forEach((value, index) => {
    if (string === value) {
      isTrue = true;
    }
  });
  return isTrue;
};
export default isAdmin;
