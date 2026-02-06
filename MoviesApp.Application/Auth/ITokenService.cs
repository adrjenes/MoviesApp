using MoviesApp.Domain.Entities;

namespace MoviesApp.Application.Auth;

public interface ITokenService
{
    string CreateToken(User user);
}
