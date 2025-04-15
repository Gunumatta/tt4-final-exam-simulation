using System.ComponentModel.DataAnnotations;

namespace TaskManager.API.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        public bool Completed { get; set; }
    }
} 