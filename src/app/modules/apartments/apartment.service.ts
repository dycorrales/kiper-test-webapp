import { BaseService } from "app/services/base.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CONDOMINIO_KIPER_API } from "app/app.api";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ApartmentService extends BaseService {
    constructor(protected http: HttpClient) {
        super('apartments', http);
    }

    getApartmentById(condominiumId, id): Observable<any> {
        return this.http.get<any>(`${CONDOMINIO_KIPER_API}/${condominiumId}/${this.module}/${id}`)
            .pipe(map((response: any) => response.data));
    }

    getApartmentsByCondominioId(condominiumId): Observable<any> {
        return this.http.get<any>(`${CONDOMINIO_KIPER_API}/${condominiumId}/apartments`)
            .pipe(map((response: any) => response.data));
    }

    getAllApartmentsByCondominiumId(condominiumId): Observable<any> {
        return this.http.get<any>(`${CONDOMINIO_KIPER_API}/${condominiumId}/${this.module}/all`)
                                 .pipe(map((response: any) => response.data));
    }

    deleteApartment(condominiumId, apartmentId) {
        return this.http
            .delete(`${CONDOMINIO_KIPER_API}/${condominiumId}/${this.module}/${apartmentId}`)
            .pipe(map((response: any) => response));
    }

    registerApartment(condominiumId, apartment){
        return this.http
        .post(`${CONDOMINIO_KIPER_API}/${condominiumId}/${this.module}${this.url}`, apartment)
        .map((response: any) => response);
    }

    updateApartment(condominiumId, apartmentId, apartment){
        return this.http
        .put(`${CONDOMINIO_KIPER_API}/${condominiumId}/${this.module}${this.url}/${apartmentId}`, apartment)
        .map((response: any) => response);
    }
}
