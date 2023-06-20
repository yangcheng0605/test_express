const crypto = require("crypto");

export const md5 = (str: string) => {
  try {
    const hash = crypto.createHash("md5");
    return hash.update(str).digest("hex");
  } catch (error) {
    return str;
  }
};
