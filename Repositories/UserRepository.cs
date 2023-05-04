using Microsoft.Extensions.Configuration;
using Traveled_True.Utils;
using Traveled_True.Models;

namespace Traveled_True.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirebaseUserId, Name, UserName, Email, Admin
                           FROM [User]
                         WHERE FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Admin = DbUtils.GetBool(reader, "Admin"),

                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (FirebaseUserId, Name, Email, UserName, Admin)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @Name, @Email, @UserName, @Admin)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@UserName", user.UserName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Admin", user.Admin);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
