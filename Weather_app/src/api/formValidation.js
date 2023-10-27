export function formValidation(el) {
    let validation = {};
    console.log(el);
    for (let i of Object.keys(el)) {
        // console.log(i);
        switch (i) {
            case 'date_time':
                validation[i] = isDateInRange(el[i].value);
                break;
            case 'latitude':
            case 'longitude':
            case 'password':
            case 'email':
            case 'name':
            case 'phone':
            case 'url':

                validation[i] = isValidElement(el[i])
                // console.log(validation[i])
                break;
        }
    }
    if (Object.keys(el).some((e) => e.includes('checkbox'))) {
        const check = Object.keys(el).filter((key) => key.includes('checkbox')).map((i) => el[i].state).every(value => !value)
        validation.checkbox = !check
    }
    // console.log(validation);
    return validation;
}

function isDateInRange(dateStr) {
    const inputDate = new Date(dateStr);
    if (isNaN(inputDate)) {
        return false;
    }
    const now = new Date();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const tenDaysAhead = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10);

    return inputDate >= yesterday && inputDate <= tenDaysAhead;
}


function isValidElement(el) {
    // console.log(typeof (el.regex));
    let regex = new RegExp(el.regex);
    let str = el.value;
    return regex.test(str);
}
