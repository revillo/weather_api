var httpRequest = require("../src/httpRequest")

test("App runs and serves queries", done => {

    var api = require('../index');
    expect(api.expressApp).toBeTruthy();

    api.startPromise.then(server => {

        setTimeout(() => {
        httpRequest({
            
            hostname: "localhost",
            method: "GET",
            port: api.portNumber,
            path: "/"

        }).then(body => {

            expect(body.status).toBeTruthy();
            server.close();
            done();
        
        }).catch(err => {
            fail(err);
            done();
        })

    })}, 100);
});