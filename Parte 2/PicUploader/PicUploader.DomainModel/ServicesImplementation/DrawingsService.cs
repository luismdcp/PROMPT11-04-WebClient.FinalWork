using System.Linq;
using PicUploader.DomainModel.Entities;
using PicUploader.DomainModel.Services;
using PicUploader.DomainModel.ServicesRepositoryInterfaces;

namespace PicUploader.DomainModel.ServicesImplementation
{
    public class DrawingsService : IDrawingsService
    {
        #region Fields

        private readonly IDrawingsRepository _drawingsRepository;

        #endregion Fields

        #region Constructors

        public DrawingsService(IDrawingsRepository drawingsRepository)
        {
            this._drawingsRepository = drawingsRepository;
        }

        #endregion

        #region Interfaces Implementation

        public IQueryable<Drawing> GetAll()
        {
            return this._drawingsRepository.GetAll();
        }

        public IQueryable<Drawing> GetAllFilteredBy(string title)
        {
            return this._drawingsRepository.GetAllFilteredBy(title);
        }

        public void Add(Drawing newEntity)
        {
            this._drawingsRepository.Add(newEntity);
        }

        public IQueryable<Drawing> GetTop(int n)
        {
            return this._drawingsRepository.GetTop(n);
        }

        #endregion
    }
}