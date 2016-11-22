using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Controllers
{
    public class ReuniaoController : ApiController
    {

        //
        // GET: /Reuniao/

        public IEnumerable<Models.Reuniao> Get()
        {
            return Lib_Primavera.PriIntegration.get_all_meetings();
        }

    }
}
