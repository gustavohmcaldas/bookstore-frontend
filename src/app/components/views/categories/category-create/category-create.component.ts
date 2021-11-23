import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../category.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category: Category = {
    name: '',
    description: ''
  }

  name = new FormControl("", [Validators.minLength(3)]);
  description = new FormControl("", [Validators.minLength(3)]);

  constructor(
    private service: CategoryService, 
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.category).subscribe((res) => {
      this.router.navigate(['categories'])
      this.service.message('Category created successfully!');
    }, err => {
      this.router.navigate(['categories']);
      this.service.message("Error creating new book. Try later!");
    });
  }

  cancel(): void {
    this.router.navigate(['categories'])
  }

  getNameMessage() {
    return "Name must be between 3 and 50 characters";
  }

  getDescriptionMessage() {
      return "Description must be between 3 and 200 characters";
  }

  isFormInvalid() {
    return this.name.invalid || this.description.invalid
  }
}
