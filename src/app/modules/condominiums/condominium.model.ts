interface Condominium {
    id: string;
    name: string;
    address: string;
    apartmentsNumber: number;
    apartments: Array<Apartment>;
}