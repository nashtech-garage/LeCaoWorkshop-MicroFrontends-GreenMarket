
namespace ApiApp.API.Models;

public class AddProductRequest
{
    public string Name { get; set; } = string.Empty;
    public float? Price { get; set; }
    public float? Weight { get; set; }
    public string DescriptionShort { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Information { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public int? Discount { get; set; }
    public Boolean? Availability { get; set; }
    public string MainImageUrl { get; set; } = string.Empty;
    public string ImagesUrls { get; set; } = string.Empty;
    public Boolean? IsFeatured { get; set; }
}