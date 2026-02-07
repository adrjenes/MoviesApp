namespace MoviesApp.Application.Movies.Dtos;

public class CreateMovieDto
{
    public string Name { get; set; } = null!;
    public string? OriginalTitle { get; set; }
    public string? Description { get; set; }
    public decimal Score { get; set; }
    public DateTime ReleaseDate { get; set; }
    public int DurationMinutes { get; set; }
    public string? Genre { get; set; }
    public string? Director { get; set; }
    public string? Language { get; set; }
    public string? Country { get; set; }
    public string? AgeRating { get; set; }
    public string? PosterUrl { get; set; }
    public bool IsAvailable { get; set; }
    public List<int> StreamingSiteIds { get; set; } = new();
}
