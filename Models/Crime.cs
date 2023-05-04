using System;
using System.Collections.Generic;

namespace Traveled_True.Models
{
    public class Crime
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public bool Solved { get; set; }
        public string Victim { get; set; }
        public string Perpetrator { get; set; }
        public string GetInvolved { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
        public int LocationId { get; set; }
        public int TypeId { get; set; }
        public List<Media> Medias { get; set; }
        public string Details { get; set; }
    }
}
