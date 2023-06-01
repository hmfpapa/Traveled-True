using System.Collections.Generic;
using Traveled_True.Models;

namespace Traveled_True.Repositories
{
    public interface ICrimeRepository
    {
        void Add(Crime crime);
        List<Crime> GetAll();
        object GetById(int id);
        public List<Crime> GetByLocation(int id);
        public List<Crime> GetByItinerary(int id);
        public void Update(Crime crime);
    }
}