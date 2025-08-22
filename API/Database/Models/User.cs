using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Database.Models
{
    [Table("users")]
    public class User
    {
        [Column("uuid")]
        [JsonPropertyName("uuid")]
        public Guid UUID { get; set; }

        [Column("email_id")]
        [JsonPropertyName("email_id")]
        public required string EmailId { get; set; }

        [Column("full_name")]
        [JsonPropertyName("full_name")]
        public required string FullName { get; set; }
    }
}
