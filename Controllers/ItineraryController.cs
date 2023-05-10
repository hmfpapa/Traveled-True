using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Traveled_True.Models;
using Traveled_True.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Traveled_True.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItineraryController : ControllerBase
    {
        private readonly IItineraryRepository _itineraryRepository;

        public ItineraryController(IItineraryRepository itineraryRepository)
        {
            _itineraryRepository = itineraryRepository;
        }

        // GET: api/<ItineraryController>
        [HttpGet]
        public IActionResult GetAll(int Id)
        {
            return Ok(_itineraryRepository.GetAllByUser(Id));
        }

        // GET api/<ItineraryController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var itinerary = _itineraryRepository.GetById(id);
            if (itinerary == null)
            {
                return NotFound();
            }
            return Ok(itinerary);
        }

        // POST api/<ItineraryController>
        [HttpPost]
        public IActionResult Add(Itinerary itinerary)
        {
            _itineraryRepository.Add(itinerary);
            return CreatedAtAction(nameof(Get), new { id = itinerary.Id }, itinerary);
        }

        // POST api/<ItineraryController>
        [HttpPost("{id}/addCrimes")]
        public IActionResult AddCrimes(ItineraryCrime itineraryCrime, int id)
        {
            itineraryCrime.ItineraryId = id;
            _itineraryRepository.AddCrimes(itineraryCrime);
            return Ok();
        }


        // DELETE api/<ItineraryController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _itineraryRepository.DeleteItinerary(id);
            return NoContent();
        }

        // DELETE api/<ItineraryController>/5
        [HttpDelete("removeCrimes")]
        public IActionResult DeleteCrimes(int itineraryId, int crimeId)
        {
            _itineraryRepository.DeleteItineraryCrime(itineraryId, crimeId);
            return NoContent();
        }


    }
}
