using MoviesApp.Domain.Entities;

namespace MoviesApp.Domain.IRepositories;

public interface IStreamingSitesRepository
{
    Task<List<StreamingSite>> GetAllAsync(CancellationToken ct);
}