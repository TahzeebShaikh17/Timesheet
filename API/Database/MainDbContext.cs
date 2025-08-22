using API.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace API.Database
{
    public class MainDbContext : DbContext
    {
        public MainDbContext(DbContextOptions<MainDbContext> options)
        : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(u => u.UUID);
        }

        public DbSet<User> Users => Set<User>();
    }
}
