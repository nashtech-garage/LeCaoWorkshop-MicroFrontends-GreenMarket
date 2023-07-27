using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Data.Entities
{
    public class BlogEntity
    {
        public int id { get; set; }
        public string title { get; set; }
        public string images_url { get; set; }
        public string description_short { get; set; }
        public string description { get; set; }
        public string created_by { get; set; }
        public string created_date { get; set; }
        public string tags { get; set; }
        public string comments_count { get; set; }
    }
}