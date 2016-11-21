using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Controllers
{
    public class FamiliasController : ApiController
    {
        // GET: /familias
        public IEnumerable<Models.Familias> Get()
        {
            return Lib_Primavera.PriIntegration.get_families();
        }
    }
}
