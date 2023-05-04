using Traveled_True.Models;

namespace Traveled_True.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        User GetByFirebaseUserId(string firebaseUserId);
    }
}