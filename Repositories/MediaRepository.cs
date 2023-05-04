using Microsoft.Extensions.Configuration;
using Traveled_True.Models;
using Traveled_True.Utils;

namespace Traveled_True.Repositories
{
    public class MediaRepository : BaseRepository, IMediaRepository
    {
        public MediaRepository(IConfiguration configuration) : base(configuration) { }
        public void Add(Media media)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [Media] (Link, Description, CrimeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Link, @Description, @CrimeId)";
                    DbUtils.AddParameter(cmd, "@Link", media.Link);
                    DbUtils.AddParameter(cmd, "@Description", media.Description);
                    DbUtils.AddParameter(cmd, "@CrimeId", media.CrimeId);

                    media.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
