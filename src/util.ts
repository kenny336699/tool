/**
 * Interface for the function return type
 */
interface SelfResponse {
  self: number;
  resp: number;
}

/**
 * Type for the mapping of input numbers to self values
 */
type SelfMap = {
  [key: number]: number;
};

export const findSelfResponse = (number: number): SelfResponse => {
  // Mapping of input numbers to self values
  const selfMap: SelfMap = {
    1: 6,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 4,
    8: 3,
  };

  // Validate input
  if (!Number.isInteger(number) || number < 1 || number > 8) {
    throw new Error("Input must be an integer between 1 and 8");
  }

  // Get self value from mapping
  const self = selfMap[number];

  // Calculate response using ternary operator
  const resp = self >= 4 ? self - 3 : self + 3;

  return { self, resp };
};

// Example usage:
// const result = findSelfResponse(1);
// console.log(result); // { self: 6, resp: 3 }
