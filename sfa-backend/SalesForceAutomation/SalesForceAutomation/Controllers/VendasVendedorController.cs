using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Controllers
{
    public class VendasVendedorController : ApiController
    {
        public IEnumerable<Models.VendasVendedor> Get()
        {
            return Lib_Primavera.PriIntegration.get_all_salesRep_sales_value();
        }

        public Models.VendasVendedor Get(string id)
        {
            Models.VendasVendedor venda;
            venda = Lib_Primavera.PriIntegration.get_salesRep_sales_value(id);
            if (venda == null)
            {
                throw new HttpResponseException(
                  Request.CreateResponse(HttpStatusCode.NotFound));
            }
            else
            {
                return venda;
            }
        }
    }
}
