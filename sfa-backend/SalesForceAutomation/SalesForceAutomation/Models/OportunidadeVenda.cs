using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SalesForceAutomation.Models
{
    public class OportunidadeVenda
    {

        public string Id
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

        public string CicloVenda
        {
            get;
            set;
        }

        public string Artigo
        {
            get;
            set;
        }


    }
}
