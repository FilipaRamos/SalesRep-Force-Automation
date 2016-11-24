using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Controllers
{
    public class EncomendasController : ApiController
    {
        // GET Encomenda/
        public IEnumerable<Models.Encomenda> Get()
        {
            return Lib_Primavera.PriIntegration.get_all_sales();
        }

        // GET Encomenda/:id
        public Models.Encomenda Get(string id)
        {
            Models.Encomenda encomenda = Lib_Primavera.PriIntegration.get_sale(id);
            if (encomenda == null)
            {
                throw new HttpResponseException(
                  Request.CreateResponse(HttpStatusCode.NotFound));
            }
            else
            {
                return encomenda;
            }
        }

        // POST Encomenda/
        public HttpResponseMessage Post(Models.Encomenda encomenda)
        {
            Models.RespostaErro erro = new Models.RespostaErro();
            erro = Lib_Primavera.PriIntegration.new_sale(encomenda);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, encomenda);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }

    }
}
