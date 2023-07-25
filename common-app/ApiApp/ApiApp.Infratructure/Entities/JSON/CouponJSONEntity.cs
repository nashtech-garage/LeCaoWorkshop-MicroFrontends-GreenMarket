using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiApp.Infratructure.Entities.JSON
{
    public class CouponJSONEntity
    {
        public string code { get; set; }
        public string description { get; set; }
        public string discount_amount { get; set; }
        public string unit { get; set; }
        public bool is_expired { get; set; }
    }
}