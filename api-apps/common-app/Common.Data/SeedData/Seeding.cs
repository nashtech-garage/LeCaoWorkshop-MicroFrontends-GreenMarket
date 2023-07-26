using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Data.Entities;
using Newtonsoft.Json;
using Microsoft.Extensions.DependencyInjection;

namespace Common.Data.SeedData
{
    public class Seeding
    {
        public static void SeedData(string jsonData, IServiceProvider serviceProvider)
        {
            JSONEntity jsonEntity = JsonConvert.DeserializeObject<JSONEntity>(jsonData);
            Console.WriteLine(jsonEntity.name);
            Console.WriteLine(jsonEntity.version);

            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<CommonDbContext>();

                Console.WriteLine("=== Categories ===");
                foreach (var category in jsonEntity.data.categories)
                {
                    Console.WriteLine($"{category.id} - {category.name} - {category.image_url}");
                    var categoryItem = context.categories.SingleOrDefault(c => c.id == category.id);
                    if (categoryItem == null)
                    {
                        context.categories.Add(category);
                    }
                }

                Console.WriteLine("=== Products ===");
                foreach (var product in jsonEntity.data.products)
                {
                    Console.WriteLine($"{product.id} - {product.name} - {product.price}");
                    var productItem = context.products.SingleOrDefault(c => c.id == product.id);
                    if (productItem == null)
                    {
                        product.images_urls_string = string.Join(",", product.images_urls);
                        context.products.Add(product);
                    }
                }

                Console.WriteLine("=== Blogs ===");
                foreach (var blog in jsonEntity.data.blogs)
                {
                    Console.WriteLine($"{blog.id} - {blog.title} - {blog.images_url}");
                    var blogItem = context.blogs.SingleOrDefault(c => c.id == blog.id);
                    if (blogItem == null)
                    {
                        context.blogs.Add(blog);
                    }
                }

                Console.WriteLine("=== MainHeroBannerEntity ===");
                var mainHeroBannerItem = context.mainHeroBannerEntity.SingleOrDefault(c => c.Title == jsonEntity.data.mainHeroBanner.Title);
                if (mainHeroBannerItem == null)
                {
                    context.mainHeroBannerEntity.Add(jsonEntity.data.mainHeroBanner);
                }

                Console.WriteLine("=== Coupon ===");
                foreach (var coupon in jsonEntity.data.coupon)
                {
                    Console.WriteLine($"{coupon.code} - {coupon.description} - {coupon.discount_amount}");
                    var couponItem = context.coupons.SingleOrDefault(c => c.code == coupon.code);
                    if (couponItem == null)
                    {
                        context.coupons.Add(coupon);
                    }
                }

                context.SaveChanges();
            }
        }
    }
}