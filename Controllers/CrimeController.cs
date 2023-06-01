using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using Traveled_True.Models;
using Traveled_True.Repositories;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Traveled_True.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CrimeController : ControllerBase
    {
        private readonly ICrimeRepository _crimeRepository;

        public CrimeController(ICrimeRepository crimeRepository)
        {
            _crimeRepository = crimeRepository;
        }



        // GET: api/<CrimeController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_crimeRepository.GetAll());
        }

        // GET api/<CrimeController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var crime = _crimeRepository.GetById(id);
            if (crime == null)
            {
                return NotFound();
            }
            return Ok(crime);
        }

        [HttpGet("location/{id}")]
        public IActionResult GetByLocation(int id)
        {
            return Ok(_crimeRepository.GetByLocation(id));
        }

        // POST api/<CrimeController>
        [HttpPost]
        public IActionResult Add(Crime crime)
        {
            _crimeRepository.Add(crime);
            return CreatedAtAction(nameof(Get), new { id = crime.Id }, crime);
        }

        [HttpGet("itinerary/{id}")]
        public IActionResult GetByItinerary(int id)
        {
            return Ok(_crimeRepository.GetByItinerary(id));
        }

        [HttpPut("{id}")]
        public IActionResult Put(Crime crime)
        {
            _crimeRepository.Update(crime);
            return Ok();

        }

        // DELETE api/<CrimeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
