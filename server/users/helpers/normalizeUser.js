const { generateUserPassword } = require("./bcrypt");

const normalizeUser = (rawUser) => {
  const name = { ...rawUser.name, middle: rawUser.name.middle || "" };
  const image = {
    ...rawUser.image,
    url:
      rawUser.image.url ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    alt: rawUser.image.alt || "User Image",
  };
  const address = {
    ...rawUser.address,
    state: rawUser.address.state || "",
    zip: rawUser.address.zip || 0,
  };
  const user = {
    ...rawUser,
    name,
    image,
    address,
    password: generateUserPassword(rawUser.password),
  };
  return user;
};

module.exports = normalizeUser;
