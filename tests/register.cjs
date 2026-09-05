/* eslint-disable @typescript-eslint/no-require-imports */
const Module = require("node:module");
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "next/dist/compiled/server-only") return {};
  return originalLoad.call(this, request, parent, isMain);
};
