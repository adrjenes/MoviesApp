using MoviesApp.Domain.Entities;

namespace MoviesApp.Domain.IRepositories;

public interface IMoviesRepository
{
    Task<IEnumerable<Movie>> GetAllAsync();
    Task<int> Create(Movie entity);
}
