using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Traveled_True.Models;
using Traveled_True.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Traveled_True.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly IMediaRepository _mediaRepository;

        public MediaController(IMediaRepository mediaRepository)
        {
            _mediaRepository = mediaRepository;
        }
        // GET: api/<MediaController>
        [HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<MediaController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<MediaController>
        [HttpPost]
        
            public IActionResult Add(Media media)
            {
            _mediaRepository.Add(media);
            return Ok(media);
            }
       

        // PUT api/<MediaController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MediaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
