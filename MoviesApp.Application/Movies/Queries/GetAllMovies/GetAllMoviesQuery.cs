using MediatR;
using MoviesApp.Application.Movies.Dtos;

namespace MoviesApp.Application.Movies.Queries.GetAllMovies;

public record GetAllMoviesQuery : IRequest<List<MovieDto>>;
