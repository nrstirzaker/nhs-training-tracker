interface iRawStaffDTO {
    id:string;
    firstName:string;
    lastName:string;
    startDate:Date;
    wholeTimeEquivalent:number;
    bandId:string;
    substantive:boolean;
    onStrength:boolean;
    onMaternityLeave:boolean;
    archived:boolean;

}

export default iRawStaffDTO;
