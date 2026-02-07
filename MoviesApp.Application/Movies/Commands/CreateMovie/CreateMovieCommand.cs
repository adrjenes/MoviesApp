using MediatR;
using MoviesApp.Application.Movies.Dtos;

namespace MoviesApp.Application.Movies.Commands.CreateMovie;

public record CreateMovieCommand(CreateMovieDto Movie) : IRequest<int>;