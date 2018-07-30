using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MusicMatchup_v2.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 6)]
        public string Password { get; set; }
    }
}