angular.module("authservices", ["processor"])
    .controller("Authservice", function (processor) {
        var authFactory = {};
        console.log("processor type", typeof (processor));
        authFactory.login = () => {
            fetch()
        }
        return authFactory;
    })