 import { enableProdMode, NgZone } from '@angular/core';
 import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 
 import { singleSpaAngular } from 'single-spa-angular';
 
 import { environment } from './environments/environment';
 import { AppModule } from './app/app.module';
 import { singleSpaPropsSubject } from './single-spa/single-spa-props';
 import 'zone.js/dist/zone';

if (environment.production) {
  enableProdMode();
}

if (environment.production) {
   enableProdMode();
 }
 
 const lifecycles = singleSpaAngular({
   bootstrapFunction: singleSpaProps => {
     singleSpaPropsSubject.next(singleSpaProps);
     return platformBrowserDynamic().bootstrapModule(AppModule);
   },
   template: '<main-lasted-product-root />',
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount