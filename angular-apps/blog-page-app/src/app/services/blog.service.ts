import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Blog } from '../models/blog.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) { }

  GetAllBlogs(): Observable<Blog[]> {
    return this.http.get<any>(`${environment.apiUrl}/data/data.json`)
      .pipe(
        map(res => {
          return res.data.blogs.map((blog: Blog) => {
            return {
              Id: blog.id,
              Title: blog.title,
              ImageUrl: blog.images_url,
              DescriptionShort: blog.description_short,
              Description: blog.description,
              CreatedBy: blog.created_by,
              CreatedDate: blog.created_date,
              Tags: blog.tags,
              CommentCount: blog.comments_count,
            }
          })
        })
      )
  }
}
