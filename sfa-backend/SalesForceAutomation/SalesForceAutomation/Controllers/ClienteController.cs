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

        // PUT: /cliente/id
        public HttpResponseMessage Put(string id, Cliente cliente)
        {

            RespostaErro erro = new RespostaErro();

            try
            {
                erro = Lib_Primavera.PriIntegration.AtualizaCliente(cliente);
                if (erro.Erro == 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, erro.Descricao);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, erro.Descricao);
                }
            }

            catch (Exception exc)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, erro.Descricao);
            }
        }

        // POST: /cliente/id
        public HttpResponseMessage Post(Cliente cliente)
        {
            RespostaErro erro = new RespostaErro();
            erro = Lib_Primavera.PriIntegration.InsereCliente(cliente);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, cliente);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }


    }
}
