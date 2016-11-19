using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Interop.ErpBS900;
using Interop.StdPlatBS900;
using Interop.StdBE900;
using Interop.GcpBE900;
using ADODB;

namespace SalesForceAutomation.Lib_Primavera
{
    public class PriIntegration
    {



        // Probably done
        #region Artigo

        public static Models.Artigo GetArtigo(string codArtigo)
        {

            GcpBEArtigo objArtigo = new GcpBEArtigo();
            Models.Artigo myArt = new Models.Artigo();

            if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
            {

                string company = SalesForceAutomation.Properties.Settings.Default["Company"].ToString();
                Console.Write(company);
                if (PriEngine.Engine.Comercial.Artigos.Existe(codArtigo) == false)
                {
                    return null;
                }
                else
                {
                    objArtigo = PriEngine.Engine.Comercial.Artigos.Edita(codArtigo);
                    myArt.CodArtigo = objArtigo.get_Artigo();
                    myArt.DescArtigo = objArtigo.get_Descricao();
                    myArt.PrecoMedio = objArtigo.get_PCMedio();
                    myArt.IVA = objArtigo.get_IVA();
                    myArt.StockAtual = objArtigo.get_StkActual();


                    return myArt;
                }

            }
            else
            {
                return null;
            }

        }

        public static List<Models.Artigo> ListaArtigos()
        {

            StdBELista objList;

            Models.Artigo art = new Models.Artigo();
            List<Models.Artigo> listArts = new List<Models.Artigo>();

            if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("Select * FROM Artigo");

                while (!objList.NoFim())
                {
                    art = new Models.Artigo();

                    art.CodArtigo = objList.Valor("Artigo");
                    art.DescArtigo = objList.Valor("Descricao");
                    art.PrecoMedio = objList.Valor("PCMedio");
                    art.IVA = objList.Valor("IVA");
                    art.StockAtual = objList.Valor("STKMaximo");

                    listArts.Add(art);
                    objList.Seguinte();
                }

                return listArts;

            }
            else
            {
                return null;

            }

        }

        #endregion Artigo

        #region ArtigoArmazem

        public static List<Models.ArtigoArmazem> ListaArtigoArmazens(string artigoID)
        {
            GcpBEArtigoArmazens objList;

            Models.ArtigoArmazem objArtArm;
            List<Models.ArtigoArmazem> listArtigoArmazens = new List<Models.ArtigoArmazem>();

            if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
            {
                objList = PriEngine.Engine.Comercial.ArtigosArmazens.ListaArtigosArmazens(artigoID);

                foreach(GcpBEArtigoArmazem artArmOffList in objList){
                    
                    objArtArm = new Models.ArtigoArmazem();

                    objArtArm.ArtigoID = artigoID;
                    objArtArm.ArmazemID = artArmOffList.get_Armazem();
                    objArtArm.Morada = artArmOffList.get_Localizacao();
                    objArtArm.Stock = artArmOffList.get_StkActual();

                    listArtigoArmazens.Add(objArtArm);
                }

            }

            return listArtigoArmazens;
        }

        #endregion ArtigoArmazem

       
    }
}