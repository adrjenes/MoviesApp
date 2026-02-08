using MediatR;
using MoviesApp.Application.StreamingSites.Dtos;
using MoviesApp.Domain.IRepositories;

namespace MoviesApp.Application.StreamingSites.Queries.GetAllStreamingSites;

public sealed class GetAllStreamingSitesQueryHandler(IStreamingSitesRepository repo) : IRequestHandler<GetAllStreamingSitesQuery, List<StreamingSiteDto>>
{
    public async Task<List<StreamingSiteDto>> Handle(GetAllStreamingSitesQuery request, CancellationToken ct)
    {
        var sites = await repo.GetAllAsync(ct);

        return sites.Select(x => new StreamingSiteDto
        {
            Id = x.Id,
            Name = x.Name
        }).ToList();
    }
}