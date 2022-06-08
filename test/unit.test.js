const fs = require('fs');
const assert = require('assert');
const { afterEach } = require('mocha');

const pack = '../index.js';

const wrongEnvFile = 'test/ololo.json';
const testEnvFile_1 = 'test/data/env1.json';
const testEnvFile_2 = 'test/data/env2.json';
const destEnvFile = 'environments.json';
const anotherEnvName = 'ololo';
const wrongEnvName = 'xx';

describe('Unit tests', async () => {

    it('I get error while have no default environments.json file', () => {
        try {
            const e = require(pack);
        } catch(e) {
            assert(e.message === `File ${destEnvFile} not found!`);
        }
    });

    it('I can get default environment from default file', () => {
        fs.copyFileSync(testEnvFile_2, destEnvFile);
        const e = require(pack);
        assert(e.getEnvironment().bar.value_1);
        assert(e.getEnvironment().foo === "bar");
        fs.unlinkSync(destEnvFile);
    });

    it('I get error while have no specific file', () => {
        process.env.file = wrongEnvFile;
        try {
            const e = require(pack);
        } catch(e) {
            assert(e.message === `File ${wrongEnvFile} not found!`);
        }
    });

    it('I can get default environment from specific file', () => {
        process.env.file = testEnvFile_1;
        const e = require(pack);
        assert(e.getEnvironment().bar === "foo");
    });

    it('I can get env name', () => {
        process.env.file = testEnvFile_1;
        const e = require(pack);
        assert(e.getEnvironmentName() === 'stage');
    });

    it('I can get another environment', () => {
        process.env.file = testEnvFile_1;
        const e = require(pack);
        assert(e.getEnvironmentName() === 'stage');
        assert(e.getEnvironment().bar === "foo");
        anotherEnv = e.getEnvironmentByName(anotherEnvName);
        assert(e.getEnvironmentName() === 'stage');
        assert(e.getEnvironment().bar === "foo");
        assert(anotherEnv.bar.value_2 === 'pish');
    });

    it('I can set another environment', () => {
        process.env.file = testEnvFile_1;
        const e = require(pack);
        assert(e.getEnvironmentName() === 'stage');
        assert(e.getEnvironment().bar === "foo");
        anotherEnv = e.setEnvironment(anotherEnvName);
        assert(e.getEnvironmentName() === anotherEnvName);
        assert(e.getEnvironment().bar.value_2 === 'pish');
        assert(anotherEnv.bar.value_2 === 'pish');
    });

    it('I get error while I try to get env with wrong name', () => {
        process.env.file = testEnvFile_1;
        const e = require(pack);
        try {
            anotherEnv = e.getEnvironmentByName(wrongEnvName);
        } catch(e) {
            assert(e.message === `Environment ${wrongEnvName} not found!`);
        }
    });

    it('I get error while I try to set default env with wrong name', () => {
        process.env.file = testEnvFile_1;
        const e = require(pack);
        try {
            anotherEnv = e.setEnvironment(wrongEnvName);
        } catch(e) {
            assert(e.message === `Environment ${wrongEnvName} not found!`);
        }
    });

    it('I can get environment from specific file with name from process env', () => {
        process.env.file = testEnvFile_1;
        process.env.name = anotherEnvName;
        const e = require(pack);
        assert(e.getEnvironmentName() === 'ololo');
        assert(e.getEnvironment().bar.value_2 === 'pish');
        assert(e.getEnvironment().foo === 'bar-2');
    });

    /** Clear module including */
    afterEach(() => {
        mod = require.resolve(pack);
        delete require.cache[mod];
    });
});