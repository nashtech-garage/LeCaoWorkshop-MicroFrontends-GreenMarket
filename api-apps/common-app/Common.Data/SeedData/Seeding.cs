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
                    var categoryItem = context.Categories.SingleOrDefault(c => c.id == category.id);
                    if (categoryItem == null)
                    {
                        context.Categories.Add(category);
                    }
                }

                context.SaveChanges();
            }
        }
    }
}