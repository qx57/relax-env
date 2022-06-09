"use strict";
/**
 * Provided environment settings from root dir environment.json
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentName = exports.setEnvironment = exports.getEnvironmentByName = exports.getEnvironment = void 0;
/** Try to get environment filename */
const defaultPath = process.env.relaxtest ? '.' : '../..';
const envFile = process.env.file != undefined ? process.env.file : 'environments.json';
/** try to load environments JSON */
let envVar;
try {
    envVar = require(`${defaultPath}/${envFile}`);
}
catch (_a) {
    throw new Error(`File ${envFile} not found!`);
}
const environments = envVar;
/** Calculate default environment name */
let defaultName = environments.defaultEnvName != undefined ? environments.defaultEnvName : 'default';
let environmentName = process.env.name != undefined ? process.env.name : defaultName;
/** try to set current default environment */
if (environments[environmentName] == undefined) {
    throw new Error(`Environment ${environmentName} not found!`);
}
let currentEnvironment = environments[environmentName];
/** Get default environment */
const getEnvironment = function () {
    return currentEnvironment;
};
exports.getEnvironment = getEnvironment;
/** Get environment by its name from file */
const getEnvironmentByName = function (envName) {
    if (environments[envName] == undefined) {
        throw new Error(`Environment ${envName} not found!`);
    }
    return environments[envName];
};
exports.getEnvironmentByName = getEnvironmentByName;
/** Set new default environment */
const setEnvironment = function (envName) {
    if (environments[envName] == undefined) {
        throw new Error(`Environment ${envName} not found!`);
    }
    environmentName = envName;
    currentEnvironment = environments[envName];
    return currentEnvironment;
};
exports.setEnvironment = setEnvironment;
/** Get default environment's name */
const getEnvironmentName = function () {
    return environmentName;
};
exports.getEnvironmentName = getEnvironmentName;
