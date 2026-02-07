using MediatR;
using MoviesApp.Application.Movies.Dtos;

namespace MoviesApp.Application.Movies.Queries.GetMovieById;

public record GetMovieByIdQuery(int Id) : IRequest<MovieDetailsDto?>;