import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {
  id_cat: String = "";

  book: Book = {
    id: "",
    title: "",
    author: "",
    description: "",
  };

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

  delete():void {
    this.service.delete(this.book.id!).subscribe(() => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message('Book deleted successfully!')
    }, err => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message('Error updating book. Try later!')
    })
  }
}
