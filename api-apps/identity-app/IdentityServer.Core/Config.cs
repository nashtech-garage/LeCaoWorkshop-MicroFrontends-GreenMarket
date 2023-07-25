using System.Collections.Generic;
using IdentityServer4.Models;

namespace IdentityServer.Core
{
    public class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApiResources =>
            new ApiResource[]
            {
                // new ApiResource("orderAPI", "Order API")
            };

        public static IEnumerable<ApiScope> GetScopes =>
           new ApiScope[]
           {
               new ApiScope("orderAPI", "Order API")
           };

        public static IEnumerable<Client> GetClients =>
            new Client[]
            {
                new Client
                {
                    RequireConsent = false,
                    ClientId = "orderClient",
                    ClientName = "Order Client",
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AllowedScopes = { "orderAPI" },
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenLifetime = 3600,
                }
            };
    }
}