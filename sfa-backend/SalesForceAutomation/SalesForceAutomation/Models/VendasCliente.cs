using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesForceAutomation.Models
{
    public class VendasCliente
    {
        public string ClienteID
        {
            get;
            set;
        }
        public double Vendas
        {
            get;
            set;
        }
        public string Morada
        {
            get;
            set;
        }
        public string Telefone
        {
            get;
            set;
        }
        public string CodPost
        {
            get;
            set;
        }
        public string Localidade
        {
            get;
            set;
        }
    }
}