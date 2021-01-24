import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ErrorHandler } from '../utils/error-handler';
import { CategoryModel } from '../models/category.model';
import { IngredientModel } from '../models/ingredient.model';
import { DrinkModel } from '../models/drinks.model';


@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(private httpClient: HttpClient) { }

    fetchCategoriesOrIngredients(type: 'c' | 'i') {
        return this.httpClient
            .get<CategoryModel | IngredientModel>
            (`${environment.baseUrl}${environment.endPoints.fetchCategoriesOrIngredients}?${type}=list`,
                {
                    observe: 'body',
                    responseType: 'json'
                }
            )
            .pipe(
                catchError(error => {
                    return ErrorHandler.handleHttpError(error);
                })
            );
    }

    fetchDrinksByCategoryOrIngredient(type: 'c' | 'i', categoryName: string) {
        return this.httpClient
            .get<DrinkModel>
            (`${environment.baseUrl}${environment.endPoints.fetchDrinksByCategoryOrIngredient}?${type}=${categoryName}`,
                {
                    observe: 'body',
                    responseType: 'json'
                }
            )
            .pipe(
                catchError(error => {
                    return ErrorHandler.handleHttpError(error);
                })
            );
    }
}
