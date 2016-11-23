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
    public class OportunidadeVendaController : ApiController
    {
        //
        // GET: /OportunidadeVenda/

        public Models.OportunidadeVenda Get(string id)
        {
            return Lib_Primavera.PriIntegration.get_oportVenda(id);
        }

        // POST: /OportunidadeVenda
        public HttpResponseMessage Post(OportunidadeVenda oport)
        {
            RespostaErro erro = new RespostaErro();
            erro = Lib_Primavera.PriIntegration.InsereOportunidade(oport);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, oport);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }

    }
}
