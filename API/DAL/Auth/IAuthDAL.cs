using API.Database.Models;
using API.Models.APIResponse.Auth;

namespace API.DAL.Auth
{
    public interface IAuthDAL
    {
        User? GetUserByEmailPassword(string emailId, string password);

        bool UpdateRefreshToken(Guid uuid, string refreshToken);

        bool CheckRefreshTokenExists(Guid uuid, string refreshToken);
    }
}
