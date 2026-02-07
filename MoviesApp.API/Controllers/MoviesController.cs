using MediatR;
using Microsoft.AspNetCore.Mvc;
using MoviesApp.Application.Movies.Commands.CreateMovie;
using MoviesApp.Application.Movies.Dtos;
using MoviesApp.Application.Movies.Queries.GetAllMovies;

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
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateMovieDto dto)
    {
        var id = await mediator.Send(new CreateMovieCommand(dto));
        return Ok(new { id });
    }
}