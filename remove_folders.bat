@ECHO OFF

ECHO Start remove folders

RMDIR /s /q root-config\dist
RMDIR /s /q root-config\node_modules

RMDIR /s /q angular-apps\breadcrumb-app\.angular
RMDIR /s /q angular-apps\breadcrumb-app\dist
RMDIR /s /q angular-apps\breadcrumb-app\node_modules

RMDIR /s /q angular-apps\checkout-app\.angular
RMDIR /s /q angular-apps\checkout-app\dist
RMDIR /s /q angular-apps\checkout-app\node_modules

RMDIR /s /q angular-apps\common-header-app\.angular
RMDIR /s /q angular-apps\common-header-app\dist
RMDIR /s /q angular-apps\common-header-app\node_modules

RMDIR /s /q angular-apps\contact-form-app\.angular
RMDIR /s /q angular-apps\contact-form-app\dist
RMDIR /s /q angular-apps\contact-form-app\node_modules

RMDIR /s /q angular-apps\main-categories-app\.angular
RMDIR /s /q angular-apps\main-categories-app\dist
RMDIR /s /q angular-apps\main-categories-app\node_modules

RMDIR /s /q angular-apps\main-lasted-product-app\.angular
RMDIR /s /q angular-apps\main-lasted-product-app\dist
RMDIR /s /q angular-apps\main-lasted-product-app\node_modules

RMDIR /s /q angular-apps\shopping-cart-page-app\.angular
RMDIR /s /q angular-apps\shopping-cart-page-app\dist
RMDIR /s /q angular-apps\shopping-cart-page-app\node_modules

RMDIR /s /q angular-apps\blog-page-app\.angular
RMDIR /s /q angular-apps\blog-page-app\dist
RMDIR /s /q angular-apps\blog-page-app\node_modules



RMDIR /s /q react-apps\common-contact-app\dist
RMDIR /s /q react-apps\common-contact-app\node_modules

RMDIR /s /q react-apps\common-footer-app\dist
RMDIR /s /q react-apps\common-footer-app\node_modules

RMDIR /s /q react-apps\common-hero-search-app\dist
RMDIR /s /q react-apps\common-hero-search-app\node_modules

RMDIR /s /q react-apps\main-featured-product-app\dist
RMDIR /s /q react-apps\main-featured-product-app\node_modules

RMDIR /s /q react-apps\react-blog-detail-page-blog-info-app\dist
RMDIR /s /q react-apps\react-blog-detail-page-blog-info-app\node_modules

RMDIR /s /q react-apps\react-main-page-hero-banner-app\dist
RMDIR /s /q react-apps\react-main-page-hero-banner-app\node_modules

RMDIR /s /q react-apps\react-shop-page-product-detail-app\dist
RMDIR /s /q react-apps\react-shop-page-product-detail-app\node_modules



RMDIR /s /q vue-apps\contact-map-app\dist
RMDIR /s /q vue-apps\contact-map-app\node_modules

RMDIR /s /q vue-apps\mainpage-blog-app\dist
RMDIR /s /q vue-apps\mainpage-blog-app\node_modules

RMDIR /s /q vue-apps\related-item-app\dist
RMDIR /s /q vue-apps\related-item-app\node_modules

RMDIR /s /q vue-apps\vue-shop-page-products-grid-app\dist
RMDIR /s /q vue-apps\vue-shop-page-products-grid-app\node_modules

ECHO Remove successfully!
