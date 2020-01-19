import { isPlainObject, mapValues } from "lodash";

const addTypenames = (parent, path = ["Redux"]) => {
  if (Array.isArray(parent)) {
    return parent.map(v => addTypenames(v, [...path]));
  } else if (isPlainObject(parent)) {
    return {
      __typename: path.join("."),
      ...mapValues(parent, (value, key) => addTypenames(value, [...path, key]))
    };
  }

  return parent;
};

export { addTypenames };
