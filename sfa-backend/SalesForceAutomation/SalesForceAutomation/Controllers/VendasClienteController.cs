using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Controllers
{
    public class VendasClienteController : ApiController
    {
        // GET: VendasCliente
        public List<Models.VendasCliente> Get()
        {
            return Lib_Primavera.PriIntegration.get_all_clients_sales_value();
        }

        public Models.VendasCliente Get(string id)
        {
            Models.VendasCliente vendas = Lib_Primavera.PriIntegration.get_client_sales_value(id);
            if (vendas == null)
            {
                throw new HttpResponseException(
                  Request.CreateResponse(HttpStatusCode.NotFound));
            }
            else
            {
                return vendas;
            }
        }
    }
}