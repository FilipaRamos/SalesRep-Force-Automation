using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesForceAutomation.Tools
{
    public class Tools
    {

        // Current Status: '_-_' => '.'
        public static string Parse(string input)
        {
            string output = input.Replace("_-_", ".");

            return output;
        }

    }
}