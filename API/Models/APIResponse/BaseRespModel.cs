using System.Text.Json.Serialization;

namespace API.Models.APIResponse.Auth
{
    public class BaseRespModel
    {
        public BaseRespModel()
        {
            Response = new ResponseModel();
        }

        public BaseRespModel(bool isSuccess, string message)
        {
            Response = new ResponseModel(isSuccess, message);
        }

        [JsonPropertyName("response")]
        public ResponseModel Response { get; set; }
    }

    public class ResponseModel
    {
        public ResponseModel()
        {
            IsSuccess = true;
            Message = string.Empty;
        }

        public ResponseModel(bool isSuccess, string message)
        {
            this.IsSuccess = isSuccess;
            this.Message = message;
        }

        [JsonPropertyName("is_success")]
        public bool IsSuccess { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }
    }
}
