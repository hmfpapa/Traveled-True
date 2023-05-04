using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Traveled_True.Models;
using Traveled_True.Repositories;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Traveled_True.Controllers
{
    //[Authorize]
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

        // POST api/<CrimeController>
        [HttpPost]
        //public IActionResult Add(Crime crime)
        //{
        //    return Ok(crime);
        //}
       

        // PUT api/<CrimeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CrimeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
