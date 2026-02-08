using MediatR;
using MoviesApp.Application.Movies.Dtos;
using MoviesApp.Application.StreamingSites.Dtos;
using MoviesApp.Domain.IRepositories;

namespace MoviesApp.Application.Movies.Queries.GetAllMovies;

public class GetAllMoviesQueryHandler(IMoviesRepository repo) : IRequestHandler<GetAllMoviesQuery, List<MovieDto>>
{
    public async Task<List<MovieDto>> Handle(GetAllMoviesQuery request, CancellationToken ct)
    {
        var movies = await repo.GetAllAsync(ct);

        return movies.Select(m => new MovieDto
        {
            Id = m.Id,
            Name = m.Name,
            Description = m.Description,
            Score = m.Score,
            ReleaseDate = m.ReleaseDate,
            DurationMinutes = m.DurationMinutes,
            Genre = m.Genre,
            Director = m.Director,
            AgeRating = m.AgeRating,
            PosterUrl = m.PosterUrl,
            IsAvailable = m.IsAvailable,
            StreamingSites = m.MovieStreamingSites
                .Select(x => new StreamingSiteDto
                {
                    Id = x.StreamingSiteId,
                    Name = x.StreamingSite.Name
                })
                .DistinctBy(x => x.Id)
                .ToList()
        }).ToList();
    }
}