﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Controllers
{
    public class EncomendasClienteController : ApiController
    {
        // GET api/EncomendasVendedor/:id
        public IEnumerable<Models.Encomenda> Get(string id)
        {
            List<Models.Encomenda> encomendas = Lib_Primavera.PriIntegration.get_client_purchases(id);
            if (encomendas == null)
            {
                throw new HttpResponseException(
                    Request.CreateResponse(HttpStatusCode.NotFound));
            }
            else
            {
                return encomendas;
            }
        }
    }
}
