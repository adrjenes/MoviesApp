using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoviesApp.Application.Auth.Commands.Login;

namespace MoviesApp.API.Controllers;


[Route("api/auth")]
[ApiController]
public class AuthController(IMediator mediator) : ControllerBase
{
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
    {
        var token = await mediator.Send(command);

        if (string.IsNullOrWhiteSpace(token)) return Unauthorized(new { error = "Błędne dane logowania" });

        return Ok(new { token });
    }
}