import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // shoppingListForm: FormGroup;
  // @ViewChild('nameInput', { static: false })
  // nameInput: ElementRef;

  // @ViewChild('amountInput', { static: false })
  // amountInput: ElementRef;
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
    // this.shoppingListForm = new FormGroup({
    //   listName: new FormControl(null),
    //   listAmount: new FormControl(null),
    // });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addNewIngredient(newIngredient);
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
    // this.shoppingListForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onAddIngredient() {
    // const ingredientName = this.nameInput.nativeElement.value;
    // const ingredientAmount = this.amountInput.nativeElement.value;
    // const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    // this.shoppingListService.addNewIngredient(newIngredient);
  }

  onShoppingListForm() {
    // console.log(this.shoppingListForm);
    // console.log(this.shoppingListForm.value.listName);
    // const ingredientName = this.shoppingListForm.value.listName;
    // const ingredientAmount = this.shoppingListForm.value.listAmount;
    // const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    // this.shoppingListService.addNewIngredient(newIngredient);
  }
}
