using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesForceAutomation.Models
{
    public class ArtigoArmazem
    {

        public string Armazem
        {
            get;
            set;
        }
        public string ArtigoID
        {
            get;
            set;
        }
        public double Stock
        {
            get;
            set;
        }
        public string Morada
        {
            get;
            set;
        }
        public string Localidade
        {
            get;
            set;
        }
        public string CodPost
        {
            get;
            set;
        }
        public string Lote
        {
            get;
            set;
        }
    }
}