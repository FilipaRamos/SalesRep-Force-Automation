using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Controllers
{
    public class VendedoresController : ApiController
    {
        public IEnumerable<Models.Vendedor> Get()
        {
            return Lib_Primavera.PriIntegration.get_all_salesRep();
        }
    }
}
