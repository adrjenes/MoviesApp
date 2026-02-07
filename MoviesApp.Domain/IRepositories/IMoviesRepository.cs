using MoviesApp.Domain.Entities;

namespace MoviesApp.Domain.IRepositories;

public interface IMoviesRepository
{
    Task<IEnumerable<Movie>> GetAllAsync();
    Task<Movie?> GetByIdAsync(int id);
    Task<int> Create(Movie entity);
}
