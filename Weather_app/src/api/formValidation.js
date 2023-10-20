export function formValidation(el) {
    let validation = {};
    // console.log(el);
    for (let i of Object.keys(el)) {
        // console.log(i);
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
    const check = Object.keys(el).filter((key) => key.includes('checkbox')).map((i) => el[i].state).every(value => !value)
    validation.checkbox = !check
    console.log(validation);
    return validation;
}

function isDateInRange(dateStr) {
    // console.log(dateStr);
    const inputDate = new Date(dateStr);
    // console.log(inputDate);
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
