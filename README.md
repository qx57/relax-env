# relax-env

## Requirements

* node.js ^17.9.0

## Dependencies

* @types/node ^17.0.41

## Summary

This pack help you set your test environments so easy. Just create in root path **environments.json** like this:

```json
{
   "deafult": {
        // Some your settings
    } 
}
```
and enjoy!

## Get started

1. install ***relax-env***:

```bash
> npm i relax-env
```

2. create in root path ***environments.json***:
   
```json
{
    "default": {
        "foo": "bar",
        "isEnabled": true,
        ...
        "someObj": {
            ...
        }
    }
}
```
 
More info below.

3. add requirement into your test:

```js
const env = require('relax-env);
let defaultEnvironment = env.getEnvironment();
```

4. use your environment settings:

```js
defaultEnvironment.foo; // = "bar"
```

## Advanced settings

### _Different environment files usage_

You can include various files, not only ***environment.json***. For use anoither env file set process variable ***file***:

```bash
> env file=another/environmen/file.json mocha test.js
```

### _Set default environment name_

For set environment name dofferent than _default_ you can use ***defaultEnvName*** field in env file:

```json
{
    "defaultEnvName": "myEnv",
    ...
    "myEnv": {
        // some your settings
    }
}
```

### _Switch environments through cli_

You can use process variable ***name*** for it:

```bash
> env name=myEnv mocha test.js
```

### _Switch environments in runtime_

If you want to get variables from another environment you have two ways:

* you may get variables without environment switch:

```js
anotherEnv = env.getEnvironmentByName('myEnv');
```

* or you can set new default environment:

```js
defaultEnvironment = env.setEnvironment('myEnv');
```

## Environments.json format

```json
{
    "defaultEnvName": string (optional, if no default field - required)
    "default": any (required, if used defaultEnvName - optional)
    "another-environment": any (optional)
}
```

## Contributors

[qx57](https://github.com/qx57)