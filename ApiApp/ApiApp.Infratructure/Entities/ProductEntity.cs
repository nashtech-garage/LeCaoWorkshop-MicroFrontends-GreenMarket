using System.ComponentModel.DataAnnotations.Schema;

namespace ApiApp.Infratructure.Entities;

[Table("products")]
public class ProductEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public float Price { get; set; }
    public float Weight { get; set; }
    public string DescriptionShort { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Information { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public int Discount { get; set; }
    public Boolean Availability { get; set; }
    public string MainImageUrl { get; set; } = string.Empty;
    public int ImagesUrls { get; set; }
    public Boolean IsFeatured { get; set; }
    public int Count { get; set; }
    public Boolean IsLatest { get; set; }
    public int ReviewCount { get; set; }
}