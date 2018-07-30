using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using MusicMatchup_v2.Data;
using MusicMatchup_v2.Models;
using System.Net;

namespace MusicMatchup_v2.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly MusicMatchupContext _context;

        public UsersController(MusicMatchupContext context)
        {
            _context = context;
        }

        // GET api/users
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return _context.Users;
        }

        // GET api/users/3
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.SingleOrDefaultAsync(m => m.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT api/users/3
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            
            return NoContent();
        }

        // POST api/users
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var checkUsername = await _context.Users.SingleOrDefaultAsync(m => m.Username == user.Username );
            if (checkUsername == null)
            {

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUser", new User { Id = user.Id }, user);
            }
            else
            {
                // Duplicate username.  Return an HTTP 409 Conflict error to let the client know.
                return new StatusCodeResult(StatusCodes.Status409Conflict);
            }
        }

        // GET api/users/login
        [HttpGet("login/{username}")]
        public async Task<IActionResult> LookupUserId([FromRoute] string username)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = _context.Users.FirstOrDefault(u => u.Username == username);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // DELETE api/users/3
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.SingleOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}