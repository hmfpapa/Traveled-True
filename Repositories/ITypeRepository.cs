using System.Collections.Generic;
using Traveled_True.Models;

namespace Traveled_True.Repositories
{
    public interface ITypeRepository
    {
        List<Type> GetAll();
    }
}