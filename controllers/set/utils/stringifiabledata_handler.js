export const stringifiabledata_handler = (setsData) => {
  let stringifiableData = {};
  for (const key in setsData) {
    if (Object.prototype.hasOwnProperty.call(setsData, key)) {
      const value = setsData[key];

      if (value instanceof Set) {
        stringifiableData[key] = Array.from(value);
      } else {
        stringifiableData[key] = value;
      }
    }
  }
  return stringifiableData;
};
