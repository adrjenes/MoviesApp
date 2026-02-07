namespace MoviesApp.Domain.Entities;
public class MovieStreamingSite
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public int StreamingSiteId { get; set; }
    public Movie Movie { get; set; }
    public StreamingSite StreamingSite { get; set; }
}
