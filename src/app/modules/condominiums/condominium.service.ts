import { BaseService } from "app/services/base.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CONDOMINIO_KIPER_API } from "app/app.api";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class CondominiumService extends BaseService {
    constructor(protected http: HttpClient) {
        super('condominiums', http);
    }

    getCondominiumById(condominiumId): Observable<any> {
        return this.http.get<any>(`${CONDOMINIO_KIPER_API}/${this.module}/${condominiumId}`)
                                 .pipe(map((response: any) => response.data));
    }

    getAllCondominiums(): Observable<any> {
        return this.http.get<any>(`${CONDOMINIO_KIPER_API}/${this.module}/all`)
                                 .pipe(map((response: any) => response.data));
    }
}
