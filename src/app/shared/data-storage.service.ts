import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../Recipes/recipe.model';
import { RecipeService } from '../Recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  recipesUrl =
    'https://recipe-book-70287-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    return this.http.put(this.recipesUrl, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
    //   .subscribe((recipes) => {
    // this.recipeService.setRecipes(recipes);
    //     console.log(recipes);
    //   });
  }
}
