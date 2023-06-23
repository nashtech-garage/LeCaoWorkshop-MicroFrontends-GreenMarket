import { Component } from '@angular/core';
import { NavigationItemModel } from './models/navigation-item.model';
import { NavigationGroupModel } from './models/navigation-group.model';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'breadcrumb-app';
  public navigationGroup: NavigationGroupModel = {
    pageIndex: '',
    pageTitle: '',
    items: []
  }
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
          label: 'Shop',
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
        console.log(event.url);
        this.loadData(event)
      }});
  }

  ngOnInit() {
    // this.loadData()
  }

  loadData(event:NavigationEnd){
    const path = window.location.pathname
    const items = this.navigations.filter(x => x.pageIndex == path)

    if(items && items.length == 1){
      this.navigationGroup = items[0]
    }

    if(path == '/shop-detail'){
      const productId = this.route.snapshot.queryParamMap.get('id')
      this.getData(productId!)
    }
  }

  getData(productId:string){
    const apiData = `${environment.apiUrl}data/data.json`;
    const http$ = this.http.get<any>(apiData);

    http$.subscribe({
      next: (res) => {
        const { products } = res.data
        const product = this.getProductById(productId, products)

        this.navigationGroup.pageTitle = product.name
        if(this.navigationGroup.items.length == 2){
          this.navigationGroup.items.push({
            label: product.name,
            url: '/shop-detail',
            queryParams: {id:productId}
          })
        }else{
          this.navigationGroup.items[2] = {
            label: product.name,
            url: '/shop-detail',
            queryParams: {id:productId}
          }
        }
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }

  getProductById(id:string, data:Array<any>){
    const product = data.filter(x => x.id == id)
    if(!product || product.length === 0){
      throw new TypeError("Product not found ")
    }
    return product[0]
  }

}
