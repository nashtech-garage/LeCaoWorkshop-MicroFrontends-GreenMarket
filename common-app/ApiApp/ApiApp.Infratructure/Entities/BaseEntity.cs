
using System.ComponentModel.DataAnnotations.Schema;
using Dapper.Contrib.Extensions;

namespace ApiApp.Infratructure.Entities;

public class BaseEntity
{
    [Key]
    [Computed]
    public int Id { get; set; }
    
    public string Created_By { get; set; } = "Phuc Hoang";
    public DateTime? Created_Date { get; set; }
    public string? Modified_By { get; set; }
    public DateTime? Modified_Date { get; set; }
}