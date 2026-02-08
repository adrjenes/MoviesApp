using MediatR;
using Microsoft.AspNetCore.Mvc;
using MoviesApp.Application.Movies.Commands.CreateMovie;
using MoviesApp.Application.Movies.Commands.UpdateMovie;
using MoviesApp.Application.Movies.Dtos;
using MoviesApp.Application.Movies.Queries.GetAllMovies;
using MoviesApp.Application.Movies.Queries.GetMovieById;

namespace MoviesApp.API.Controllers;

[ApiController]
[Route("api/movies")]
public class MoviesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct)
    {
        var movies = await mediator.Send(new GetAllMoviesQuery(), ct);
        return Ok(movies);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id, CancellationToken ct)
    {
        var movie = await mediator.Send(new GetMovieByIdQuery(id), ct);
        return movie is null ? NotFound() : Ok(movie);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateMovieDto dto, CancellationToken ct)
    {
        var id = await mediator.Send(new CreateMovieCommand(dto), ct);
        return Ok(new { id });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateMovieCommand command, CancellationToken ct)
    {
        command.Id = id;

        var ok = await mediator.Send(command, ct);
        return ok ? NoContent() : NotFound();
    }
}