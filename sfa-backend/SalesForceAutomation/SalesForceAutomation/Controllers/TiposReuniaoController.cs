using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Controllers
{
    public class TiposReuniaoController : ApiController
    {
        // GET: /tiposreuniao
        public IEnumerable<Models.TiposReuniao> Get()
        {
            return Lib_Primavera.PriIntegration.GetTiposReuniao();
        }
    }
}
