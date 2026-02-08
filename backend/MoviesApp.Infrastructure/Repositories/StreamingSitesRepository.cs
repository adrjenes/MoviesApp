using Microsoft.EntityFrameworkCore;
using MoviesApp.Domain.Entities;
using MoviesApp.Domain.IRepositories;
using MoviesApp.Infrastructure.Persistence;

namespace MoviesApp.Infrastructure.Repositories;

internal class StreamingSitesRepository(MoviesAppDbContext db) : IStreamingSitesRepository
{
    public Task<List<StreamingSite>> GetAllAsync(CancellationToken ct)
        => db.StreamingSites
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .ToListAsync(ct);
}