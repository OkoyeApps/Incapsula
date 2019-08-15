angular.module("authcontroller", ["authservices"])
    .controller("Auth", function (Authservice) {
        this.login = (loginData) => {
            console.log("typeof auth login", loginData);
        }
    })