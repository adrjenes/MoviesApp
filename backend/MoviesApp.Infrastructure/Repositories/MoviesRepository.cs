using Microsoft.EntityFrameworkCore;
using MoviesApp.Domain.Entities;
using MoviesApp.Domain.IRepositories;
using MoviesApp.Infrastructure.Persistence;

namespace MoviesApp.Infrastructure.Repositories;

internal class MoviesRepository(MoviesAppDbContext dbContext) : IMoviesRepository
{
    public async Task<IEnumerable<Movie>> GetAllAsync(CancellationToken ct)
    {
        return await dbContext.Movies
            .AsNoTracking()
            .Include(m => m.MovieStreamingSites)
            .ThenInclude(ms => ms.StreamingSite)
            .ToListAsync(ct);
    }

    public async Task<Movie?> GetByIdAsync(int id, CancellationToken ct)
    {
        return await dbContext.Movies
            .AsNoTracking()
            .Include(m => m.MovieStreamingSites)
            .ThenInclude(ms => ms.StreamingSite)
            .FirstOrDefaultAsync(m => m.Id == id, ct);
    }

    public async Task<int> Create(Movie entity, CancellationToken ct)
    {
        dbContext.Movies.Add(entity);
        await dbContext.SaveChangesAsync(ct);
        return entity.Id;
    }

    public async Task<Movie?> GetByIdForUpdateAsync(int id, CancellationToken ct)
    {
        return await dbContext.Movies
            .Include(m => m.MovieStreamingSites)
            .FirstOrDefaultAsync(m => m.Id == id, ct);
    }

    public Task SaveChangesAsync(CancellationToken ct)
        => dbContext.SaveChangesAsync(ct);
}