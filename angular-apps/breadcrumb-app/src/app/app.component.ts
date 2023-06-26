import { BreadcrumbType } from './models/breadcrumb-enums.model';
import { Component } from '@angular/core';
import { NavigationGroupModel } from './models/navigation-group.model';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-breadcrumb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'breadcrumb-app';

  private categoryData = [];
  private productData = [];
  private blogData = [];

  public apiUrl = environment.apiUrl;
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
        this.loadData(event.url)
      }});
  }

  ngOnInit() {

  }

  async loadData(url: string){
    if (this.categoryData.length == 0 || this.productData.length == 0 || this.blogData.length == 0) {
      await this.fetchData(url);
    }

    const currentId = this.route.snapshot.queryParamMap.get('id')!;
    this.isBlogDetail = false;
    this.resetNavigationGroup();
    this.navigationGroup = this.getNavigationByPath(url)!;

    if(url.includes("shops?id=")) {
      this.navigationGroup = this.getNavigationByPath("/shops")!;
      this.getBreadcrumbData(currentId, BreadcrumbType.Shop);
    }

    if(url.includes("/shop-detail?id=")){
      this.navigationGroup = this.getNavigationByPath("/shop-detail")!;
      this.getBreadcrumbData(currentId, BreadcrumbType.ShopDetail);
    }

    if(url.includes("/blog-detail?id=")){
      this.isBlogDetail = true;
      this.navigationGroup = this.getNavigationByPath("/blog-detail")!;
      this.getBreadcrumbData(currentId, BreadcrumbType.BlogDetail);
    }
  }

  async fetchData(url: string) {
    const apiData = `${this.apiUrl}data/data.json`;

    await lastValueFrom(this.http.get<any>(apiData))
            .then((res) => {
              const { categories, products, blogs } = res.data;

              this.categoryData = categories;
              this.productData = products;
              this.blogData = blogs;
            });
  }

  getBreadcrumbData(id: string, type: BreadcrumbType) {

    switch (type) {
      case BreadcrumbType.Shop:
        const data = this.getDataById(id, this.categoryData);
        this.navigationGroup.pageTitle = data.name;
        if(this.navigationGroup.items.length == 2) {
          this.navigationGroup.items[1].label = data.name;
        }
        break;

      case BreadcrumbType.ShopDetail:
        const product = this.getDataById(id, this.productData);
        const category = this.getDataById(product.category_id, this.categoryData);

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
        const blog = this.getDataById(id, this.blogData);
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

  getDataById(id:string, data:Array<any>) {
    const result = data.filter(x => x.id == id);
    if(!result || result.length === 0){
      throw new TypeError("Item not found!");
    }

    return result[0];
  }
}
