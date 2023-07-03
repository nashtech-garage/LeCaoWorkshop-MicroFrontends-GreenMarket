
using Dapper.Contrib.Extensions;

namespace ApiApp.Infratructure.Entities;

public class BaseEntity
{
    [ExplicitKey]
    public int Id { get; set; }
    
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public string ModifiedBy { get; set; } = string.Empty;
    public DateTime ModifiedDate { get; set; }
}