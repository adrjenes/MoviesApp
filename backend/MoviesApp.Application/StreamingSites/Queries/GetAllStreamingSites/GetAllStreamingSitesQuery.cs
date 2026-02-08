using MediatR;
using MoviesApp.Application.StreamingSites.Dtos;

namespace MoviesApp.Application.StreamingSites.Queries.GetAllStreamingSites;

public record GetAllStreamingSitesQuery : IRequest<List<StreamingSiteDto>>;