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
    public async Task<IActionResult> GetAll()
    {
        var movies = await mediator.Send(new GetAllMoviesQuery());
        return Ok(movies);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute]int id)
    {
        var movie = await mediator.Send(new GetMovieByIdQuery(id));
        return movie is null ? NotFound() : Ok(movie);
    }
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateMovieDto dto)
    {
        var id = await mediator.Send(new CreateMovieCommand(dto));
        return Ok(new { id });
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateMovieCommand command)
    {
        command.Id = id;

        var ok = await mediator.Send(command);
        return ok ? NoContent() : NotFound();
    }
}