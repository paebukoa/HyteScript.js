# \#(test)
Some description

## Usage

`#(test => param1 | param2 | param3)`

## Fields

| Name | Description | Optional | Default Value |
| :--- | :---------: | :------: | ------------: |
Param 1 | Some param | false | _none_ |
Param 2 | Some param | true | 1 |
Param 3 | Some param | true | false |

## Example {.tabset}

### Main file method 

```js
<client>.addCommands({
    name: "test",
    code: `
#(test => test)    
` 
}) // returns "test"
```
### Folder reader method

```js
module.exports = {
    name: "test",
    code: `
#(test => test)    
` 
} // returns "test"
```
