using API.Database;
using API.Database.Models;
using API.Models.APIResponse.Auth;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Data;

namespace API.DAL.Auth
{
    public class AuthDAL : IAuthDAL
    {
        private readonly MainDbContext _mainDbContext;

        public AuthDAL(MainDbContext mainDbContext)
        {
            this._mainDbContext = mainDbContext;
        }

        public User? GetUserByEmailPassword(string emailId, string password)
        {
            var users = _mainDbContext.Users
                .FromSqlInterpolated($"SELECT * FROM fn_get_user_by_email_password({emailId}, {password})")
                .AsNoTracking()
                .ToList();

            return users.FirstOrDefault();
        }

        public bool UpdateRefreshToken(Guid uuid, string refreshToken)
        {
            using var conn = (NpgsqlConnection)_mainDbContext.Database.GetDbConnection();
            conn.Open();

            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT fn_update_refresh_token(@ip_uuid, @ip_refresh_token)";
            cmd.CommandType = CommandType.Text;

            cmd.Parameters.Add(new NpgsqlParameter("@ip_uuid", NpgsqlTypes.NpgsqlDbType.Uuid) { Value = uuid });
            cmd.Parameters.Add(new NpgsqlParameter("@ip_refresh_token", NpgsqlTypes.NpgsqlDbType.Text) { Value = refreshToken });

            var result = cmd.ExecuteScalar();
            return result != null && Convert.ToBoolean(result);
        }

        public bool CheckRefreshTokenExists(Guid uuid, string refreshToken)
        {
            using var conn = (NpgsqlConnection)_mainDbContext.Database.GetDbConnection();
            conn.Open();

            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT fn_check_refresh_token_exists(@ip_uuid, @ip_refresh_token)";
            cmd.CommandType = CommandType.Text;

            cmd.Parameters.Add(new NpgsqlParameter("@ip_uuid", NpgsqlTypes.NpgsqlDbType.Uuid) { Value = uuid });
            cmd.Parameters.Add(new NpgsqlParameter("@ip_refresh_token", NpgsqlTypes.NpgsqlDbType.Text) { Value = refreshToken });

            var result = cmd.ExecuteScalar();
            return result != null && Convert.ToBoolean(result);
        }
    }
}
