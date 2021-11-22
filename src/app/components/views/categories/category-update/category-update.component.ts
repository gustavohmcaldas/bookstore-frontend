import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

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
      for(let i = 0; i < err.error.errors.length; i++) {
        this.service.message(err.error.errors[i].message)
      }
    });
  }

  cancel(): void {
    this.router.navigate(['categories'])
  }
}
