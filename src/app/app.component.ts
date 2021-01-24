import { Component, OnInit } from '@angular/core';

import { AppService } from '../providers/services/app.service';
import { CategoryModel, StrCategory } from '../providers/models/category.model';
import { IngredientModel, StrIngredient } from '../providers/models/ingredient.model';
import { Drink, DrinkModel } from '../providers/models/drinks.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cocktail';

  /* For Filters */
  sort = 'ASC';
  category: string;
  ingredient = 'notset';
  /* Filters declaration End */

  categoriesArray: StrCategory[] = [];
  ingredientsArray: StrIngredient[] = [];
  drinksArray: Drink[] = [];
  defaultDrinksArray: Drink[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.fetchCategories();
    this.fetchIngredients();
  }

  /* Fetched All Categories */
  fetchCategories() {
    this.appService.fetchCategoriesOrIngredients('c').subscribe((res: CategoryModel) => {
      this.categoriesArray = res.drinks;
      this.category = this.categoriesArray[0].strCategory;
      /* Since api to fetch all drinks is not there so used the first category to find out the intial drinks */
      this.fetchDrinksByCategoryOrIngredient('c', this.category);
    }, error => {
      alert(error);
    });
  }

  /* Fetched All Ingredients */
  fetchIngredients() {
    this.appService.fetchCategoriesOrIngredients('i').subscribe((res: IngredientModel) => {
      this.ingredientsArray = res.drinks;
    }, error => {
      alert(error);
    });
  }

  /* Fetched All Drinks */
  fetchDrinksByCategoryOrIngredient(type: 'c' | 'i', name: string) {
    type === 'c' ? this.ingredient = 'notset' : this.category = 'notset'; // To show to user that other filter is unset
    this.appService.fetchDrinksByCategoryOrIngredient(type, name).subscribe((res: DrinkModel) => {
      this.drinksArray = res.drinks;
      this.defaultDrinksArray = res.drinks;
      this.sort = 'ASC'; // Reset Everytime to ASC as sorted data comes from cocktail server
    }, error => {
      alert(error);
    });
  }

  /* To Sort Drinks in ASC or DESC Order */
  onSortDrinks() {
    this.drinksArray.sort((a, b) => {
      if (this.sort === 'ASC') {
        return a.strDrink < b.strDrink ? -1 : 1;
      } else if (this.sort === 'DESC') {
        return a.strDrink > b.strDrink ? -1 : 1;
      }
    });
  }

  /* To Search Drinks */
  onSearchDrinks(search: string) {
    if (search === '') {
      /* If empty then assign all fetched values that we got from server */
      /* Did not assigned directly bcz of reference issue */
      this.drinksArray = Object.assign([], this.defaultDrinksArray);
    } else {
      this.drinksArray = this.defaultDrinksArray.filter(drink => drink.strDrink.toLowerCase().indexOf(search.toLowerCase()) > -1);
    }
  }
}
