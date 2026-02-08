using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MoviesApp.Application.Auth;
using MoviesApp.Domain.IRepositories;
using MoviesApp.Infrastructure.Auth;
using MoviesApp.Infrastructure.Persistence;
using MoviesApp.Infrastructure.Repositories;
using MoviesApp.Infrastructure.Seeders;

namespace MoviesApp.Infrastructure.Extensions;
public static class ServiceCollectionExtensions
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("MoviesAppDb");
        services.AddDbContext<MoviesAppDbContext>(options => options.UseSqlServer(connectionString));
        services.AddScoped<IMoviesAppSeeder, MoviesAppSeeder>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IMoviesRepository, MoviesRepository>();
    }
}
