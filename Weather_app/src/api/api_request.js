export async function apiRequest(token, param) {
    console.log(token.data, param)
    const url = `https://api.meteomatics.com/${param.inputDate}T10:55:00.000+02:00/t_2m:C,t_max_2m_24h:C,precip_1h:mm,sunrise:sql,sunset:sql/${param.Latitude},${param.Longitude}/json??access_token=${token.data}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json();
    console.log(data);
}