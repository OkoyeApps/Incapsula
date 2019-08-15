/*
*Create and export configuration variables

*/

//Container for all the variables

var environments = {};

//staging (default) environment
environments.developemnt = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging',
    'hashingSecrete': 'thisIsASecret'
};

//Production environment
environments.production = {
    'httpPort': 5002,
    'httpsPort': 5001,
    'envName': 'production',
    'hashingSecrete': 'thisIsAlsoASecret'
};



//Determine which environment was passed as a command-line argument

var currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//check that the current environment is of the environments above, else default to staging

var environmentToExport = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//Export the module
module.exports = environmentToExport;