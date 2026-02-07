using MediatR;
using MoviesApp.Domain.Entities;
using MoviesApp.Domain.IRepositories;

namespace MoviesApp.Application.Movies.Commands.CreateMovie;

public class CreateMovieCommandHandler(IMoviesRepository repo) : IRequestHandler<CreateMovieCommand, int>
{
    public async Task<int> Handle(CreateMovieCommand request, CancellationToken ct)
    {
        var dto = request.Movie;

        var movie = new Movie
        {
            Name = dto.Name,
            OriginalTitle = dto.OriginalTitle,
            Description = dto.Description,
            Score = dto.Score,
            ReleaseDate = dto.ReleaseDate,
            DurationMinutes = dto.DurationMinutes,
            Genre = dto.Genre,
            Director = dto.Director,
            Language = dto.Language,
            Country = dto.Country,
            AgeRating = dto.AgeRating,
            PosterUrl = dto.PosterUrl,
            IsAvailable = dto.IsAvailable,
            CreatedAt = DateTime.UtcNow
        };

        foreach (var siteId in dto.StreamingSiteIds.Distinct())
        {
            movie.MovieStreamingSites.Add(new MovieStreamingSite
            {
                StreamingSiteId = siteId
            });
        }

        var id = await repo.Create(movie);
        return id;
    }
}