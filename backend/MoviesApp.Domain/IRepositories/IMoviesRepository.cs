using MoviesApp.Domain.Entities;

namespace MoviesApp.Domain.IRepositories;

public interface IMoviesRepository
{
    Task<IEnumerable<Movie>> GetAllAsync(CancellationToken ct);
    Task<Movie?> GetByIdAsync(int id, CancellationToken ct);
    Task<int> Create(Movie entity, CancellationToken ct);
    Task<Movie?> GetByIdForUpdateAsync(int id, CancellationToken ct);
    Task SaveChangesAsync(CancellationToken ct);
}