import { BaseService } from "app/services/base.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CONDOMINIO_KIPER_API } from "app/app.api";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class DashboardService extends BaseService {
    constructor(protected http: HttpClient) {
        super('dashboard', http);
    }

    getDashboard(): Observable<any> {
        let dashboard = this.http.get<any>(`${CONDOMINIO_KIPER_API}/${this.module}`)
                                 .pipe(map((response: any) => response.data));

        let condominiums = this.http.get<any>(`${CONDOMINIO_KIPER_API}/condominiums`)
        .pipe(map((response: any) => response.data));
                
        return forkJoin([dashboard, condominiums]);
    }
}
