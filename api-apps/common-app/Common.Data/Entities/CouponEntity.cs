using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Data.Entities
{
    public class CouponEntity
    {
        public string code { get; set; }
        public string description { get; set; }
        public string discount_amount { get; set; }
        public string unit { get; set; }
        public bool is_expired { get; set; }
    }
}