export const extractObjectPath = <ObjectPath extends Record<any, any>>(
    obj: ObjectPath
  ): ObjectPath => {
    const result: Record<any, any> = {} as ObjectPath;
  
    const recursivePathCalculation = (
      source: Record<string, string | number>,
      rootPath: string[] = [],
      target = result
    ) => {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          const path = rootPath.slice();
          path.push(key);
  
          const value = source[key];
          if (value !== null && typeof value === "object") {
            recursivePathCalculation(value, path, (target[key] = {}));
          } else {
            target[key] = path.join(".");
          }
        }
      }
    };
    recursivePathCalculation(obj);
  
    return result;
  };
  