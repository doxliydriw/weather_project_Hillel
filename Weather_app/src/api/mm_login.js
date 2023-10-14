// Token generator for API requests. Token is valid for 2 hours after received.

async function fetchToken() {
    let headers = new Headers();
    const username = 'privatperson_demidas_konstantin'
    const password = 'x9w5yYM7X1'
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
    // console.log('getting token');
    let resp = await fetch('https://login.meteomatics.com/api/v1/token', {
        method: 'GET', headers: headers
    });
    let data = await resp.json();
    return data;
}

export async function mmLogin(el) {
    // console.log(el)
    let timeStamp = new Date()
    // console.log((timeStamp - el.timeStamp) / 3600000)
    if (el.data.length < 1 || ((timeStamp - new Date(el.timeStamp)) / 3600000) > 2) {
        let data = await fetchToken();
        timeStamp = timeStamp.getTime();
        // console.log(timeStamp);
        let token = {
            data: data.access_token,
            timeStamp: timeStamp
        }
        // console.log(token)
        return token
    } else {
        // console.log('el');
        return el;
    }
}