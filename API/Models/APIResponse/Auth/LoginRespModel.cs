using API.Database.Models;
using System.Text.Json.Serialization;

namespace API.Models.APIResponse.Auth
{
    public class LoginRespModel
    {
        public LoginRespModel(string accessToken, User? userData = null)
        {
            Response = new ResponseModel();
            AccessToken = accessToken;
            UserData = userData;
        }

        [JsonPropertyName("response")]
        public ResponseModel Response { get; set; }

        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }

        [JsonPropertyName("user_data")]
        public User? UserData { get; set; }
    }
}
