using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}