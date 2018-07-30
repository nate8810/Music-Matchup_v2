using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using MusicMatchup_v2.Data;
using MusicMatchup_v2.Models;

namespace MusicMatchup_v2.Controllers
{
    [Route("api/[controller]")]
    public class MatchupsController : Controller
    {
        private readonly MusicMatchupContext _context;

        public MatchupsController(MusicMatchupContext context)
        {
            _context = context;
        }

        // GET api/matchups
        [HttpGet]
        public IEnumerable<Matchup> GetAllMatchups()
        {
            return _context.Matchups;
        }

        // GET api/matchups/artists
        [HttpGet("artists/{bandId}")]
        public async Task<IActionResult> GetMatchupArtists([FromRoute] int bandId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var matchupArtists = await _context.Matchups
                .Where(matched => matched.BandId == bandId)
                .ToListAsync();

            var join =
                from a in _context.Artists
                join m in matchupArtists
                on a.Id equals m.ArtistId
                select new
                {
                    artistId = a.Id,
                    a.FirstName,
                    a.LastName,
                    a.StageName,
                    matchId = m.Id
                };

            if (matchupArtists == null)
            {
                return NotFound();
            }

            return Ok(join);
        }

        // GET api/matchups/bands
        [HttpGet("bands/{artistId}")]
        public async Task<IActionResult> GetMatchupBands([FromRoute] int artistId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var matchupBands = await _context.Matchups
                .Where(matched => matched.ArtistId == artistId)
                .ToListAsync();

            var join =
                from b in _context.Bands
                join m in matchupBands
                on b.Id equals m.BandId
                select new
                {
                    bandId = b.Id,
                    b.Bandname,
                    b.StartYear,
                    b.EndYear,
                    b.Genre,
                    matchId = m.Id
                };

            if (matchupBands == null)
            {
                return NotFound();
            }

            return Ok(join);
        }

        // GET api/matchups/3
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMatchup([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var matchup = await _context.Matchups.SingleOrDefaultAsync(m => m.Id == id);

            if (matchup == null)
            {
                return NotFound();
            }

            return Ok(matchup);
        }

        // PUT api/matchups/3
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMatchup([FromRoute] int id, [FromBody] Matchup matchup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != matchup.Id)
            {
                return BadRequest();
            }

            _context.Entry(matchup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchupExists(id))
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

        // POST api/matchups
        [HttpPost]
        public async Task<IActionResult> PostMatchup([FromBody] Matchup matchup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Matchups.Add(matchup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMatchup", new Matchup { Id = matchup.Id }, matchup);
        }

        // DELETE api/matchups/3
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatchup([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var matchup = await _context.Matchups.SingleOrDefaultAsync(m => m.Id == id);
            if (matchup == null)
            {
                return NotFound();
            }

            _context.Matchups.Remove(matchup);
            await _context.SaveChangesAsync();

            return Ok(matchup);
        }

        private bool MatchupExists(int id)
        {
            return _context.Matchups.Any(e => e.Id == id);
        }
    }
}