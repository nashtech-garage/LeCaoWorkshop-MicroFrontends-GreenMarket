using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ApiApp.Infratructure.Entities.JSON
{
    public class DataJSONEntity
    {
        // [JsonPropertyName("categories")]
        public List<CategoryJSONEntity> categories { get; set; }
        public List<ProductJSONEntity> products { get; set; }
        public List<BlogJSONEntity> blogs { get; set; }
        public MainHeroBannerJSONEntity mainHeroBanner { get; set; }
        public List<CouponJSONEntity> coupon { get; set; }
    }
}