using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using MusicMatchup_v2.Data;
using MusicMatchup_v2.Models;
using Microsoft.AspNetCore.Authorization;

namespace MusicMatchup_v2.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ArtistsController : Controller
    {
        private readonly MusicMatchupContext _context;

        public ArtistsController(MusicMatchupContext context)
        {
            _context = context;
        }

        // GET api/Artists
        [HttpGet]
        public IEnumerable<Artist> GetArtists()
        {
            return _context.Artists;
        }

        // GET api/Artists/3
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtist([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artist = await _context.Artists.SingleOrDefaultAsync(m => m.Id == id);

            if (artist == null)
            {
                return NotFound();
            }

            return Ok(artist);
        }

        // PUT api/artists/3
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtist([FromRoute] int id, [FromBody] Artist artist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != artist.Id)
            {
                return BadRequest();
            }

            _context.Entry(artist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtistExists(id))
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

        // POST api/artists
        [HttpPost]
        public async Task<IActionResult> PostArtist([FromBody] Artist artist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Artists.Add(artist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtist", new Artist { Id = artist.Id }, artist);
        }

        // DELETE api/artists/3
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtist([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artist = await _context.Artists.SingleOrDefaultAsync(m => m.Id == id);
            if (artist == null)
            {
                return NotFound();
            }

            _context.Artists.Remove(artist);
            await _context.SaveChangesAsync();

            return Ok(artist);
        }

        private bool ArtistExists(int id)
        {
            return _context.Artists.Any(e => e.Id == id);
        }
    }
}