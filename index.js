"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HotModuleReplacement_1 = require("./HotModuleReplacement");
exports.addReactHotModuleReplacementConfig = HotModuleReplacement_1.addReactHotModuleReplacementConfig;
// Temporarily alias addReactHotModuleReplacementConfig as addReactHotModuleReplacementBabelTransform for backward
// compatibility with aspnet-webpack 1.x. In aspnet-webpack 2.0, we can drop the old name (and also deprecate
// some other no-longer-supported functionality, such as LoadViaWebpack).
var HotModuleReplacement_2 = require("./HotModuleReplacement");
exports.addReactHotModuleReplacementBabelTransform = HotModuleReplacement_2.addReactHotModuleReplacementConfig;
