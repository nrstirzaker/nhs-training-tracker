function getAuthHeader(){
    return localStorage.getItem("pocketbase_auth")
}


export {
    getAuthHeader
}

