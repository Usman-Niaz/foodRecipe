import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FirebaseService } from '../firebase.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    TextareaModule,
    DropdownModule,
    FileUploadModule,
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  selectedImage: string | ArrayBuffer | null = null;
  recipeForm!: FormGroup;
  selectedCategory: any;
  imageError = false;
  submitting = false;
  foodOptions = [
    { name: 'Breakfast' },
    { name: 'Lunch' },
    { name: 'Dinner' },
    { name: 'Snacks' },
    { name: 'Desserts' },
  ];

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private firebaseService: FirebaseService 
  ) {
    this.createForm();
  }

  // ✅ Create Reactive Form
  createForm() {
    this.recipeForm = this.fb.group({
      selectedCategory: [null, Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      ingredients: ['', [Validators.required, Validators.minLength(10)]],
      recpe: ['', [Validators.required, Validators.minLength(10)]],
      image: [null], // Validators.required manually handle hoga
    });
  }

  // ✅ Translate dropdown options
  getTranslatedFoodOptions() {
    return this.foodOptions.map((option) => {
      return {
        ...option,
        name: this.translate.instant('foodOptions.' + option.name),
      };
    });
  }

  // ✅ Handle Image Upload
  handleImageSelect(event: any): void {
    const file: File = event.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedImage = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
      this.recipeForm.get('image')?.setValue(file); // Set in form
      this.imageError = false;
    }
  }

  submitRecipeForm() {
    if (!this.recipeForm.get('image')?.value) {
      this.imageError = true;
    }
  
    if (this.recipeForm.valid && !this.imageError) {
      this.submitting = true; // ✅ Disable button during submission
  
      const formValue = this.recipeForm.value;
  
      const recipe: Recipe = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.selectedCategory.name,
        ingredients: formValue.ingredients,
        recpe: formValue.recpe,
        image: typeof this.selectedImage === 'string' ? this.selectedImage : ''
      };
  
      this.firebaseService.addRecipe(recipe)
        .then(() => {
          this.showSuccessToast();
          this.recipeForm.reset();
          this.selectedImage = null;
          this.imageError = false;
          this.submitting = false; // ✅ Enable button again
        })
        .catch((error) => {
          this.showErrorToast();
          console.error('🔥 Firebase Error:', error);
          this.submitting = false; // ✅ Even on error, enable button
        });
  
    } else {
      this.recipeForm.markAllAsTouched();
      this.showErrorToast();
    }
  }
  
  

  showSuccessToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Recipe added successfully!',
      life: 5000,
    });
  }

  showErrorToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please fill out all required fields correctly',
      life: 5000,
    });
  }
}
