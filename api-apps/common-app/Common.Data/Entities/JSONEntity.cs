using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Data.Entities
{
    public class JSONEntity
    {
        public string name { get; set; }
        public string version { get; set; }
        public DataJSONEntity data { get; set; }
    }
}