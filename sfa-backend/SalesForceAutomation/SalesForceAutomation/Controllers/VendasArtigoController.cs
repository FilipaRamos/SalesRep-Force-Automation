using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Controllers
{
    public class VendasArtigoController : ApiController
    {
        public IEnumerable<Models.VendasArtigo> Get()
        {
            return Lib_Primavera.PriIntegration.get_all_product_sales_value();
        }

        public Models.VendasArtigo Get(string id)
        {
            Models.VendasArtigo venda;
            venda = Lib_Primavera.PriIntegration.get_product_sales_value(id);
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
