using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesForceAutomation.Models
{
    public class Encomenda
    {
        public string Id
        {
            get;
            set;
        }
        public string Entidade
        {
            get;
            set;
        }
        public int NumDoc
        {
            get;
            set;
        }
        public DateTime Data
        {
            get;
            set;
        }
        public string Responsavel
        {
            get;
            set;
        }
        public double TotalMerc
        {
            get;
            set;
        }
        public string Serie
        {
            get;
            set;
        }
        public List<Models.LinhaEncomenda> LinhasDoc
        {
            get;
            set;
        }
    }
}