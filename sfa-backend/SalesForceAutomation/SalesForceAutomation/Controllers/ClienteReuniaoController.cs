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
    public class ClienteReuniaoController : ApiController
    {
        // GET: /ClienteReuniaoController/id
        public List<Models.Reuniao> Get(string id)
        {
            List<Models.Reuniao> reunioes = Lib_Primavera.PriIntegration.GetReuniaoCliente(id);
            if (reunioes == null)
            {
                throw new HttpResponseException(
                  Request.CreateResponse(HttpStatusCode.NotFound));
            }
            else
            {
                return reunioes;
            }
        }
    }
}