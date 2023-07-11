using IdentityModel;
using IdentityServer.Core.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer.Core.Constants;
using IdentityServer.Data.Models;

namespace IdentityServer.Core.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IIdentityServerInteractionService _interaction;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IIdentityServerInteractionService interaction)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _interaction = interaction;
        }

        [HttpGet]
        public IActionResult Login(string returnUrl)
        {
            var vm = new LoginViewModel()
            {
                ReturnUrl = returnUrl
            };

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            // check if we are in the context of an authorization request
            var context = await _interaction.GetAuthorizationContextAsync(model.ReturnUrl);

            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberLogin, lockoutOnFailure: true);

                if (result.Succeeded)
                {
                    if (context != null)
                    {
                        // we can trust model.ReturnUrl since GetAuthorizationContextAsync returned non-null
                        return Redirect(model.ReturnUrl);
                    }

                    // request for a local page
                    if (Url.IsLocalUrl(model.ReturnUrl))
                    {
                        return Redirect(model.ReturnUrl);
                    }
                    else if (string.IsNullOrEmpty(model.ReturnUrl))
                    {
                        return Redirect("~/");
                    }
                    else
                    {
                        // user might have clicked on a malicious link - should be logged
                        throw new Exception("invalid return URL");
                    }
                }

                ModelState.AddModelError(string.Empty, "Invalid credentials");
            }

            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            if (User?.Identity.IsAuthenticated == true)
            {
                // delete local authentication cookie
                await _signInManager.SignOutAsync();
            }

            var logout = await _interaction.GetLogoutContextAsync(logoutId);

            return Redirect(logout.PostLogoutRedirectUri);
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [Route("api/[controller]")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestViewModel model)
        {
            //var aVal = 0; var blowUp = 1 / aVal;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser { UserName = model.Email, Name = model.Name, Email = model.Email };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("userName", user.UserName));
            await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("name", user.Name));
            await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("email", user.Email));
            await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("role", Roles.Consumer));

            return Ok(new RegisterResponseViewModel(user));
        }

        // [HttpPost]
        // public async Task<IActionResult> Register(RegisterViewModel model)
        // {
        //     var user = new ApplicationUser
        //     {
        //         UserName = model.Email,
        //         Email = model.Email,
        //         EmailConfirmed = true,
        //     };

        //     var result = await _userManager.CreateAsync(user, model.Password);

        //     if (!result.Succeeded)
        //     {
        //         throw new Exception(result.Errors.First().Description);
        //     }

        //     result = await _userManager.AddClaimsAsync(user, new Claim[]{
        //                     new Claim(JwtClaimTypes.Email, model.Email)
        //                 });

        //     if (!result.Succeeded)
        //     {
        //         throw new Exception(result.Errors.First().Description);
        //     }

        //     return View("RegistrationSuccess");
        // }
    }
}
