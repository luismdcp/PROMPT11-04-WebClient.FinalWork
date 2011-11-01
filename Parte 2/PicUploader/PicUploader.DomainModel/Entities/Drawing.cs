using System;

namespace PicUploader.DomainModel.Entities
{
    public class Drawing
    {
        #region Properties

        public string Title { get; set; }
        public string Base64Content { get; set; }
        public string Author { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdate { get; set; }
        public string Category { get; set; }

        #endregion

        #region Constructor

        public Drawing()
        {
            
        }

        #endregion
    }
}