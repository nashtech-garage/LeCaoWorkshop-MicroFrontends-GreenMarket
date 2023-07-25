using ApiApp.Infratructure.Entities;
using ApiApp.Infratructure.Entities.JSON;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiApp.Infratructure.SeedData
{
    public class Seeding
    {
        public static void SeedData(string jsonData)
        {
            // JsonSerializerSettings settings = new JsonSerializerSettings
            // {
            //     ContractResolver = new PrivateSetterContractResolver()
            // };
            JSONEntity jsonEntity = JsonConvert.DeserializeObject<JSONEntity>(jsonData);
            Console.WriteLine(jsonEntity.name);
            Console.WriteLine(jsonEntity.version);

            Console.WriteLine("=== Categories ===");
            foreach (var category in jsonEntity.data.categories)
            {
                Console.WriteLine($"{category.Id} - {category.Name} - {category.Image_Url}");
            }

            Console.WriteLine("=== Products ===");
            foreach (var product in jsonEntity.data.products)
            {
                Console.WriteLine($"{product.id} - {product.name} - {product.price}");
                foreach (var image in product.images_urls)
                {
                    Console.WriteLine(image);
                }
            }

            Console.WriteLine("=== Blogs ===");
            foreach (var blog in jsonEntity.data.blogs)
            {
                Console.WriteLine($"{blog.id} - {blog.title} - {blog.images_url}");
            }

            Console.WriteLine("=== MainHeroBanner ===");
            var mainHeroBanner = jsonEntity.data.mainHeroBanner;
            Console.WriteLine($"{mainHeroBanner.CategoryName} - {mainHeroBanner.Title} - {mainHeroBanner.Content} - {mainHeroBanner.ImageLink}");

            Console.WriteLine("=== Coupon ===");
            foreach (var coupon in jsonEntity.data.coupon)
            {
                Console.WriteLine($"{coupon.code} - {coupon.description} - {coupon.discount_amount}- {coupon.unit}");
            }

            // Console.WriteLine(JsonConvert.SerializeObject(jsonData));
            // using (
            //  var serviceScope = serviceProvider
            //    .GetRequiredService<IServiceScopeFactory>().CreateScope())
            // {
            //     var context = serviceScope
            //                   .ServiceProvider.GetService<Context>();
            //     if (!context.customers.Any())
            //     {
            //         context.AddRange(customer);
            //         context.SaveChanges();
            //     }
            // }
        }
    }
}