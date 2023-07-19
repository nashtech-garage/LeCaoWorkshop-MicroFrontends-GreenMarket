import { Component, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';
import { Category } from './models/category.model';

@Component({
  selector: 'blog-page-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  blogs: any[] = [];
  categories: Category[] = [];

  constructor(
    private blogService: BlogService
  ) { };

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.blogService.GetAllBlogs().subscribe((data) => {
      this.blogs = data;
      let tags = [...new Set(this.blogs.map(category => category.Tags))];
      tags.forEach(element => {
        tags = element.split(',').map((item: string) => item.trim());
      });
      tags.forEach(element => {
        const countByTag = this.blogs.filter(x => x.Tags.includes(element)).length;
        this.categories.push({categoryName: element, count: countByTag});
      })
    })
  }

  onSearch(event: any) {
    this.blogs = this.blogs.filter(x => x.Title.includes(event.target.value));
  }

  searchByCategory(event: any) {
    this.blogs = this.blogs.filter(x => x.Tags.includes(event.target.value));
  }
}
