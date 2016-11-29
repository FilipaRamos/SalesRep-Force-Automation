using SalesForceAutomation.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Controllers
{
    public class ReuniaoController : ApiController
    {

        // GET /Reuniao/
        public IEnumerable<Models.Reuniao> Get()
        {
            return Lib_Primavera.PriIntegration.GetReunioes();
        }

        // GET /Reuniao/:id
        public Models.Reuniao Get(string id)
        {
            Models.Reuniao reuniao = Lib_Primavera.PriIntegration.GetReuniao(id);
            if (reuniao == null)
            {
                throw new HttpResponseException(
                  Request.CreateResponse(HttpStatusCode.NotFound));
            }
            else
            {
                return reuniao;
            }
        }

        // POST: /Reuniao
        public HttpResponseMessage Post(Reuniao meeting)
        {
            RespostaErro erro = new RespostaErro();
            erro = Lib_Primavera.PriIntegration.PostReuniao(meeting);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, erro.Data);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // PUT: /Reuniao
        public HttpResponseMessage Put(string id, Reuniao meeting)
        {

            RespostaErro erro = new RespostaErro();

            try
            {
                erro = Lib_Primavera.PriIntegration.PutReuniao(meeting);

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

        // DELETE: /Reuniao/:id
        public HttpResponseMessage Delete(string id, Reuniao meeting)
        {

            RespostaErro erro = new RespostaErro();

            try
            {
                erro = Lib_Primavera.PriIntegration.DeleteReuniao(meeting);

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

    }
}
