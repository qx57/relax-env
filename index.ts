/**
 * Provided environment settings from root dir environment.json
 */

/** Try to get environment filename */
const defaultPath = process.env.relaxtest ? '.' : '../..';
const envFile = process.env.file != undefined ? process.env.file : 'environments.json';

/** try to load environments JSON */
let envVar;
try {
    envVar = require(`${defaultPath}/${envFile}`);
} catch {
    throw new Error(`File ${envFile} not found!`);
}
const environments = envVar;

/** Calculate default environment name */
let defaultName = environments.defaultEnvName != undefined ? environments.defaultEnvName : 'default';
let environmentName = process.env.name != undefined ? process.env.name : defaultName;

/** try to set current default environment */
if(environments[environmentName] == undefined) {
    throw new Error(`Environment ${environmentName} not found!`);
}
let currentEnvironment = environments[environmentName];

/** Get default environment */
export const getEnvironment = function(): any {
    return currentEnvironment;
}

/** Get environment by its name from file */
export const getEnvironmentByName = function (envName: string): any {
    if(environments[envName] == undefined) {
        throw new Error(`Environment ${envName} not found!`);
    }
    return environments[envName];
}

/** Set new default environment */
export const setEnvironment = function(envName: string): any {
    if(environments[envName] == undefined) {
        throw new Error(`Environment ${envName} not found!`);
    }
    environmentName = envName;
    currentEnvironment = environments[envName];
    return currentEnvironment;
}

/** Get default environment's name */
export const getEnvironmentName = function(): string {
    return environmentName;
}