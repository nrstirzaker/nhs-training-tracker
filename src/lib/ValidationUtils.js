export const isNumber = function(value){return /^\d+$/.test(value);}
export const isAlpha = function(value){return  /^[a-zA-Z]+$/.test(value);}
export const isAlphaNumeric = function(value){return  /^[a-z0-9]+$/i.test(value);}

export const isNumeric = function(value){return /^\d+(\.\d+)?$/.test(value);}
