export class StaffEntity {

    constructor(id: string) {
        this.id = id;
    }
    id:string
    first_name:string
    last_name:string
    whole_time_equivalent:number
    band_id:number
    substantive:boolean
    on_strength:boolean
    maternity:boolean
    archived:boolean
}