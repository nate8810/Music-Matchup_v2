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
    public class BandsController : Controller
    {
        private readonly MusicMatchupContext _context;

        public BandsController(MusicMatchupContext context)
        {
            _context = context;
        }

        // GET api/bands
        [HttpGet]
        public IEnumerable<Band> GetBands()
        {
            return _context.Bands;
        }

        // GET api/bands/3
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBand([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var band = await _context.Bands.SingleOrDefaultAsync(m => m.Id == id);

            if (band == null)
            {
                return NotFound();
            }

            return Ok(band);
        }

        // PUT api/bands/3
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBand([FromRoute] int id, [FromBody] Band band)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != band.Id)
            {
                return BadRequest();
            }

            _context.Entry(band).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BandExists(id))
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

        // POST api/bands
        [HttpPost]
        public async Task<IActionResult> PostBand([FromBody] Band band)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Bands.Add(band);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBand", new Band { Id = band.Id }, band);
        }

        // DELETE api/bands/3
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBand([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var band = await _context.Bands.SingleOrDefaultAsync(m => m.Id == id);
            if (band == null)
            {
                return NotFound();
            }

            _context.Bands.Remove(band);
            await _context.SaveChangesAsync();

            return Ok(band);
        }

        private bool BandExists(int id)
        {
            return _context.Bands.Any(e => e.Id == id);
        }
    }
}