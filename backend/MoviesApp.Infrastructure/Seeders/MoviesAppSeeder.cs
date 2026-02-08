using Microsoft.EntityFrameworkCore;
using MoviesApp.Domain.Entities;
using MoviesApp.Infrastructure.Persistence;

namespace MoviesApp.Infrastructure.Seeders;
internal sealed class MoviesAppSeeder(MoviesAppDbContext dbContext) : IMoviesAppSeeder
{
    public async Task Seed()
    {
        await dbContext.Database.MigrateAsync();

        if (await dbContext.MovieStreamingSites.AnyAsync()) return;

        var netflix = new StreamingSite { Name = "Netflix" };
        var player = new StreamingSite { Name = "Player" };
        var hbo = new StreamingSite { Name = "HBO" };

        dbContext.StreamingSites.AddRange(netflix, player, hbo);

        var movie1 = new Movie
        {
            Name = "Zombieland",
            OriginalTitle = "Zombieland",
            Description = "Postapokaliptyczna komedia o zombie: nieśmiały Columbus i twardziel Tallahassee próbują przetrwać, trzymając się zestawu zasad, a po drodze spotykają dwie siostry szukające bezpiecznego schronienia.",
            Score = 7.40m,
            ReleaseDate = new DateTime(2009, 10, 2), 
            DurationMinutes = 88,
            Genre = "Komedia / Horror",
            Director = "Ruben Fleischer",
            Language = "English",
            Country = "USA",
            AgeRating = "R",
            PosterUrl = "/posters/zombieland.png",
            IsAvailable = false,
            CreatedAt = DateTime.UtcNow
        };

        var movie2 = new Movie
        {
            Name = "Giganci ze stali",
            OriginalTitle = "Real Steel",
            Description = "W niedalekiej przyszłości boks staje się sportem robotów. Charlie, były bokser i przegrany promotor, wraz z synem znajduje robota z potencjałem i próbuje wrócić do gry.",
            Score = 5.91m, 
            ReleaseDate = new DateTime(2011, 10, 7), 
            DurationMinutes = 127,
            Genre = "Sci-fi / Dramat sportowy",
            Director = "Shawn Levy",
            Language = "English",
            Country = "USA",
            AgeRating = "PG-13",
            PosterUrl = "/posters/realsteel.png",
            IsAvailable = true,
            CreatedAt = DateTime.UtcNow
        };

        var movie3 = new Movie
        {
            Name = "Zielona mila",
            OriginalTitle = "The Green Mile",
            Description = "Strażnik bloku śmierci w czasach Wielkiego Kryzysu poznaje więźnia oskarżonego o zbrodnię, który wydaje się posiadać niezwykły dar. Historia o współczuciu, winie i sprawiedliwości.",
            Score = 6.85m, 
            ReleaseDate = new DateTime(1999, 12, 10), 
            DurationMinutes = 189,
            Genre = "Dramat / Fantasy",
            Director = "Frank Darabont",
            Language = "English",
            Country = "USA",
            AgeRating = "R",
            PosterUrl = "/posters/thegreenmile.png",
            IsAvailable = true,
            CreatedAt = DateTime.UtcNow
        };

        dbContext.Movies.AddRange(movie1, movie2, movie3);

        dbContext.MovieStreamingSites.AddRange(
            new MovieStreamingSite { Movie = movie1, StreamingSite = netflix },
            new MovieStreamingSite { Movie = movie1, StreamingSite = player },
            new MovieStreamingSite { Movie = movie2, StreamingSite = hbo },
            new MovieStreamingSite { Movie = movie3, StreamingSite = netflix }
        );

        if (!await dbContext.Users.AnyAsync())
        {
            dbContext.Users.AddRange(
                new User
                {
                    Username = "rekruter",
                    Email = "rekrutacja@gmail.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("Rekruter123!@")
                }
            );

            await dbContext.SaveChangesAsync();
        }

        await dbContext.SaveChangesAsync();
    }
}