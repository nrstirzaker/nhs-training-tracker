import {DateTime} from "luxon"

export const formatDateToDisplay = function(ssoDate:String,invalidResponse:String){

    const spacePlace = ssoDate.indexOf(" ");
    const truncatedDateOnly = ssoDate.substring(0, spacePlace);
    const response = DateTime.fromFormat(truncatedDateOnly, "yyyy-MM-dd").toLocal().toFormat("dd/MM/yyyy");
    if ( response === 'Invalid DateTime' && invalidResponse != undefined ){
        return invalidResponse;
    }else{
        return response;
    }

}


