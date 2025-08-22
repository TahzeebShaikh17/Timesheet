using API.DAL.Auth;
using API.Database;
using API.Helpers.Auth;
using API.Models.APIResponse.Auth;
using API.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        private readonly JwtTokenHelper _jwtTokenHelper;

        private readonly IAuthDAL _iAuthDal;

        public AuthController(IConfiguration config, JwtTokenHelper jwtTokenHelper, IAuthDAL iAuthDal)
        {
            _config = config;
            _jwtTokenHelper = jwtTokenHelper;
            _iAuthDal = iAuthDal;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginModel login)
        {
            var user = _iAuthDal.GetUserByEmailPassword(login.Username, login.Password);

            if (user != null)
            {
                var accessToken = _jwtTokenHelper.GenerateAccessToken(user.UUID);
                var refreshToken = _jwtTokenHelper.GenerateRefreshToken(user.UUID);

                Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(1)
                });

                bool resp = _iAuthDal.UpdateRefreshToken(user.UUID, refreshToken);

                return Ok(new LoginRespModel(accessToken, user));
            }

            return UnprocessableEntity(new BaseRespModel(false, "Invalid Credentials"));
        }

        [HttpPost("token/refresh")]
        [AllowAnonymous]
        public IActionResult RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (refreshToken == null)
                return UnprocessableEntity(new BaseRespModel(false, "Refresh Token Invalid or Expired"));

            var (isValid, refreshUUID) = _jwtTokenHelper.ValidateRefreshToken(refreshToken);

            if (!isValid || refreshUUID == null)
                return UnprocessableEntity(new BaseRespModel(false, "Refresh Token Invalid or Expired"));

            var exists = _iAuthDal.CheckRefreshTokenExists(Guid.Parse(refreshUUID), refreshToken);

            if (!exists)
                return UnprocessableEntity(new BaseRespModel(false, "Refresh Token Invalid or Expired"));

            var accessToken = _jwtTokenHelper.GenerateAccessToken(Guid.Parse(refreshUUID));

            return Ok(new LoginRespModel(accessToken));
        }

        [HttpPost("logout")]
        [AllowAnonymous]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("refreshToken");
            return Ok();
        }
    }
}
