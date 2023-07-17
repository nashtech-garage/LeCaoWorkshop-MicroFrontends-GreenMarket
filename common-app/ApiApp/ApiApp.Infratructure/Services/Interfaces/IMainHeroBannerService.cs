using ApiApp.Infratructure.Entities;

namespace ApiApp.Infratructure.Services;

public interface IMainHeroBannerService
{
    Task<MainHeroBannerEntity> GetMainHeroBannerAsync(int id);
    Task<IEnumerable<MainHeroBannerEntity>> GetAllMainHeroBannersAsync();
    Task AddMainHeroBannerAsync(MainHeroBannerEntity entity);
    Task UpdateMainHeroBannerAsync(MainHeroBannerEntity entity);
    Task DeleteMainHeroBannerAsync(MainHeroBannerEntity entity);
}
