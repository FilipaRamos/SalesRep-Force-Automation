using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesForceAutomation.Models
{
    public class VendasArtigo
    {
        public string ArtigoID
        {
            get;
            set;
        }
        public double Vendas
        {
            get;
            set;
        }
        public double Stock
        {
            get;
            set;
        }
        public double Preco
        {
            get;
            set;
        }
    }
}