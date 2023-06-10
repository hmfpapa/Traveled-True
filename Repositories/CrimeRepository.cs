using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Traveled_True.Utils;
using Traveled_True.Models;
using System.Linq;
using System.Security.Permissions;

namespace Traveled_True.Repositories
{
    public class CrimeRepository : BaseRepository, ICrimeRepository
    {
        public CrimeRepository(IConfiguration configuration) : base(configuration) { }


        public List<Crime> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = CrimeQuery + " ORDER BY c.Date DESC";

                    var crimes = new List<Crime>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var crimeId = DbUtils.GetInt(reader, "Id");

                        var existingCrime = crimes.FirstOrDefault(p => p.Id == crimeId);
                        if (existingCrime == null)
                        {
                            existingCrime = new Crime()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                LocationId = DbUtils.GetInt(reader, "LocationId"),
                                Location = DbUtils.GetString(reader, "location"),
                                Solved = DbUtils.GetBool(reader, "Solved"),
                                Victim = DbUtils.GetString(reader, "Victim"),
                                Perpetrator = DbUtils.GetString(reader, "Perpetrator"),
                                GetInvolved = DbUtils.GetString(reader, "GetInvolved"),
                                Date = ((DbUtils.GetDateTime(reader, "Date")).Date),
                                Type = DbUtils.GetString(reader, "type"),
                                TypeId = DbUtils.GetInt(reader, "TypeId"),
                                Details = DbUtils.GetString(reader, "Details"),
                                ImageUrl = DbUtils.GetString(reader,"ImageUrl"),
                                Medias = new List<Media>()
                            };

                            crimes.Add(existingCrime);
                        }

