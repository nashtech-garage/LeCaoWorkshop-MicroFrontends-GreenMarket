using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Order.Data.Models
{
    public class OrderDataRequest
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public string UserName { get; set; }

        public double Total { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Country { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Postcode { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string OrderNotes { get; set; }

        public List<OrderDetailDataRequest> OrderDetails { get; set; }
    }
}