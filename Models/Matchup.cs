using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MusicMatchup_v2.Models
{
    public class Matchup
    {
        [Key]
        public int Id { get; set; }
        public int BandId { get; set; }
        public int ArtistId { get; set; }

        public Artist Artist { get; set; }
        public Band Band { get; set; }
    }
}