"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var supportedTypeScriptLoaders = ['ts-loader', 'awesome-typescript-loader'];
function addReactHotModuleReplacementConfig(webpackConfig) {
    var moduleConfig = webpackConfig.module;
    var moduleRules = moduleConfig.rules;
    if (!moduleRules) {
        return; // Unknown rules list format. Might be Webpack 1.x, which is not supported.
    }
    var _loop_1 = function (ruleIndex) {
        // We only support NewUseRule (i.e., { use: ... }) because OldUseRule doesn't accept array values
        var rule = moduleRules[ruleIndex];
        if (!rule.use) {
            return "continue";
        }
        // We're looking for the first 'use' value that's a TypeScript loader
        var loadersArray = rule.use instanceof Array ? rule.use : [rule.use];
        var isTypescriptLoader = supportedTypeScriptLoaders.some(function (typeScriptLoaderName) { return containsLoader(loadersArray, typeScriptLoaderName); });
        if (!isTypescriptLoader) {
            return "continue";
        }
        return "break";
    };
    // Find the rule that loads TypeScript files, and prepend 'react-hot-loader/webpack'
    // to its array of loaders
    for (var ruleIndex = 0; ruleIndex < moduleRules.length; ruleIndex++) {
        var state_1 = _loop_1(ruleIndex);
        if (state_1 === "break")
            break;
    }
    // Ensure the entrypoint is prefixed with 'react-hot-loader/patch' (unless it's already in there).
    // We only support entrypoints of the form { name: value } (not just 'name' or ['name'])
    // because that gives us a place to prepend the new value
    if (!webpackConfig.entry || typeof webpackConfig.entry === 'string' || webpackConfig.entry instanceof Array) {
        throw new Error('Cannot enable React HMR because \'entry\' in Webpack config is not of the form { name: value }');
    }
    var entryConfig = webpackConfig.entry;
    Object.getOwnPropertyNames(entryConfig).forEach(function (entrypointName) {
        if (typeof (entryConfig[entrypointName]) === 'string') {
            // Normalise to array
            entryConfig[entrypointName] = [entryConfig[entrypointName]];
        }
    });
}
exports.addReactHotModuleReplacementConfig = addReactHotModuleReplacementConfig;
function containsLoader(loadersArray, loaderName) {
    return loadersArray.some(function (loader) {
        // Allow 'use' values to be either { loader: 'name' } or 'name'
        // No need to support legacy webpack.OldLoader
        var actualLoaderName = loader.loader || loader;
        return actualLoaderName && new RegExp("\\b" + loaderName + "\\b").test(actualLoaderName);
    });
}
