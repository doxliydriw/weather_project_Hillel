export function find_match(paramsset, elem) {
    const param = Object.values(paramsset).find(param => param.id === elem.parameter);
    return param ? param.textfield : undefined;
}