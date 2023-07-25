using System.Net.NetworkInformation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace ApiApp.Infratructure.Entities.JSON
{
    public class CategoryJSONEntity
    {
        public int id { get; set; }
        public string name { get; set; }
        public string image_url { get; set; }
    }
}