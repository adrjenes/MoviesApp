using Microsoft.EntityFrameworkCore;
using MoviesApp.Domain.Entities;
using MoviesApp.Domain.IRepositories;
using MoviesApp.Infrastructure.Persistence;

namespace MoviesApp.Infrastructure.Repositories;

internal class MoviesRepository(MoviesAppDbContext dbContext) : IMoviesRepository
{
    public async Task<IEnumerable<Movie>> GetAllAsync()
    {
        return await dbContext.Movies
        .AsNoTracking()
        .Include(m => m.MovieStreamingSites)
            .ThenInclude(ms => ms.StreamingSite)
        .ToListAsync();
    }
    public async Task<int> Create(Movie entity)
    {
        dbContext.Movies.Add(entity);
        await dbContext.SaveChangesAsync();
        return entity.Id;
    }
}
