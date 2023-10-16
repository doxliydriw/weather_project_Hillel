export async function apiRequest(token, params) {
    let parameters_url = '';
    // console.log(token.data, params)
    let parameters = Object.keys(params).filter((key) => key.includes('checkbox'))
    for (let i of parameters) {
        if (params[i].state) {
            parameters_url += params[i].id + ','
        }
    }
    console.log(parameters_url);
    const url = `https://api.meteomatics.com/${params.date_time}T10:55:00.000+02:00/${parameters_url.replace(/,$/, "")}/${params.latitude},${params.longitude}/json??access_token=${token.data}`
    // console.log(url)
    const response = await fetch(url)
    const data = await response.json();
    console.log(data);
    return data
}   