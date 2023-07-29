using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Data.Entities
{
    public class ProductEntity
    {
        public int id { get; set; }
        public string name { get; set; }
        public double price { get; set; }
        public int category_id { get; set; }
        public double weight { get; set; }
        public string description_short { get; set; }
        public string description { get; set; }
        public string information { get; set; }
        public string color { get; set; }
        public double discount { get; set; }
        public bool availability { get; set; }
        public string main_image_url { get; set; }
        [NotMapped]
        public List<string> images_urls { get; set; }
        public string images_urls_string { get; set; }
        public bool is_featured { get; set; }
        public int count { get; set; }
        public bool is_latest { get; set; }
        public int review_count { get; set; }
        public bool is_review { get; set; }
        public bool is_top_rate { get; set; }
    }
}