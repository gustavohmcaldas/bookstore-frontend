import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {
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
    this.book.id = this.route.snapshot.paramMap.get("id")!;
    this.findById()
  }

  cancel(): void {
    this.router.navigate([`categories/${this.id_cat}/books`]);
  }

  findById(): void {
    this.service.findById(this.book.id!).subscribe((res) => {
      this.book = res
    })
  }

  update(): void {
    this.service.update(this.book).subscribe((res) => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message('Book updated successfully!')
    }, err => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message('Error updating book. Try later!')
    })
  }

  getMessage() {
    if (this.title.invalid) {
      return "Title must have be between 3 and 50 characters";
    }

    if (this.author.invalid) {
      return "Author name must have be between 3 and 50 characters";
    }

    if (this.description.invalid) {
      return "Description must have be between 10 and 1.000 characters";
    }

    return false;
  }
}
