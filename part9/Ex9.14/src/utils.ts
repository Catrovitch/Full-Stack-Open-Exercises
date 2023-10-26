export const assertNever = (value: never): never => {
    throw new Error(
      `Something wrong with the union: ${JSON.stringify(value)}`
    );
  };