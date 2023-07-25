using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Order.Data.Models
{
    public class OrderDetailDataRequest
    {
        public int ProductId { get; set; }

        public double Price { get; set; }

        public double PriceOriginal { get; set; }

        public int Quantity { get; set; }

        public string ProductName { get; set; }
    }
}