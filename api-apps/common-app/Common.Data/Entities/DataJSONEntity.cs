using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Data.Entities
{
    public class DataJSONEntity
    {
        public List<CategoryEntity> categories { get; set; }
        public List<ProductEntity> products { get; set; }
        public List<BlogEntity> blogs { get; set; }
        public MainHeroBannerEntity mainHeroBanner { get; set; }
        public List<CouponEntity> coupon { get; set; }
    }
}