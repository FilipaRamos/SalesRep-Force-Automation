using SalesForceAutomation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace SalesForceAutomation.Controllers
{
    public class ClienteController : ApiController
    {
        //
        // GET: /Cliente/

        public IEnumerable<Models.Cliente> Get()
        {
            return Lib_Primavera.PriIntegration.get_all_clients();
        }

        // GET: /cliente/id
        public Cliente Get(string id)
        {
            Models.Cliente cliente = Lib_Primavera.PriIntegration.get_client(id);
            if (cliente == null)
            {
                throw new HttpResponseException(
                  Request.CreateResponse(HttpStatusCode.NotFound));
            }
            else
            {
                return cliente;
            }
        }

    }
}
