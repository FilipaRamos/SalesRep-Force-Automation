using SalesForceAutomation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Controllers
{
    public class VendedoresController : ApiController
    {
        // GET: /vendedores/
        public IEnumerable<Models.Vendedor> Get()
        {
            return Lib_Primavera.PriIntegration.GetSalesReps();
        }

        // POST: /vendedores/
        public HttpResponseMessage Post(Vendedor vendedor)
        {
            RespostaErro erro = new RespostaErro();
            erro = Lib_Primavera.PriIntegration.PostSalesRep(vendedor);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, vendedor);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, erro.Descricao);
            }

        }
    }
}
