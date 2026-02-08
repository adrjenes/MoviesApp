using MediatR;
using Microsoft.AspNetCore.Mvc;
using MoviesApp.Application.StreamingSites.Queries.GetAllStreamingSites;

namespace MoviesApp.API.Controllers;

[ApiController]
[Route("api/streaming-sites")]
public class StreamingSitesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken ct)
    {
        var sites = await mediator.Send(new GetAllStreamingSitesQuery(), ct);
        return Ok(sites);
    }
}