require('babel-register')()

//Disable the import css in JS cause Mocha doesn't understand it.
require.extensions[".css"] = function(){}



