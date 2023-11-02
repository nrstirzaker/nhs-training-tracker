export function required(value : string) : (boolean | string)[]{
    return [!!value || 'This value is required'];
}
