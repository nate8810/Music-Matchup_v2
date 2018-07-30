using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicMatchup_v2.Models;

namespace MusicMatchup_v2.Data
{
    public class MusicMatchupContext : DbContext
    {
        public MusicMatchupContext()
        {
        }

        public MusicMatchupContext(DbContextOptions<MusicMatchupContext> options) : base(options)
        {

        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Band> Bands { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Matchup> Matchups { get; set; }
    }
}