import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  category: Category = {
    id: "",
    name: "",
    description: "",
  };

  name = new FormControl("", [Validators.minLength(3)]);
  description = new FormControl("", [Validators.minLength(3)]);

  constructor(
    private service: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.category.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.category.id!).subscribe((res) => {
      this.category.name = res.name;
      this.category.description = res.description;
    });
  }

  update(): void {
    this.service.update(this.category).subscribe((res) => {
      this.router.navigate(["categories"]);
      this.service.message("Category updated successfully!");
    }, err => {
      this.router.navigate(['categories']);
      this.service.message("Error updating category. Try later!");
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
