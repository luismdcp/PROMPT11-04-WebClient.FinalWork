using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PicUploader.DomainModel.Entities;
using PicUploader.DomainModel.Services;

namespace PicUploader.Controllers
{
    public class HomeController : Controller
    {
        #region Fields

        private readonly IDrawingsService _drawingsService;

        #endregion Fields

        #region Constructor

        public HomeController(IDrawingsService drawingsService)
        {
            this._drawingsService = drawingsService;
        }

        #endregion

        #region Actions

        // GET: /Home/
        public ActionResult Index()
        {
            var allDrawings = this._drawingsService.GetAll().ToList();
            return View(allDrawings);
        }

        // GET: /Home/Publish
        public ActionResult Publish()
        {
            var categories = new List<string> { "Abstracto", "Animais", "Pessoa" };
            ViewBag.Categories = categories;
            return View();
        }

        // POST: /Home/Publish
        [HttpPost]
        public ActionResult Publish(HttpPostedFileBase file, string imageBase64String)
        {
            Drawing newDrawing = new Drawing();
            string base64String = string.Empty;

            if (file != null && file.ContentLength > 0)
            {
                byte[] data;
                file.InputStream.Position = 0;

                using (BinaryReader reader = new BinaryReader(file.InputStream))
                {
                    data = reader.ReadBytes((int) file.InputStream.Length);
                }

                base64String = String.Format("{0}{1}", "data:image/png;base64,", Convert.ToBase64String(data));
            }
            else
            {
                // user dragged an image to the canvas
                if (!String.IsNullOrEmpty(imageBase64String))
                {
                    base64String = imageBase64String;
                }
            }

            TryUpdateModel(newDrawing);

            if (ModelState.IsValid)
            {
                newDrawing.Base64Content = base64String;
                newDrawing.CreationDate = DateTime.Now;
                newDrawing.LastUpdate = DateTime.Now;

                if (!string.IsNullOrEmpty(base64String))
                {
                    
                    this._drawingsService.Add(newDrawing);   
                }
            }

            return RedirectToAction("Index");
        }

        // Post: /Home/Filter
        public ActionResult Filter(string TitleFilter)
        {
            if (!string.IsNullOrEmpty(TitleFilter))
            {
                var filteredDrawings = this._drawingsService.GetAllFilteredBy(TitleFilter).ToList();
                return View(filteredDrawings);
            }

            return RedirectToAction("Index");
        }

        // Post: /Home/Top
        public ActionResult Top(int? TopFilter)
        {
            if (TopFilter.HasValue)
            {
                var filteredDrawings = this._drawingsService.GetTop(TopFilter.Value).ToList();
                return View(filteredDrawings);
            }

            return RedirectToAction("Index");
        }

        #endregion
    }
}