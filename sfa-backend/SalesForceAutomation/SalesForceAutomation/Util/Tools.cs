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

        public static string Truncate(string value, int maxChars)
        {
            return value.Length <= maxChars ? value : value.Substring(0, maxChars);
        }

    }
}