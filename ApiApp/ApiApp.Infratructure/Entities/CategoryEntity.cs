using System.ComponentModel.DataAnnotations.Schema;

namespace ApiApp.Infratructure.Entities;

[Table("categories")]
public class CategoryEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Image_Url { get; set; } = string.Empty;
}