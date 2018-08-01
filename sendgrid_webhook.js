var localtunnel = require("localtunnel");

localtunnel(5000, { subdomain: "masonseckykoebel" }, function(err, tunnel) {
  console.log("LT running");
});
