//==================================
const contentfulManagement = require("contentful-management");

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: "CFPAT-SVBXyJ0WDZ11y3Dyr9UlokkpMKTZYYVdhF_fe2vyRUQ",
  });

  return contentfulClient
    .getSpace("ofpvgsovd02l")
    .then((space) => space.getEnvironment("master"));
};
