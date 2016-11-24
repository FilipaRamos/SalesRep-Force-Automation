using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesForceAutomation.Models
{
    public class VendasVendedor
    {
        public string VendedorID
        {
            get;
            set;
        }
        public double Vendas
        {
            get;
            set;
        }

        public string Nome
        { 
            get; 
            set; 
        }
    }
}