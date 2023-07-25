using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ApiApp.Infratructure.Entities.JSON
{
    public class JSONEntity
    {
        public string name { get; set; }
        public string version { get; set; }
        public DataJSONEntity data { get; set; }
    }
}