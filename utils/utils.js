import he from 'he';

const unescapeObjectFields = (obj) => Object.entries(obj).reduce(
  (acc, [key, value]) => {
    acc[key] = typeof value === 'string' ? he.decode(value) : value;
    return acc;
  },
  {},
);

export default unescapeObjectFields;
