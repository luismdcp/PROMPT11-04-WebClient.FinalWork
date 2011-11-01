
using System.Linq;
namespace Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> GetAll();
        IQueryable<TEntity> GetAllFilteredBy(string title);
        IQueryable<TEntity> GetTop(int n);
        void Add(TEntity entity);
    }
}