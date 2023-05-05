using Microsoft.AspNetCore.Mvc;
using Traveled_True.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Traveled_True.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _locationRepository;

        public LocationController(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }
        // GET: api/<LocationController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_locationRepository.GetAll());
        }

        
    }
}
