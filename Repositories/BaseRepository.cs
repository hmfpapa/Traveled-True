using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Traveled_True.Repositories
{
    public class BaseRepository
    {
        private readonly string _connectionString;
        public BaseRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        protected SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }
    }
}
