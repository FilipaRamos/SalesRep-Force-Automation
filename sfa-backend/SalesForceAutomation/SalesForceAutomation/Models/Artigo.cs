﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesForceAutomation.Models
{
    public class Artigo
    {
        public string CodArtigo
        {
            get;
            set;
        }

        public string DescArtigo
        {
            get;
            set;
        }

        public double PrecoMedio
        {
            get;
            set;
        }

        public string IVA
        {
            get;
            set;
        }

        public double StockAtual
        {
            get;
            set;
        }

        public string Familia
        {
            get;
            set;
        }

    }
}