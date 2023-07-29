using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Order.Data.Models
{
    public class OrderDetailData
    {
        public string Id { get; set; }

        [ForeignKey("PaymentFileImport")]
        public string OrderDataId { get; set; }

        [JsonIgnore]
        public virtual OrderData OrderData { get; set; }

        public int ProductId { get; set; }

        public double Price { get; set; }

        public double PriceOriginal { get; set; }

        public int Quantity { get; set; }

        public string ProductName { get; set; }
    }
}