// type_checker

class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundException";
  }
}

function propaccess(path, obj) {
  let objectPath;
  const testedPaths = [];

  const stringifyTestedPaths = (key = null) => {
    return testedPaths.join(".") + key;
  };

  try {
    if (!path || path === "." || path === "") {
      return obj;
    }

    const pathArray = path.split(".");

    if (obj === null) {
      objectPath = `${pathArray[0]} not exist.`;
      return objectPath;
    }

    objectPath = obj;

    pathArray.forEach((key) => {
      const currentKey = stringifyTestedPaths(`.${key}`);
      if (objectPath[key] === undefined) {
        // if(typeof objectPath !== "string") testedPaths.push(key);
        throw new NotFoundException(`Key '${currentKey}' does not exist`);
        // objectPath = testedPaths.join('.').trim() + " not exist.";
        // return;
      }

      testedPaths.push(key);
      objectPath = objectPath[key];
    });

    if (typeof objectPath === "string") {
      return objectPath;
    }

    return objectPath;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function interpolate(object) {
  return this.replace(/{{\s*([^{}\s]*)\s*}}/g, (match, path) => {
    return propaccess(path, object);
  });
}

String.prototype.interpolate = interpolate;
