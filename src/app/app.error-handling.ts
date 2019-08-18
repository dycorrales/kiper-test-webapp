import { ErrorHandler, Injectable, Injector, Inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "./security/auth.service";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(@Inject(Injector) private readonly injector: Injector) {
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        var message = "";
        if(errorResponse.error){
            if(errorResponse.error.errors){
                message = errorResponse.error.errors[0].value;
            }
        }
        
        if (errorResponse instanceof HttpErrorResponse) {
            switch (errorResponse.status) {
                case 401:
                    this.notificationService.error("Não autorizado", 'Error!', { onActivateTick: true });
                    this.injector.get(AuthenticationService).logout();
                    break;
                case 400:
                    this.notificationService.error(`Operação inválida. ${message}`, 'Error!', { onActivateTick: true });
                    break;
                case 403:
                    this.notificationService.error("Não autorizado", 'Error!', { onActivateTick: true });
                    this.injector.get(AuthenticationService).logout();
                    break;
                case 404:
                    this.notificationService.error("Recurso não encontrado", 'Error!', { onActivateTick: true });
                    break;
                case 409:
                    this.notificationService.error("Conflito de requisiçãoo", 'Error!', { onActivateTick: true });
                    break;
                case 500:
                    this.notificationService.error("Erro do servidor", 'Error!', { onActivateTick: true });
                    break;
                default:
                    this.injector.get(AuthenticationService).logout();
            }
        }
        super.handleError(errorResponse);
    }

    private get notificationService(): ToastrService {
        return this.injector.get(ToastrService);
    }
}