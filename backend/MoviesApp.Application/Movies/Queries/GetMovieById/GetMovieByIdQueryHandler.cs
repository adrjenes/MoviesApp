using MediatR;
using MoviesApp.Application.Movies.Dtos;
using MoviesApp.Domain.IRepositories;

namespace MoviesApp.Application.Movies.Queries.GetMovieById;

public class GetMovieByIdQueryHandler(IMoviesRepository repo) : IRequestHandler<GetMovieByIdQuery, MovieDetailsDto?>
{
    public async Task<MovieDetailsDto?> Handle(GetMovieByIdQuery request, CancellationToken ct)
    {
        var m = await repo.GetByIdAsync(request.Id, ct);
        if (m is null) return null;

        return new MovieDetailsDto
        {
            Id = m.Id,
            Name = m.Name,
            OriginalTitle = m.OriginalTitle,
            Description = m.Description,
            Score = m.Score,
            ReleaseDate = m.ReleaseDate,
            DurationMinutes = m.DurationMinutes,
            Genre = m.Genre,
            Director = m.Director,
            Language = m.Language,
            Country = m.Country,
            AgeRating = m.AgeRating,
            PosterUrl = m.PosterUrl,
            IsAvailable = m.IsAvailable,
            StreamingSiteIds = m.MovieStreamingSites
                .Select(x => x.StreamingSiteId)
                .Distinct()
                .ToList()
        };
    }
}