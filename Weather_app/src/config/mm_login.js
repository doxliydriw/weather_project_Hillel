// Token generator for API requests. Token is valid for 2 hours after received.
export function mmLogin() {
    const username = 'privatperson_demidas_konstantin'
    const password = 'x9w5yYM7X1'
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
    console.log('trying');
    fetch('https://login.meteomatics.com/api/v1/token', {
        method: 'GET', headers: headers
    }).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        var token = data.access_token;
        console.log('token', token);
    }).catch(function (err) {
        console.log('something went wrong', err);
    });
}