using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using PdfSharpCore.Pdf;
using PdfSharpCore.Pdf.IO;

namespace MergePDF.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Merge(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
            {
                ViewBag.Message = "Please select files";
                return View("Index");
            }

            using var outputDocument = new PdfDocument();
            foreach (var file in files)
            {
                using var stream = file.OpenReadStream();
                var inputDocument = PdfReader.Open(stream, PdfDocumentOpenMode.Import);
                for (int idx = 0; idx < inputDocument.PageCount; idx++)
                {
                    outputDocument.AddPage(inputDocument.Pages[idx]);
                }
            }

            using var outStream = new MemoryStream();
            outputDocument.Save(outStream, false);
            outStream.Position = 0;
            return File(outStream.ToArray(), "application/pdf", "merged.pdf");
        }
    }
}
