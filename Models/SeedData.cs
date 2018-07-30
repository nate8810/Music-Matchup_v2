using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MusicMatchup_v2.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicMatchup_v2.Models
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new MusicMatchupContext(
                serviceProvider.GetRequiredService<DbContextOptions<MusicMatchupContext>>()))
            {
                //Check if any data already exist
                if (context.Projects.Any())
                {
                    return;
                }
                var projects = new Project[]
                {
                    new Project {Name = "Music-Matchup", Description = "For our project, we decided to create a 'music matchup' application that will allow users to keep track of individual artists, and the various bands that they have been associated with. Users would be able to register, and once registered, would be able to add/remove artists and bands, and associate which artists were ever a part of which bands." },
                    new Project {Name = "Second Project", Description = "A project description" }
                };

                foreach (Project p in projects)
                {
                    context.Projects.Add(p);
                };

                if(context.Bands.Any())
                {
                    return;
                };

                var bands = new Band[]
                {
                    new Band
                    {
                        Bandname = "Team Awesome",
                        StartYear = 2018,
                        EndYear = null,
                        Genre = "punk"
                    }
                };

                foreach (Band b in bands)
                {
                    context.Bands.Add(b);
                };

                if (context.Artists.Any())
                {
                    return;
                };

                var artists = new Artist[]
                {
                    new Artist
                    {
                        FirstName = "Nate",
                        LastName = "Castillo",
                    }
                };

                foreach (Artist a in artists)
                {
                    context.Artists.Add(a);
                };

                context.SaveChanges();
            }
        }
    }
}

