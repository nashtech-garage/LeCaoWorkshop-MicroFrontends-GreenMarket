using System.ComponentModel.DataAnnotations.Schema;

namespace ApiApp.Infratructure.Entities;

[Table("blog")]
public class BlogEntity : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Images_Url { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Description_Short { get; set; } = string.Empty;
    public string Tags { get; set; } = string.Empty;
    public int Comments_Count { get; set; }
}