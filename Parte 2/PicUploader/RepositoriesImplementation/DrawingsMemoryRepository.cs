using System.Collections.Generic;
using System.Linq;
using PicUploader.DomainModel.Entities;
using PicUploader.DomainModel.ServicesRepositoryInterfaces;

namespace RepositoriesImplementation
{
    public class DrawingsMemoryRepository : IDrawingsRepository
    {
        #region Properties

        public static IList<Drawing> DrawsBuffer { get; private set; }

        #endregion

        #region Constructors

        static DrawingsMemoryRepository()
        {
            DrawsBuffer = new List<Drawing>();
        }

        #endregion

        #region Interface Implementation

        public IQueryable<Drawing> GetAll()
        {
            return DrawsBuffer.AsQueryable();
        }

        public void Add(Drawing entity)
        {
            DrawsBuffer.Add(entity);
        }

        public IQueryable<Drawing> GetAllFilteredBy(string title)
        {
            return DrawsBuffer.Where(d => d.Title.Contains(title)).AsQueryable();
        }

        public IQueryable<Drawing> GetTop(int n)
        {
            return DrawsBuffer.Take(n).AsQueryable();
        }

        #endregion   
    }
}