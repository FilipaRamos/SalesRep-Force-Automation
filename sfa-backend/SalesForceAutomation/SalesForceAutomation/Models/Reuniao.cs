using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SalesForceAutomation.Models
{
    public class Reuniao
    {

        public string CodReuniao
        {
            get;
            set;
        }

        public string CodUtilizador
        {
            get;
            set;
        }

        public string Descricao
        {
            get;
            set;
        }

        public DateTime DataInicio
        {
            get;
            set;
        }

        public DateTime DataFim
        {
            get;
            set;
        }

        public int Prioridade
        {
            get;
            set;
        }

    }
}
