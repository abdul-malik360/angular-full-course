import { ThisReceiver } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' }) // { providedIn: 'root' }
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();

  // private recipes: Recipe[] = [
  // {
  //   description: 'Description',
  //   imagePath:
  //     'https://www.seekpng.com/png/full/17-175698_salad-dressing-png-salad-png.png',
  //   ingredients: [{ name: 'apple', amount: 2 }],
  //   name: 'Apple salad',
  // },

  // {
  //   description: 'about food',
  //   imagePath:
  //     'https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-Spinach-Pasta-close.jpg',
  //   ingredients: [{ name: 'pasta', amount: 6 }],
  //   name: 'pasta food',
  // },
  // new Recipe(
  //   'A test recipe',
  //   'description of a test recipe',
  //   'https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-Spinach-Pasta-close.jpg',
  //   [new Ingredient('meat', 1), new Ingredient('fries', 20)]
  // ),

  // new Recipe(
  //   'A test recipe 2',
  //   'description of a test recipe 2',
  //   'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-bucatinipasta-028-ls-1607552701.jpg?crop=0.667xw:1.00xh;0.245xw,0&resize=640:*',
  //   [new Ingredient('chicken', 1), new Ingredient('rice', 30)]
  // ),

  // new Recipe(
  //   'A test recipe 3',
  //   'description of a test recipe 3',
  //   'https://www.seekpng.com/png/full/17-175698_salad-dressing-png-salad-png.png',
  //   [new Ingredient('onions', 5), new Ingredient('letters', 20)]
  // ),

  // new Recipe(
  //   'A test recipe 4',
  //   'description of a test recipe 4',
  //   'https://st.depositphotos.com/1011514/1953/i/600/depositphotos_19537053-stock-photo-bream-fish.jpg',
  //   [new Ingredient('fish', 1), new Ingredient('peas', 20)]
  // ),
  // ];

  private recipes: Recipe[] = [];

  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
    // this.getRecipes();
    console.log(this.recipes);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
    console.log(this.recipes);

    // console.log(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
