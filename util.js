export const findSelfResponse = (number) => {
  //找世應
  let self = 6;
  switch (number) {
    case 1:
      self = 6;
      break;
    case 2:
      self = 1;
      break;
    case 3:
      self = 2;
      break;
    case 4:
      self = 3;
      break;
    case 5:
      self = 4;
      break;
    case 6:
      self = 5;
      break;
    case 7:
      self = 4;
      break;
    case 8:
      self = 3;
      break;
  }
  const resp = self >= 4 ? self - 3 : self + 3;
  return { self, resp };
};
