using System.ComponentModel.DataAnnotations.Schema;

namespace ApiApp.Infratructure.Entities;

[Table("blog")]
public class BlogEntity : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string ImagesUrl { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string DescriptionShort { get; set; } = string.Empty;
    public string Tags { get; set; } = string.Empty;
    public int CommentsCount { get; set; }
}