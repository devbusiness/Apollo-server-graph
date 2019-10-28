import { pipe, omit } from "ramda";
export const transform = (renameKeys = {}, omitKeys = []) =>
  pipe(
    obj =>
      Object.keys(obj).reduce((acum, currentKey) => {
        const mapper = renameKeys[currentKey];
        if (typeof mapper === "string") {
          acum[mapper] = obj[currentKey];
          delete acum[currentKey];
        } else if (typeof mapper === "object") {
          acum[mapper.key] = mapper.value(obj[currentKey]);
          delete acum[currentKey];
        }
        return acum;
      }, obj),
    omit(omitKeys)
  );
