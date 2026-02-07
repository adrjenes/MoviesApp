namespace MoviesApp.Domain.Entities;
public class StreamingSite
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public List<MovieStreamingSite> MovieStreamingSites { get; set; } = new();
}
