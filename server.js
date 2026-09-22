const path = require("path");

const backendDirectory = path.join(__dirname, "backend");
process.chdir(backendDirectory);
require(path.join(backendDirectory, "server.js"));
