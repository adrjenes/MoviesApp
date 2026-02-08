using MediatR;
using MoviesApp.Domain.Entities;
using MoviesApp.Domain.IRepositories;

namespace MoviesApp.Application.Movies.Commands.UpdateMovie;
public class UpdateMovieCommandHandler(IMoviesRepository repo) : IRequestHandler<UpdateMovieCommand, bool>
{
    public async Task<bool> Handle(UpdateMovieCommand request, CancellationToken ct)
    {
        var movie = await repo.GetByIdForUpdateAsync(request.Id, ct);
        if (movie is null) return false;

        movie.Name = request.Name;
        movie.OriginalTitle = request.OriginalTitle;
        movie.Description = request.Description;
        movie.Score = request.Score;
        movie.ReleaseDate = request.ReleaseDate;
        movie.DurationMinutes = request.DurationMinutes;
        movie.Genre = request.Genre;
        movie.Director = request.Director;
        movie.Language = request.Language;
        movie.Country = request.Country;
        movie.AgeRating = request.AgeRating;
        movie.PosterUrl = request.PosterUrl;
        movie.IsAvailable = request.IsAvailable;
        movie.UpdatedAt = DateTime.UtcNow;

        var incomingIds = request.StreamingSiteIds.Distinct().ToList();

        movie.MovieStreamingSites.Clear();

        foreach (var siteId in incomingIds)
        {
            movie.MovieStreamingSites.Add(new MovieStreamingSite
            {
                MovieId = movie.Id,
                StreamingSiteId = siteId
            });
        }

        await repo.SaveChangesAsync(ct);
        return true;
    }
}