import { Book } from './../book.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  id_cat: String = "";

  book: Book = {
    id: "",
    title: "",
    author: "",
    description: "",
  };

  title = new FormControl("", [Validators.minLength(3)]);
  author = new FormControl("", [Validators.minLength(3)]);
  description = new FormControl("", [Validators.minLength(10)]);

  constructor(
    private service: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
  }

  create(): void {
    this.service.create(this.book, this.id_cat).subscribe((res) => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message("Book created successfully!");
    }, err => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message("Error creating new book. Try later!");
    });
  }

  cancel(): void {
    this.router.navigate([`categories/${this.id_cat}/books`]);
  }

  getTitleMessage() {
      return "Title must be between 3 and 100 characters";
  }

  getAuthorMessage() {
      return "Author name must be between 3 and 100 characters";
  }

  getDescriptionMessage() {
      return "Description must be between 10 and 2.000.000 characters";
  }

  isFormInvalid() {
    return this.title.invalid || this.author.invalid || this.description.invalid
  }
}