                        if (DbUtils.IsNotDbNull(reader, "MediaId"))
                        {
                            existingCrime.Medias.Add(new Media()
                            {
                                Id = DbUtils.GetInt(reader, "MediaId"),
                                Link = DbUtils.GetString(reader, "Link"),
                                CrimeId = crimeId,
                                Description = DbUtils.GetString(reader, "Description")
                            });
                        }
                    }

                    return crimes;
                }
            }
        }

        public List<Crime> GetByType(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = CrimeQuery + " WHERE c.TypeId = @id ORDER BY c.Date DESC";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var crimes = new List<Crime>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var crimeId = DbUtils.GetInt(reader, "Id");

                        var existingCrime = crimes.FirstOrDefault(p => p.Id == crimeId);
                        if (existingCrime == null)
                        {
                            existingCrime = new Crime()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                LocationId = DbUtils.GetInt(reader, "LocationId"),
                                Location = DbUtils.GetString(reader, "location"),
                                Solved = DbUtils.GetBool(reader, "Solved"),
                                Victim = DbUtils.GetString(reader, "Victim"),
                                Perpetrator = DbUtils.GetString(reader, "Perpetrator"),
                                GetInvolved = DbUtils.GetString(reader, "GetInvolved"),
                                Date = ((DbUtils.GetDateTime(reader, "Date")).Date),
                                Type = DbUtils.GetString(reader, "type"),
                                TypeId = DbUtils.GetInt(reader, "TypeId"),
                                Details = DbUtils.GetString(reader, "Details"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                Medias = new List<Media>()
                            };

                            crimes.Add(existingCrime);
                        }

                        if (DbUtils.IsNotDbNull(reader, "MediaId"))
                        {
                            existingCrime.Medias.Add(new Media()
                            {
                                Id = DbUtils.GetInt(reader, "MediaId"),
                                Link = DbUtils.GetString(reader, "Link"),
                                CrimeId = crimeId,
                                Description = DbUtils.GetString(reader, "Description")
                            });
                        }
                    }

                    return crimes;
                }
            }
        }

        public object GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = CrimeQuery + " WHERE c.id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Crime crime = null;

                        while (reader.Read())
                        {
                            if (crime == null)
                            {
                                crime = new Crime()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    LocationId = DbUtils.GetInt(reader, "LocationId"),
                                    Location = DbUtils.GetString(reader, "location"),
                                    Solved = DbUtils.GetBool(reader, "Solved"),
                                    Victim = DbUtils.GetString(reader, "Victim"),
                                    Perpetrator = DbUtils.GetString(reader, "Perpetrator"),
                                    GetInvolved = DbUtils.GetString(reader, "GetInvolved"),
                                    Date = DbUtils.GetDateTime(reader, "Date"),
                                    Type = DbUtils.GetString(reader, "type"),
                                    TypeId = DbUtils.GetInt(reader, "TypeId"),
                                    Details = DbUtils.GetString(reader, "Details"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    Medias = new List<Media>()
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "MediaId"))
                            {
                                crime.Medias.Add(new Media()
                                {
                                    Id = DbUtils.GetInt(reader, "MediaId"),
                                    Link = DbUtils.GetString(reader, "Link"),
                                    CrimeId = DbUtils.GetInt(reader, "Id"),
                                    Description = DbUtils.GetString(reader, "Description")
                                });
                            }
                        }

                        return crime;
                    }
                }
            }
        }

        public List<Crime> GetByLocation(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = CrimeQuery + " WHERE c.locationId = @Id  ORDER BY c.Date";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var crimes = new List<Crime>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var crimeId = DbUtils.GetInt(reader, "Id");

                        var existingCrime = crimes.FirstOrDefault(p => p.Id == crimeId);
                        if (existingCrime == null)
                        {
                            existingCrime = new Crime()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                LocationId = DbUtils.GetInt(reader, "LocationId"),
                                Location = DbUtils.GetString(reader, "location"),
                                Solved = DbUtils.GetBool(reader, "Solved"),
                                Victim = DbUtils.GetString(reader, "Victim"),
                                Perpetrator = DbUtils.GetString(reader, "Perpetrator"),
                                GetInvolved = DbUtils.GetString(reader, "GetInvolved"),
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                Type = DbUtils.GetString(reader, "type"),
                                TypeId = DbUtils.GetInt(reader, "TypeId"),
                                Details = DbUtils.GetString(reader, "Details"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                Medias = new List<Media>()
                            };

                            crimes.Add(existingCrime);
                        }

                        if (DbUtils.IsNotDbNull(reader, "MediaId"))
                        {
                            existingCrime.Medias.Add(new Media()
                            {
                                Id = DbUtils.GetInt(reader, "MediaId"),
                                Link = DbUtils.GetString(reader, "Link"),
                                CrimeId = crimeId,
                                Description = DbUtils.GetString(reader, "Description")
                            });
                        }
                    }

                    return crimes;
                }
            }
        }
        public List<Crime> GetByItinerary(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                         ic.CrimeId, ic.ItineraryId,
                        c.Id, c.LocationId, c.Solved, c.TypeId, c.Victim, c.Perpetrator, c.GetInvolved, c.Date, c.Details, c.ImageUrl,
                                l.Name as location, 
                                t.Name as type
                                FROM ItineraryCrime ic
                                LEFT JOIN Crime c on ic.CrimeId = c.Id
                                LEFT JOIN Location l on l.Id = c.LocationId
                                LEFT JOIN Type t on t.Id = c.TypeId
                        WHERE ic.ItineraryId = @Id  ORDER BY c.Date";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var crimes = new List<Crime>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var crimeId = DbUtils.GetInt(reader, "Id");
                        var existingCrime = crimes.FirstOrDefault(p => p.Id == crimeId);
                        if (existingCrime == null)
                        {
                            existingCrime = new Crime()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                LocationId = DbUtils.GetInt(reader, "LocationId"),
                                Location = DbUtils.GetString(reader, "location"),
                                Solved = DbUtils.GetBool(reader, "Solved"),
                                Victim = DbUtils.GetString(reader, "Victim"),
                                Perpetrator = DbUtils.GetString(reader, "Perpetrator"),
                                GetInvolved = DbUtils.GetString(reader, "GetInvolved"),
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                Type = DbUtils.GetString(reader, "type"),
                                TypeId = DbUtils.GetInt(reader, "TypeId"),
                                Details = DbUtils.GetString(reader, "Details"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                Medias = new List<Media>()
                            };
                            crimes.Add(existingCrime);
                        }
                    }
                    return crimes;
                }
            }
        }

        public void Add(Crime crime)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Crime (LocationId, Solved, Victim, Perpetrator, GetInvolved, TypeId, Date, Details, ImageUrl)
                                        OUTPUT INSERTED.ID
                                        VALUES (@LocationId, @Solved, @Victim, @Perpetrator, @GetInvolved, @TypeId, @Date, @Details, @ImageUrl)";
                    DbUtils.AddParameter(cmd, "@LocationId", crime.LocationId);
                    DbUtils.AddParameter(cmd, "@Solved", crime.Solved);
                    DbUtils.AddParameter(cmd, "@Victim", crime.Victim);
                    DbUtils.AddParameter(cmd, "@Perpetrator", crime.Perpetrator);
                    DbUtils.AddParameter(cmd, "@GetInvolved", crime.GetInvolved);
                    DbUtils.AddParameter(cmd, "@TypeId", crime.TypeId);
                    DbUtils.AddParameter(cmd, "@Date", crime.Date);
                    DbUtils.AddParameter(cmd, "@Details", crime.Details);
                    DbUtils.AddParameter(cmd, "@ImageUrl", crime.ImageUrl);
                    crime.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Crime crime)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Crime
                            SET 
                            LocationId = @location,
                            Solved = @solved,
                            Victim = @victim,
                            Perpetrator = @perpetrator,
                            GetInvolved = @getInvolved,
                            TypeId = @typeId,
                            Date = @date,
                            Details = @details,
                            ImageUrl = @imageUrl
                           WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@location", crime.LocationId);
                    cmd.Parameters.AddWithValue("@solved", crime.Solved);
                    cmd.Parameters.AddWithValue("@victim", crime.Victim);
                    cmd.Parameters.AddWithValue("@perpetrator", crime.Perpetrator);
                    cmd.Parameters.AddWithValue("@getInvolved", crime.GetInvolved);
                    cmd.Parameters.AddWithValue("@typeId", crime.TypeId);
                    cmd.Parameters.AddWithValue("@date", crime.Date);
                    cmd.Parameters.AddWithValue("@details", crime.Details);
                    cmd.Parameters.AddWithValue("@imageUrl", crime.ImageUrl);
                    cmd.Parameters.AddWithValue("@id", crime.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private string CrimeQuery
        {
            get
            {
                return @"SELECT c.Id, c.LocationId, c.Solved, c.TypeId, c.Victim, c.Perpetrator, c.GetInvolved, c.Date, c.Details, c.ImageUrl,
                                l.Name as location, 
                                t.Name as type,
                                m.Id as MediaId, m.link, m.description
                           FROM Crime c
                                LEFT JOIN Location l on l.Id = c.LocationId
                                LEFT JOIN Type t on t.Id = c.TypeId
                                LEFT JOIN Media m on m.CrimeId = c.Id";
            }
        }

        
    }
}
