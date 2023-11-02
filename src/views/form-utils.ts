export interface basicRequestHeader{
    Authorization : string;
    "Content-Type": string;
}

export  function getBasicRequestHeader() :basicRequestHeader{
    return  {
        "Authorization": getAuthToken(),
        'Content-Type':'application/json'
    }

}

export function getAuthToken() : string{
    return (sessionStorage.getItem('token') === null ? "" : <string>sessionStorage.getItem('token'));
}





