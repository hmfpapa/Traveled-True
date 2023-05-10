using System.Collections.Generic;
using Traveled_True.Models;

namespace Traveled_True.Repositories
{
    public interface IItineraryRepository
    {
        void Add(Itinerary itinerary);
        void AddCrimes(ItineraryCrime itineraryCrime);
        void DeleteItinerary(int id);
        public void DeleteItineraryCrime(int itineraryId, int crimeId);
        List<Itinerary> GetAllByUser(int Id);
        object GetById(int Id);
    }
}