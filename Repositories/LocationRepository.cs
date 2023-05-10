using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Traveled_True.Utils;
using Traveled_True.Models;

namespace Traveled_True.Repositories
{
    public class LocationRepository : BaseRepository, ILocationRepository
    {
        public LocationRepository(IConfiguration configuration) : base(configuration) { }
        public List<Location> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name FROM Location ORDER BY Name";

                    var locations = new List<Location>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        locations.Add(new Location()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    return locations;
                }
            }
        }

    }
}
