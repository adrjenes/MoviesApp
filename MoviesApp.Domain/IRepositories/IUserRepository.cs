using MoviesApp.Domain.Entities;

namespace MoviesApp.Domain.IRepositories;
public interface IUserRepository
{
    Task<User?> GetByUsernameAsync(string username, CancellationToken ct);
}

