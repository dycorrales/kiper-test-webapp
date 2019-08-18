import { BaseService } from "app/services/base.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CONDOMINIO_KIPER_API } from "app/app.api";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ResidentService extends BaseService {
    constructor(protected http: HttpClient) {
        super('residents', http);
    }

    getResidents(filter?): Observable<any> {
        return this.http.get<any>(`${CONDOMINIO_KIPER_API}/${this.module}${filter ? '?filter=' + filter : ''}`)
                                 .pipe(map((response: any) => response.data));
    }

    deleteResident(condominiumId, apartmentId, residentId) {
            return this.http
                .delete(`${CONDOMINIO_KIPER_API}/${condominiumId}/apartments/${apartmentId}/${this.module}/${residentId}`)
                .pipe(map((response: any) => response));
    }

    getResidentsByApartmentId(condominiumId, apartmentId) {
        return this.http.get<any>(`${CONDOMINIO_KIPER_API}/${condominiumId}/apartments/${apartmentId}/${this.module}`)
                                 .pipe(map((response: any) => response.data));
    }

    registerResident(condominiumId, apartmentId, resident){
        return this.http
        .post(`${CONDOMINIO_KIPER_API}/${condominiumId}/apartments/${apartmentId}/${this.module}${this.url}`, resident)
        .map((response: any) => response);
    }

    updateResident(condominiumId, apartmentId, residentId, resident){
        return this.http
        .put(`${CONDOMINIO_KIPER_API}/${condominiumId}/apartments/${apartmentId}/${this.module}${this.url}/${residentId}`, resident)
        .map((response: any) => response);
    }
}
