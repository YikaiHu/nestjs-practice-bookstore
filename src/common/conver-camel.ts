export function convertCamel(value: any) {
  if (!value) return value;

  if (Array.isArray(value)) return value.map(convertCamel);

  if (typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [
        camelCase(key),
        convertCamel(val),
      ]),
    );
  }

  return value;
}

function camelCase(str: string) {
  const converted = str.replace(/[_\s]+(.)?/g, (next) => next[1].toUpperCase());
  return converted[0].toLowerCase() + converted.slice(1);
}
