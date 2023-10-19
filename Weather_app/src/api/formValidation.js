
export function formValidation(el) {
    const passwordRegex = ''
    const emailRegex = ''
    const latitudeRegex = '^([-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?))$'
    const longitudeRegex = '^([-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?))$'
    let validation = {};
    console.log(el);
    for (let i of Object.keys(el)) {
        console.log(i);
        switch (i) {
            case 'date_time':
                validation[i] = isDateInRange(el[i].number);
                break;
            case 'latitude':
            case 'longitude':
            case 'password':
            case 'email':
                validation[i] = isValidElement(el[i])
                break;
        }
    }
    validation.checkbox = [Object.keys(el).filter((key) => key.includes('checkbox')).map((i) => el[i].state)];
    console.log(validation);
    return validation;
}

function isDateInRange(dateStr) {
    console.log(dateStr);
    const inputDate = new Date(dateStr);
    console.log(inputDate);
    if (isNaN(inputDate)) {
        return false;
    }
    const now = new Date();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const tenDaysAhead = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10);

    return inputDate >= yesterday && inputDate <= tenDaysAhead;
}


function isValidElement(el) {
    let regex = new RegExp(el.regex);
    let str = el.number;
    return regex.test(str);
}
