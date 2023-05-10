using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Traveled_True.Utils;
using Traveled_True.Models;

namespace Traveled_True.Repositories
{
    public class TypeRepository : BaseRepository, ITypeRepository
    {
        public TypeRepository(IConfiguration configuration) : base(configuration) { }
        public List<Type> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name FROM Type ORDER BY Name";

                    var types = new List<Type>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        types.Add(new Type()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    return types;
                }
            }
        }

    }
}
