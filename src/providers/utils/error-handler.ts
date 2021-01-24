import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorHandler {

    constructor() {}

    /* To Hanlde Http Error */
    static handleHttpError = (error: HttpErrorResponse) => {
        /* Do some error checks from api and find out the message */
        return throwError(error.error.text ? error.error.text : 'Oops! Some Error Occured');
    }

    /* Other Errors of App can also be hanlded here by defining different methods */
}
