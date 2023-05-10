using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Traveled_True.Utils;
using Traveled_True.Models;
using System.Linq;
using System.Security.Cryptography;

namespace Traveled_True.Repositories
{
    public class ItineraryRepository : BaseRepository, IItineraryRepository
    {
        public ItineraryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Itinerary> GetAllByUser(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        i.UserId, i.Id as itineraryId, i.LocationId,
                                        c.Id as crimeId, c.Victim, c.TypeId, c.Date, c.Solved,
                                        l.Name as locationName,
                                        t.Name as typeName
                                        FROM Itinerary i
                                        LEFT JOIN ItineraryCrime ic ON i.Id = ic.ItineraryId
                                        LEFT JOIN Crime c ON ic.CrimeId = c.Id     
                                        LEFT JOIN Location l ON i.LocationId = l.Id
                                        LEFT JOIN Type t ON c.TypeId = t.Id
                                        WHERE i.UserId = @Id";
                    DbUtils.AddParameter(cmd, "@Id", Id);

                    var reader = cmd.ExecuteReader();

                    var itineraries = new List<Itinerary>();

                    while (reader.Read())
                    {
                        var itineraryId = DbUtils.GetInt(reader, "itineraryId");

                        var existingItinerary = itineraries.FirstOrDefault(p => p.Id == itineraryId);
                        if (existingItinerary == null)
                        {
                            existingItinerary = new Itinerary()
                            {
                                Id = DbUtils.GetInt(reader, "itineraryId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                LocationId = DbUtils.GetInt(reader, "LocationId"),
                                Location = new Location()
                                {
                                    Id = DbUtils.GetInt(reader, "LocationId"),
                                    Name = DbUtils.GetString(reader, "locationName"),
                                },
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId")
                                },
                                Crimes = new List<Crime>()
                            };

                            itineraries.Add(existingItinerary);
                        }

                        if (DbUtils.IsNotDbNull(reader, "crimeId"))
                        {
                            existingItinerary.Crimes.Add(new Crime()
                            {
                                Id = DbUtils.GetInt(reader, "crimeId"),
                                Victim = DbUtils.GetString(reader, "Victim"),
                                Type = DbUtils.GetString(reader, "typeName"),
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                Solved = DbUtils.GetBool(reader, "Solved"),
                                Location = DbUtils.GetString(reader, "locationName"),
                            });
                        }
                    }

                    return itineraries;
                }
            }
        }

        public object GetById(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT i.UserId, i.Id as itineraryId, i.LocationId,
                                        c.Id as crimeId, c.Victim, c.TypeId, c.Date,
                                        l.Name as locationName,
                                        t.Name as typeName
                                        FROM Itinerary i
                                        LEFT JOIN ItineraryCrime ic ON i.Id = ic.ItineraryId
                                        LEFT JOIN Crime c ON ic.CrimeId = c.Id     
                                        LEFT JOIN Location l ON i.LocationId = l.Id
                                        LEFT JOIN Type t ON c.TypeId = t.Id
                                        WHERE i.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", Id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Itinerary itinerary = null;

                        while (reader.Read())
                        {
                            if (itinerary == null)
                            {
                                itinerary = new Itinerary()
                                {
                                    Id = DbUtils.GetInt(reader, "itineraryId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    LocationId = DbUtils.GetInt(reader, "LocationId"),
                                    Location = new Location()
                                    {
                                        Id = DbUtils.GetInt(reader, "LocationId"),
                                        Name = DbUtils.GetString(reader, "locationName"),
                                    },
                                    User = new User()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserId")
                                    },
                                    Crimes = new List<Crime>()
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "crimeId"))
                            {
                                itinerary.Crimes.Add(new Crime()
                                {
                                    Id = DbUtils.GetInt(reader, "crimeId"),
                                    Victim = DbUtils.GetString(reader, "Victim"),
                                    Type = DbUtils.GetString(reader, "typeName"),
                                    Date = DbUtils.GetDateTime(reader, "Date"),
                                    Location = DbUtils.GetString(reader, "locationName"),
                                });
                            }
                        }

                        return itinerary;
                    }
                }
            }
        }

        public void Add(Itinerary itinerary)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Itinerary (LocationId, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@LocationId, @UserId)";
                    DbUtils.AddParameter(cmd, "@LocationId", itinerary.LocationId);
                    DbUtils.AddParameter(cmd, "@UserId", itinerary.UserId);
                    itinerary.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void AddCrimes(ItineraryCrime itineraryCrime)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO ItineraryCrime (CrimeId, ItineraryId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@CrimeId, @ItineraryId)";
                    DbUtils.AddParameter(cmd, "@CrimeId", itineraryCrime.CrimeId);
                    DbUtils.AddParameter(cmd, "@ItineraryId", itineraryCrime.ItineraryId);
                    itineraryCrime.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void DeleteItinerary(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Itinerary
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteItineraryCrime(int itineraryId, int crimeId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM ItineraryCrime
                                        WHERE itineraryId = @itineraryId 
                                        AND crimeId = @crimeId";
                    DbUtils.AddParameter(cmd, "@itineraryId", itineraryId);
                    DbUtils.AddParameter(cmd, "@crimeId", crimeId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
