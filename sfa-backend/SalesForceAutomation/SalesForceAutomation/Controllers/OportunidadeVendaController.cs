using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace SalesForceAutomation.Controllers
{
    public class OportunidadeVendaController : ApiController
    {
        //
        // GET: /OportunidadeVenda/

        public Models.OportunidadeVenda Get(string id)
        {
            return Lib_Primavera.PriIntegration.get_oportVenda(id);
        }

    }
}
