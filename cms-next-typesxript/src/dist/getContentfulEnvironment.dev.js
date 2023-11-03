"use strict";

//==================================
var contentfulManagement = require("contentful-management");

module.exports = function () {
  var contentfulClient = contentfulManagement.createClient({
    accessToken: "CFPAT-SVBXyJ0WDZ11y3Dyr9UlokkpMKTZYYVdhF_fe2vyRUQ"
  });
  return contentfulClient.getSpace("ofpvgsovd02l").then(function (space) {
    return space.getEnvironment("master");
  });
};