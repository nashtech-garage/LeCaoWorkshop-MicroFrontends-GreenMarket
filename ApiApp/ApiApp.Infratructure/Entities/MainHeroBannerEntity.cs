using System.ComponentModel.DataAnnotations.Schema;

namespace ApiApp.Infratructure.Entities;

[Table("main_hero_banner")]
public class MainHeroBannerEntity : BaseEntity
{
    public string Category_Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Image_Link { get; set; } = string.Empty;
}