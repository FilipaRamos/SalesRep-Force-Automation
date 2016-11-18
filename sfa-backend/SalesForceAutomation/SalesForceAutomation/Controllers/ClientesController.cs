using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace SalesForceAutomation.Controllers
{
    public class ClientesController : ApiController
    {
        //
        // GET: /Cliente/

        public IEnumerable<Models.Cliente> Get()
        {
            return Lib_Primavera.PriIntegration.get_all_clients();
        }

    }
}
