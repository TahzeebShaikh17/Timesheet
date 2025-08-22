using API.DAL.Auth;
using API.Database;
using API.Helpers.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var jwtConfig = builder.Configuration.GetSection("Jwt");
            var jwtKey = Encoding.ASCII.GetBytes(jwtConfig["AccessKey"]!);

            var webBaseURL = builder.Configuration.GetValue<string>("URLs:WEBBaseURL")!;

            // Add services to the container.

            builder.Services.AddDbContext<MainDbContext>(options =>
                options.UseNpgsql(
                    builder.Configuration.GetConnectionString("DefaultConnection")
                )
            );


            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtConfig["Issuer"],
                    ValidAudience = jwtConfig["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(jwtKey)
                };
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowWEB", builder =>
                {
                    builder.WithOrigins(webBaseURL)
                           .AllowAnyHeader()
                           .AllowCredentials()
                           .WithMethods("GET", "POST", "PUT", "DELETE");
                });
            });

            builder.Services.AddScoped<JwtTokenHelper>();
            builder.Services.AddScoped<IAuthDAL, AuthDAL>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
