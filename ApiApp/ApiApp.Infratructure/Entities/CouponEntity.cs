using System.ComponentModel.DataAnnotations.Schema;

namespace ApiApp.Infratructure.Entities;

[Table("coupon")]
public class CouponEntity : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Discount_Amount { get; set; }
    public string Unit { get; set; } = string.Empty;
    public Boolean Is_Expired { get;set; }
}