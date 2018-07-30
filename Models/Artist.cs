using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MusicMatchup_v2.Models
{
    public class Artist
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string StageName { get; set; }

        public virtual ICollection<Matchup> Matchups { get; set; }
    }
}
