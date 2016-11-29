using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SalesForceAutomation.Models;

namespace SalesForceAutomation.Controllers
{
    public class ArtigoArmazemController : ApiController

    {

        // GET api/artigoarmazem/5    
        public List<ArtigoArmazem> Get(string id)
        {
            List<Models.ArtigoArmazem> armazensArtigo = Lib_Primavera.PriIntegration.ListaArtigoArmazens(id);
            if (armazensArtigo == null)
            {
                throw new HttpResponseException(
                  Request.CreateResponse(HttpStatusCode.NotFound));
            }
            else
            {
                return armazensArtigo;
            }
        }

    }
}