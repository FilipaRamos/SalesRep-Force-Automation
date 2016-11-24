using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SalesForceAutomation.Models
{
    public class OportunidadeVenda
    {
         public string CodReuniao
         {
             get;
             set;
         }

        public string Descricao
        {
            get;
            set;
        }

        public string CodVendedor
        {
            get;
            set;
        }

        public long NumEncomenda
        {
            get;
            set;
        }

        public string Entidade
        {
            get;
            set;
        }

        public string Id
        {
            get;
            set;
        }

        public List<string> Artigos
        {
            get;
            set;
        }


    }
}
