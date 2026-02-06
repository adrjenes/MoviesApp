using Microsoft.EntityFrameworkCore;
using MoviesApp.Domain.Entities;
using MoviesApp.Domain.IRepositories;
using MoviesApp.Infrastructure.Persistence;

namespace MoviesApp.Infrastructure.Repositories;

internal class UserRepository(MoviesAppDbContext db) : IUserRepository
{
    public Task<User?> GetByUsernameAsync(string username, CancellationToken ct) 
        => db.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Username == username, ct);
}
