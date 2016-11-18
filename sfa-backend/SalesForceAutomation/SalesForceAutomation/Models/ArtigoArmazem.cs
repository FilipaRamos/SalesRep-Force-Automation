using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesForceAutomation.Models
{
    public class ArtigoArmazem
    {

        public string ArmazemID
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
    }
}