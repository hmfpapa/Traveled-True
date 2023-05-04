namespace Traveled_True.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public bool Admin { get; set; }
        public string FirebaseUserId { get; set; }
    }
}
