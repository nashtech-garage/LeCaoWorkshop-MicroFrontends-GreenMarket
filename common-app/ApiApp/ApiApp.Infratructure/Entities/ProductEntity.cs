using System.ComponentModel.DataAnnotations.Schema;

namespace ApiApp.Infratructure.Entities;

[Table("products")]
public class ProductEntity : BaseEntity
{
    public int Category_Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public float? Price { get; set; }
    public float? Weight { get; set; }
    public string? Description_Short { get; set; }
    public string? Description { get; set; }
    public string? Information { get; set; }
    public string? Color { get; set; }
    public int? Discount { get; set; }
    public Boolean? Availability { get; set; }
    public string? Main_Image_Url { get; set; }
    public string? Images_Urls { get; set; }
    [NotMapped]
    public List<string>? Images_Urls_Array { get; set; }
    public Boolean? Is_Featured { get; set; }
    public int? Count { get; set; }
    public Boolean? Is_Latest { get; set; }
    public int? Review_Count { get; set; }

    public CategoryEntity Category { get; set; } = new();
}