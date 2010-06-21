
using System.Web.Mvc;
using jQueryUnitTestingFormValidation.Models;

namespace jQueryUnitTestingFormValidation.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewData["Message"] = "Welcome to ASP.NET MVC!";

            var viewModel = new ContactViewModel();

            return View(viewModel);
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
