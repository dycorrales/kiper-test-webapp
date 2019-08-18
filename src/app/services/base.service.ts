import { Injectable } from '@angular/core';
import { CONDOMINIO_KIPER_API } from '../app.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BaseService {

    protected url: string = '';
    
    constructor(protected module: string, protected http: HttpClient) {

    }

    getPagedList(): Observable<Array<any>> {
        return this.http
            .get<Array<any>>(`${CONDOMINIO_KIPER_API}/${this.module}${this.url}`)
            .pipe(map((response: any) => response.data));
    }

    get(filter?: string): Observable<Array<any>> {
        return this.http
            .get<Array<any>>(`${CONDOMINIO_KIPER_API}/${this.module}${this.url}${filter || ''}`)
            .pipe(map((response: any) => response.data));
    }

    getFirst(filter?: string): Observable<any> {
        return this.http
            .get<any>(`${CONDOMINIO_KIPER_API}/${this.module}${this.url}${filter || ''}`)
            .pipe(map((response: any) => response.data));
    }

    getById(id): Observable<any> {
        return this.http
            .get<any>(`${CONDOMINIO_KIPER_API}/${this.module}${this.url}/${id}`)
            .pipe(map((response: any) => response.data));
    }

    registerElement(data): Observable<any> {
        return this.http
            .post(`${CONDOMINIO_KIPER_API}/${this.module}${this.url}`, data)
            .map((response: any) => response);
    }

    updateElement(id, data): Observable<any> {
        return this.http
            .put(`${CONDOMINIO_KIPER_API}/${this.module}${this.url}/${id}`, data)
            .map((response: any) => response);
    }

    updateStatus(id): Observable<any> {
        return this.http
            .put(`${CONDOMINIO_KIPER_API}/${this.module}${this.url}/${id}/status`, null)
            .pipe(map((response: any) => response));
    }

    delete(id): Observable<any> {
        return this.http
            .delete(`${CONDOMINIO_KIPER_API}/${this.module}${this.url}/${id}`)
            .pipe(map((response: any) => response));
    }
}