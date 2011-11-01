using System.Linq;

namespace PicUploader.DomainModel.Services
{
    public interface IService<TEntity>
    {
        IQueryable<TEntity> GetAll();
        IQueryable<TEntity> GetAllFilteredBy(string title);
        IQueryable<TEntity> GetTop(int n);
        void Add(TEntity newEntity);
    }
}
