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
  filterBlogs: any[] = [];
  recentBlogs: any[] = [];
  categories: Category[] = [];
  searchValue: string = '';

  constructor(
    private blogService: BlogService
  ) { };

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.blogService.GetAllBlogs().subscribe((data) => {
      this.blogs = data;
      this.filterBlogs = data;
      this.recentBlogs = data.slice(0, 3);

      let categoryNames: string[] = [];
      this.blogs.forEach(x => {
        categoryNames.push(...x.Tags.split(','));
      });

      categoryNames.map(s => s.trim());
      categoryNames = [...new Set(categoryNames)];

      categoryNames.forEach(x=> {
        this.categories.push(
          {
            categoryName: x,
            count: this.blogs.filter(y => y.Tags.includes(x)).length
          }
        );
      });

      this.categories.unshift({
        categoryName: "All",
        count: 0
      });
    })
  }

  onSearch() {
    this.filterBlogs = this.blogs.filter(x => x.Title.includes(this.searchValue) || x.Tags.includes(this.searchValue));
  }

  searchByCategory(name: string) {
    if (name == "All") {
      this.filterBlogs = this.blogs;
    }else{
      this.filterBlogs = this.blogs.filter(x => x.Tags.includes(name));
    }
  }
}
