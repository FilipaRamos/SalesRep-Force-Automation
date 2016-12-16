using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Models
{
    public class TiposReuniao
    {
        public string Id
        {
            get;
            set;
        }

        public string Tipo
        {
            get;
            set;
        }

        public string Descricao
        {
            get;
            set;
        }
    }
}
