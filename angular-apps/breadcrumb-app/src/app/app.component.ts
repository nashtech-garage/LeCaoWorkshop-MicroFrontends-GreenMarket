import { BreadcrumbType } from './models/breadcrumb-enums.model';
import { Component } from '@angular/core';
import { NavigationGroupModel } from './models/navigation-group.model';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Category } from './models/category.model';
import { Product } from './models/product.model';
import { Blog } from './models/blog.model';

@Component({
  selector: 'app-breadcrumb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'breadcrumb-app';

  public imageServerUrl = environment.imageServerUrl;
  public commonApiUrl = environment.commonApiUrl;
  public isBlogDetail: boolean = false;

  public navigationGroup: NavigationGroupModel = {
    pageIndex: '',
    pageTitle: '',
    items: []
  };

  public navigations: Array<NavigationGroupModel> = [
    {
      pageIndex: '/shops',
      pageTitle: 'Organi Shop',
      items: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Shops',
          url: '/shops'
        }
      ]
    },
    {
      pageIndex: '/shop-detail',
      pageTitle: 'Product name',
      items: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Shop',
          url: '/shops'
        }
      ]
    },
    {
      pageIndex: '/blogs',
      pageTitle: 'Blog',
      items: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Blogs',
          url: '/blogs'
        }
      ]
    },
    {
      pageIndex: '/blog-detail',
      pageTitle: 'Blog',
      items: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'created by - created date - comment count',
          url: '#'
        }
      ]
    },
    {
      pageIndex: '/cart',
      pageTitle: 'Shopping Cart',
      items: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Shopping Cart',
          url: '#'
        }
      ]
    },
    {
      pageIndex: '/checkout',
      pageTitle: 'Checkout',
      items: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Checkout',
          url: '#'
        }
      ]
    },
    {
      pageIndex: '/contact',
      pageTitle: 'Contact Us',
      items: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Contact Us',
          url: '#'
        }
      ]
    }
  ]

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient){
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData(event.url);
      }});
  }

  ngOnInit() {

  }

  async loadData(url: string){
    const currentId = this.route.snapshot.queryParamMap.get('id')!;
    this.isBlogDetail = false;
    this.resetNavigationGroup();
    this.navigationGroup = this.getNavigationByPath(url)!;

    if(url.includes("shops?id=")) {
      this.navigationGroup = this.getNavigationByPath("/shops")!;
      await this.getBreadcrumbData(currentId, BreadcrumbType.Shop);
    }

    if(url.includes("/shop-detail?id=")){
      this.navigationGroup = this.getNavigationByPath("/shop-detail")!;
      await this.getBreadcrumbData(currentId, BreadcrumbType.ShopDetail);
    }

    if(url.includes("/blog-detail?id=")){
      this.isBlogDetail = true;
      this.navigationGroup = this.getNavigationByPath("/blog-detail")!;
      await this.getBreadcrumbData(currentId, BreadcrumbType.BlogDetail);
    }
  }

  async fetchProductData(id: string) {
    const productApiURL = `${this.commonApiUrl}api/Product?id=${id}`;
    var result: Product = {} as Product;
    await lastValueFrom(this.http.get<any>(productApiURL))
            .then((res) => {
              result = res;
            });
    return result;
  }

  async fetchCategoryData(id: string) {
    const categoryApiURL = `${this.commonApiUrl}api/Category?id=${id}`;
    var result: Category = {} as Category;
    await lastValueFrom(this.http.get<any>(categoryApiURL))
            .then((res) => {
              result = res;
            });
    return result;
  }

  async fetchBlogData(id: string) {
    const blogApiURL = `${this.commonApiUrl}api/Blog?id=${id}`;
    var result: Blog = {} as Blog;
    await lastValueFrom(this.http.get<any>(blogApiURL))
            .then((res) => {
              result = res;
            });
    return result;
  }

  async getBreadcrumbData(id: string, type: BreadcrumbType) {

    switch (type) {
      case BreadcrumbType.Shop:
        const data = await this.fetchCategoryData(id);
        this.navigationGroup.pageTitle = data.name;
        if(this.navigationGroup.items.length == 2) {
          this.navigationGroup.items[1].label = data.name;
        }
        break;

      case BreadcrumbType.ShopDetail:
        const product = await this.fetchProductData(id);
        const category = await this.fetchCategoryData(product.category_id.toString());

        this.navigationGroup.pageTitle = product.name;

        const secondItem = {
          label: category.name,
          url: `/shops`,
          queryParams: {id:category.id}
        };

        const lastItem = {
          label: product.name,
          url: `/shop-detail`,
          queryParams: {id:id}
        };

        if(this.navigationGroup.items.length == 2) {
          // update second item
          this.navigationGroup.items[1] = secondItem;

          // add last item is product
          this.navigationGroup.items.push(lastItem);
        }

        if(this.navigationGroup.items.length == 3) {
          // update second item
          this.navigationGroup.items[1] = secondItem;

          // update last item
          this.navigationGroup.items[2] = lastItem;
        }
        break;

      case BreadcrumbType.BlogDetail:
        const blog = await this.fetchBlogData(id);
        this.navigationGroup.pageTitle = blog.title;
        if(this.navigationGroup.items.length == 2) {
          this.navigationGroup.items = [];

          const listInfo = [
            `By ${blog.created_by}`,
            blog.created_date,
            `${blog.comments_count} Comments`
          ];

          listInfo.forEach(itemInfo => {
            this.navigationGroup.items.push({
              label: itemInfo,
              url: '#'
            });
          });
        }
        break;
    }
  }

  resetNavigationGroup() {
    this.navigationGroup = {
      pageIndex: '',
      pageTitle: '',
      items: []
    };
  }

  getNavigationByPath(path: string) {
    const items = this.navigations.filter(x => x.pageIndex == path)
    if(items && items.length == 1){
      return items[0]
    }

    return null;
  }
}
