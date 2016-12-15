using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SalesForceAutomation.Lib_Primavera;

namespace SalesForceAutomation.Controllers
{
    public class CondPagController : ApiController
    {
        public IEnumerable<Models.CondPag> Get()
        {
            return PriIntegration.listCondPag();
        }
    }
}
