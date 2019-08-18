export class Apartment {
    id: string;
    number: number;
    block: number;
    roof: number;
    residentsNumber: number;
    condominiumId: string;
    residents: Array<Resident>;

    constructor(){
        this.residents = new Array<Resident>();
    }
}

export class Resident{
    residentId: string;
    name: string;
    birthday: Date;
    age: number;
    phoneNumber: string;
    formatedPhoneNumber: string;
    formatedDocument: string;
    email: string;
    document: string;
    documentNumber: string;
}