using Microsoft.EntityFrameworkCore;
using MoviesApp.Domain.Entities;

namespace MoviesApp.Infrastructure.Persistence;

public class MoviesAppDbContext : DbContext
{
    public MoviesAppDbContext(DbContextOptions<MoviesAppDbContext> options) : base(options) { }

    public DbSet<Movie> Movies => Set<Movie>();
    public DbSet<StreamingSite> StreamingSites => Set<StreamingSite>();
    public DbSet<MovieStreamingSite> MovieStreamingSites => Set<MovieStreamingSite>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Movie>()
            .Property(x => x.Score)
            .HasPrecision(3, 1);

        modelBuilder.Entity<MovieStreamingSite>()
            .HasIndex(x => new { x.MovieId, x.StreamingSiteId })
            .IsUnique();
         
        modelBuilder.Entity<MovieStreamingSite>()
            .HasOne(ms => ms.Movie)
            .WithMany(m => m.MovieStreamingSites)
            .HasForeignKey(ms => ms.MovieId);

        modelBuilder.Entity<MovieStreamingSite>()
            .HasOne(ms => ms.StreamingSite)
            .WithMany(s => s.MovieStreamingSites)
            .HasForeignKey(ms => ms.StreamingSiteId);
    }
}