using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MusicMatchup_v2.Data;
using MusicMatchup_v2.Models;

namespace MusicMatchup_v2.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly MusicMatchupContext _context;

        public LoginController(MusicMatchupContext context)
        {
            _context = context;
        }

        [HttpPost("token")]
        public IActionResult CheckUser([FromBody] Auth auth)
        //public IActionResult CheckUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = auth.Username;
            var password = auth.Password;
            var result = _context.Users.FirstOrDefault(u => u.Username == username && u.Password == password);

            if (result != null)
            {
                var claimsData = new[] { new Claim(ClaimTypes.Name, username) };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("thisisasupersecretkeyomgitssolongbecauseitssupersecrtet"));
                var signInCred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
                var token = new JwtSecurityToken(
                    issuer: "musicmatchup.com",
                    audience: "musicmatchup.com",
                    expires: DateTime.Now.AddMinutes(24*60),
                    claims: claimsData,
                    signingCredentials: signInCred
                    );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                return Ok(tokenString);
            }

            return BadRequest(new { error = "You dun messed up A A Ron" });
        }
    }
}
