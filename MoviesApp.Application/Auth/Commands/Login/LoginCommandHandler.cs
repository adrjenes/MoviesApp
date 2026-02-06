using MediatR;
using MoviesApp.Domain.IRepositories;

namespace MoviesApp.Application.Auth.Commands.Login;
public class LoginCommandHandler(IUserRepository users, ITokenService tokenService) : IRequestHandler<LoginCommand, string?>
{
    public async Task<string?> Handle(LoginCommand request, CancellationToken ct)
    {
        var user = await users.GetByUsernameAsync(request.Username, ct);

        if (user is null) return null;

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password)) return null;

        return tokenService.CreateToken(user);
    }
}