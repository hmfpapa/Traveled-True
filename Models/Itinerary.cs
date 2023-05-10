using System.Collections.Generic;

namespace Traveled_True.Models
{
    public class Itinerary
    {
        public int Id { get; set; }
        public int LocationId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public Location Location { get; set; }
        public List<Crime> Crimes { get; set; }
    }
}
