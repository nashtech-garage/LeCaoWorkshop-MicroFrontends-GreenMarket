import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Blog } from './models/blog.model';
import { BlogService } from './services/blog.service';

@Component({
  selector: 'blog-page-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blog-page-app';
  blogs: any[] = [];
  categories: string[] = [];

  constructor(
    private readonly http: HttpClient,
    private blogService: BlogService
  ) { };

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.blogService.GetAllBlogs().subscribe((data) => {
      this.blogs = data;
      const tags = [...new Set(this.blogs.map(category => category.Tags))];
      tags.forEach(element => {
        this.categories = element.split(',').map((item: string) => item.trim())
      })
    })
  }

  onSearch(event: any) {
    this.blogs.filter(x => x.Title == event.target.value);
  }

  searchByCategory(category: string) {
    this.blogs.filter(x => x.Tags.contain(category));
  }
}
