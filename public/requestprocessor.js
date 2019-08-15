angular.module("processor", []).config(function () { console.log("request processor") })
    .controller("processor", function () {
        var processor = {};

        processor.get = function (url, headers) {
            return new Promise((resolve, rejects) => {
                fetch(url, { method: "get", headers: { ...headers } }).then(response => resolve(response.json())).catch(error => reject(error));

            })
        }
        processor.post = function (url, payload, headers) {
            return new Promise((resolve, rejects) => {
                fetch(url, { method: "get", body: JSON.stringify(payload), headers: { ...headers } }).then(response => resolve(response.json())).catch(error => reject(error));

            })
        }
        return processor;
    })