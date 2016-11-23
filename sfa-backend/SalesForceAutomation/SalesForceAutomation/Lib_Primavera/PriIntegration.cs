using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Interop.ErpBS900;
using Interop.StdPlatBS900;
using Interop.StdBE900;
using Interop.GcpBE900;
using ADODB;
using Interop.ICrmBS900;
using Interop.CrmBE900;
using System.Diagnostics;

namespace SalesForceAutomation.Lib_Primavera
{
    public class PriIntegration
    {

        # region Cliente

        public static List<Models.Cliente> get_all_clients()
        {


            StdBELista selectList;

            List<Models.Cliente> listClientes = new List<Models.Cliente>();

            if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
            {

                selectList = PriEngine.Engine.Consulta("SELECT Cliente, Nome, NomeFiscal, Fac_Tel, NumContrib, Fac_Mor FROM  CLIENTES");

                while (!selectList.NoFim())
                {
                    Models.Cliente cliente = new Models.Cliente();

                    cliente.CodCliente = selectList.Valor("Cliente");
                    cliente.Nome = selectList.Valor("Nome");
                    cliente.NomeFiscal = selectList.Valor("NomeFiscal");
                    cliente.Fac_Tel = selectList.Valor("Fac_Tel");
                    cliente.NumContribuinte = selectList.Valor("NumContrib");
                    cliente.Fac_Mor = selectList.Valor("Fac_Mor");

                    listClientes.Add(cliente);
                    selectList.Seguinte();

                }

                return listClientes;
            }
            else
                return null;
        }

        public static Models.Cliente get_client(string codCliente)
        {


            GcpBECliente objCli = new GcpBECliente();

            Models.Cliente cliente = new Models.Cliente();

            if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
            {

                if (PriEngine.Engine.Comercial.Clientes.Existe(codCliente) == true)
                {
                    objCli = PriEngine.Engine.Comercial.Clientes.Edita(codCliente);
                    cliente.CodCliente = objCli.get_Cliente();
                    cliente.Nome = objCli.get_Nome();
                    cliente.NomeFiscal = objCli.get_NomeFiscal();
                    cliente.Fac_Tel = objCli.get_Telefone();
                    cliente.NumContribuinte = objCli.get_NumContribuinte();
                    cliente.Fac_Mor = objCli.get_Morada();

                    return cliente;
                }
                else
                {
                    return null;
                }
            }
            else
                return null;
        }

        /*

        public static Models.RespostaErro UpdCliente(Models.Cliente cliente)
        {
            Models.RespostaErro erro = new Models.RespostaErro();


            GcpBECliente objCli = new GcpBECliente();

            try
            {

                if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
                {

                    if (PriEngine.Engine.Comercial.Clientes.Existe(cliente.CodCliente) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O cliente não existe";
                        return erro;
                    }
                    else
                    {

                        objCli = PriEngine.Engine.Comercial.Clientes.Edita(cliente.CodCliente);
                        objCli.set_EmModoEdicao(true);

                        objCli.set_Nome(cliente.NomeCliente);
                        objCli.set_NumContribuinte(cliente.NumContribuinte);
                        objCli.set_Moeda(cliente.Moeda);
                        objCli.set_Morada(cliente.Morada);

                        PriEngine.Engine.Comercial.Clientes.Actualiza(objCli);

                        erro.Erro = 0;
                        erro.Descricao = "Sucesso";
                        return erro;
                    }
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa";
                    return erro;

                }

            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }

        }


        public static Models.RespostaErro DelCliente(string codCliente)
        {

            Models.RespostaErro erro = new Models.RespostaErro();
            GcpBECliente objCli = new GcpBECliente();


            try
            {

                if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
                {
                    if (PriEngine.Engine.Comercial.Clientes.Existe(codCliente) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O cliente não existe";
                        return erro;
                    }
                    else
                    {

                        PriEngine.Engine.Comercial.Clientes.Remove(codCliente);
                        erro.Erro = 0;
                        erro.Descricao = "Sucesso";
                        return erro;
                    }
                }

                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa";
                    return erro;
                }
            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }

        }



        public static Models.RespostaErro InsereClienteObj(Models.Cliente cli)
        {

            Models.RespostaErro erro = new Models.RespostaErro();


            GcpBECliente myCli = new GcpBECliente();

            try
            {
                if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
                {

                    myCli.set_Cliente(cli.CodCliente);
                    myCli.set_Nome(cli.NomeCliente);
                    myCli.set_NumContribuinte(cli.NumContribuinte);
                    myCli.set_Moeda(cli.Moeda);
                    myCli.set_Morada(cli.Morada);

                    PriEngine.Engine.Comercial.Clientes.Actualiza(myCli);

                    erro.Erro = 0;
                    erro.Descricao = "Sucesso";
                    return erro;
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;
                }
            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }


        }


        */
        #endregion Cliente;   // -----------------------------  END   CLIENTE    -----------------------
        
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
                    art.Familia = objList.Valor("Familia");

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

        #region Familias

        public static List<Models.Familias> get_families()
        {
            StdBELista objList;

            Models.Familias familia = new Models.Familias();
            List<Models.Familias> listFamilies = new List<Models.Familias>();

            if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("SELECT Familia, Descricao FROM  Familias");
                
                while (!objList.NoFim())
                {
                    familia = new Models.Familias();
                    familia.Familia = objList.Valor("Familia");
                    familia.Descricao = objList.Valor("Descricao");

                    listFamilies.Add(familia);
                    objList.Seguinte();
                }

                return listFamilies;

            }
            else
            {
                return null;

            }
        }

        #endregion Familias

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

        #region DocCompra
        /*

        public static List<Models.DocCompra> VGR_List()
        {

            StdBELista objListCab;
            StdBELista objListLin;
            Models.DocCompra dc = new Models.DocCompra();
            List<Models.DocCompra> listdc = new List<Models.DocCompra>();
            Models.LinhaDocCompra lindc = new Models.LinhaDocCompra();
            List<Models.LinhaDocCompra> listlindc = new List<Models.LinhaDocCompra>();

            if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
            {
                objListCab = PriEngine.Engine.Consulta("SELECT id, NumDocExterno, Entidade, DataDoc, NumDoc, TotalMerc, Serie From CabecCompras where TipoDoc='VGR'");
                while (!objListCab.NoFim())
                {
                    dc = new Models.DocCompra();
                    dc.id = objListCab.Valor("id");
                    dc.NumDocExterno = objListCab.Valor("NumDocExterno");
                    dc.Entidade = objListCab.Valor("Entidade");
                    dc.NumDoc = objListCab.Valor("NumDoc");
                    dc.Data = objListCab.Valor("DataDoc");
                    dc.TotalMerc = objListCab.Valor("TotalMerc");
                    dc.Serie = objListCab.Valor("Serie");
                    objListLin = PriEngine.Engine.Consulta("SELECT idCabecCompras, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalILiquido, PrecoLiquido, Armazem, Lote from LinhasCompras where IdCabecCompras='" + dc.id + "' order By NumLinha");
                    listlindc = new List<Models.LinhaDocCompra>();

                    while (!objListLin.NoFim())
                    {
                        lindc = new Models.LinhaDocCompra();
                        lindc.IdCabecDoc = objListLin.Valor("idCabecCompras");
                        lindc.CodArtigo = objListLin.Valor("Artigo");
                        lindc.DescArtigo = objListLin.Valor("Descricao");
                        lindc.Quantidade = objListLin.Valor("Quantidade");
                        lindc.Unidade = objListLin.Valor("Unidade");
                        lindc.Desconto = objListLin.Valor("Desconto1");
                        lindc.PrecoUnitario = objListLin.Valor("PrecUnit");
                        lindc.TotalILiquido = objListLin.Valor("TotalILiquido");
                        lindc.TotalLiquido = objListLin.Valor("PrecoLiquido");
                        lindc.Armazem = objListLin.Valor("Armazem");
                        lindc.Lote = objListLin.Valor("Lote");

                        listlindc.Add(lindc);
                        objListLin.Seguinte();
                    }

                    dc.LinhasDoc = listlindc;

                    listdc.Add(dc);
                    objListCab.Seguinte();
                }
            }
            return listdc;
        }


        public static Models.RespostaErro VGR_New(Models.DocCompra dc)
        {
            Models.RespostaErro erro = new Models.RespostaErro();


            GcpBEDocumentoCompra myGR = new GcpBEDocumentoCompra();
            GcpBELinhaDocumentoCompra myLin = new GcpBELinhaDocumentoCompra();
            GcpBELinhasDocumentoCompra myLinhas = new GcpBELinhasDocumentoCompra();

            PreencheRelacaoCompras rl = new PreencheRelacaoCompras();
            List<Models.LinhaDocCompra> lstlindv = new List<Models.LinhaDocCompra>();

            try
            {
                if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
                {
                    // Atribui valores ao cabecalho do doc
                    //myEnc.set_DataDoc(dv.Data);
                    myGR.set_Entidade(dc.Entidade);
                    myGR.set_NumDocExterno(dc.NumDocExterno);
                    myGR.set_Serie(dc.Serie);
                    myGR.set_Tipodoc("VGR");
                    myGR.set_TipoEntidade("F");
                    // Linhas do documento para a lista de linhas
                    lstlindv = dc.LinhasDoc;
                    //PriEngine.Engine.Comercial.Compras.PreencheDadosRelacionados(myGR,rl);
                    PriEngine.Engine.Comercial.Compras.PreencheDadosRelacionados(myGR);
                    foreach (Models.LinhaDocCompra lin in lstlindv)
                    {
                        PriEngine.Engine.Comercial.Compras.AdicionaLinha(myGR, lin.CodArtigo, lin.Quantidade, lin.Armazem, "", lin.PrecoUnitario, lin.Desconto);
                    }


                    PriEngine.Engine.IniciaTransaccao();
                    PriEngine.Engine.Comercial.Compras.Actualiza(myGR, "Teste");
                    PriEngine.Engine.TerminaTransaccao();
                    erro.Erro = 0;
                    erro.Descricao = "Sucesso";
                    return erro;
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;

                }

            }
            catch (Exception ex)
            {
                PriEngine.Engine.DesfazTransaccao();
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }
        }

        */
        #endregion DocCompra

        #region DocsVenda
        /*
        public static Models.RespostaErro Encomendas_New(Models.DocVenda dv)
        {
            Models.RespostaErro erro = new Models.RespostaErro();
            GcpBEDocumentoVenda myEnc = new GcpBEDocumentoVenda();

            GcpBELinhaDocumentoVenda myLin = new GcpBELinhaDocumentoVenda();

            GcpBELinhasDocumentoVenda myLinhas = new GcpBELinhasDocumentoVenda();

            PreencheRelacaoVendas rl = new PreencheRelacaoVendas();
            List<Models.LinhaDocVenda> lstlindv = new List<Models.LinhaDocVenda>();

            try
            {
                if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
                {
                    // Atribui valores ao cabecalho do doc
                    //myEnc.set_DataDoc(dv.Data);
                    myEnc.set_Entidade(dv.Entidade);
                    myEnc.set_Serie(dv.Serie);
                    myEnc.set_Tipodoc("ECL");
                    myEnc.set_TipoEntidade("C");
                    // Linhas do documento para a lista de linhas
                    lstlindv = dv.LinhasDoc;
                    //PriEngine.Engine.Comercial.Vendas.PreencheDadosRelacionados(myEnc, rl);
                    PriEngine.Engine.Comercial.Vendas.PreencheDadosRelacionados(myEnc);
                    foreach (Models.LinhaDocVenda lin in lstlindv)
                    {
                        PriEngine.Engine.Comercial.Vendas.AdicionaLinha(myEnc, lin.CodArtigo, lin.Quantidade, "", "", lin.PrecoUnitario, lin.Desconto);
                    }


                    // PriEngine.Engine.Comercial.Compras.TransformaDocumento(

                    PriEngine.Engine.IniciaTransaccao();
                    //PriEngine.Engine.Comercial.Vendas.Edita Actualiza(myEnc, "Teste");
                    PriEngine.Engine.Comercial.Vendas.Actualiza(myEnc, "Teste");
                    PriEngine.Engine.TerminaTransaccao();
                    erro.Erro = 0;
                    erro.Descricao = "Sucesso";
                    return erro;
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;

                }

            }
            catch (Exception ex)
            {
                PriEngine.Engine.DesfazTransaccao();
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }
        }



        public static List<Model.DocVenda> Encomendas_List()
        {

            StdBELista objListCab;
            StdBELista objListLin;
            Model.DocVenda dv = new Model.DocVenda();
            List<Model.DocVenda> listdv = new List<Model.DocVenda>();
            Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
            List<Model.LinhaDocVenda> listlindv = new
            List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objListCab = PriEngine.Engine.Consulta("SELECT id, Entidade, Data, NumDoc, TotalMerc, Serie From CabecDoc where TipoDoc='ECL'");
                while (!objListCab.NoFim())
                {
                    dv = new Model.DocVenda();
                    dv.id = objListCab.Valor("id");
                    dv.Entidade = objListCab.Valor("Entidade");
                    dv.NumDoc = objListCab.Valor("NumDoc");
                    dv.Data = objListCab.Valor("Data");
                    dv.TotalMerc = objListCab.Valor("TotalMerc");
                    dv.Serie = objListCab.Valor("Serie");
                    objListLin = PriEngine.Engine.Consulta("SELECT idCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalILiquido, PrecoLiquido from LinhasDoc where IdCabecDoc='" + dv.id + "' order By NumLinha");
                    listlindv = new List<Model.LinhaDocVenda>();

                    while (!objListLin.NoFim())
                    {
                        lindv = new Model.LinhaDocVenda();
                        lindv.IdCabecDoc = objListLin.Valor("idCabecDoc");
                        lindv.CodArtigo = objListLin.Valor("Artigo");
                        lindv.DescArtigo = objListLin.Valor("Descricao");
                        lindv.Quantidade = objListLin.Valor("Quantidade");
                        lindv.Unidade = objListLin.Valor("Unidade");
                        lindv.Desconto = objListLin.Valor("Desconto1");
                        lindv.PrecoUnitario = objListLin.Valor("PrecUnit");
                        lindv.TotalILiquido = objListLin.Valor("TotalILiquido");
                        lindv.TotalLiquido = objListLin.Valor("PrecoLiquido");

                        listlindv.Add(lindv);
                        objListLin.Seguinte();
                    }

                    dv.LinhasDoc = listlindv;
                    listdv.Add(dv);
                    objListCab.Seguinte();
                }
            }
            return listdv;
        }



        public static Models.DocVenda Encomenda_Get(string numdoc)
        {


            StdBELista objListCab;
            StdBELista objListLin;
            Models.DocVenda dv = new Models.DocVenda();
            Models.LinhaDocVenda lindv = new Models.LinhaDocVenda();
            List<Models.LinhaDocVenda> listlindv = new List<Models.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
            {


                string st = "SELECT id, Entidade, Data, NumDoc, TotalMerc, Serie From CabecDoc where TipoDoc='ECL' and NumDoc='" + numdoc + "'";
                objListCab = PriEngine.Engine.Consulta(st);
                dv = new Models.DocVenda();
                dv.id = objListCab.Valor("id");
                dv.Entidade = objListCab.Valor("Entidade");
                dv.NumDoc = objListCab.Valor("NumDoc");
                dv.Data = objListCab.Valor("Data");
                dv.TotalMerc = objListCab.Valor("TotalMerc");
                dv.Serie = objListCab.Valor("Serie");
                objListLin = PriEngine.Engine.Consulta("SELECT idCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalILiquido, PrecoLiquido from LinhasDoc where IdCabecDoc='" + dv.id + "' order By NumLinha");
                listlindv = new List<Models.LinhaDocVenda>();

                while (!objListLin.NoFim())
                {
                    lindv = new Models.LinhaDocVenda();
                    lindv.IdCabecDoc = objListLin.Valor("idCabecDoc");
                    lindv.CodArtigo = objListLin.Valor("Artigo");
                    lindv.DescArtigo = objListLin.Valor("Descricao");
                    lindv.Quantidade = objListLin.Valor("Quantidade");
                    lindv.Unidade = objListLin.Valor("Unidade");
                    lindv.Desconto = objListLin.Valor("Desconto1");
                    lindv.PrecoUnitario = objListLin.Valor("PrecUnit");
                    lindv.TotalILiquido = objListLin.Valor("TotalILiquido");
                    lindv.TotalLiquido = objListLin.Valor("PrecoLiquido");
                    listlindv.Add(lindv);
                    objListLin.Seguinte();
                }

                dv.LinhasDoc = listlindv;
                return dv;
            }
            return null;
        }
        */
        #endregion DocsVenda

        #region Reuniao

        public static List<Models.Reuniao> get_all_meetings()
        {

            StdBELista selectList;

            Models.Reuniao reuniao;

            List<Models.Reuniao> listReunioes = new List<Models.Reuniao>();

            if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
            {

                selectList = PriEngine.Engine.Consulta("SELECT * FROM Tarefas LEFT JOIN TiposTarefa ON TipoActividade = 'REUN'");

                while(!selectList.NoFim())
                {
                    Console.WriteLine(selectList.NumLinhas());
                    reuniao = new Models.Reuniao();

                    reuniao.CodReuniao = selectList.Valor("Id");
                    reuniao.CodVendedor = selectList.Valor("CriadoPor");
                    reuniao.Descricao = selectList.Valor("Descricao");
                    reuniao.Notas = selectList.Valor("Resumo");
                    reuniao.Prioridade = selectList.Valor("Prioridade");
                    reuniao.DataInicio = selectList.Valor("DataInicio");
                    reuniao.DataFim = selectList.Valor("DataFim");
                    reuniao.TodoDia = selectList.Valor("TodoDia");
                    reuniao.Duracao = selectList.Valor("Duracao");
                    reuniao.ContactoCliente = selectList.Valor("IdContactoPrincipal");
                    reuniao.Oportunidade = selectList.Valor("IDCabecOVenda");

                    listReunioes.Add(reuniao);
                    selectList.Seguinte();
                }

                return listReunioes;
            }
            else
                return null;
        }

        public static Models.Reuniao GetReuniao(string codReuniao)
        {
            Debug.WriteLine(codReuniao);
            
            Models.Reuniao reuniao = new Models.Reuniao();

            if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
            {
                if (PriEngine.Engine.CRM.Actividades.Existe(codReuniao) == false)
                {
                    Debug.WriteLine("NOT FOUND");
                    return null;
                }
                else
                {
                    CrmBEActividade objReuniao = PriEngine.Engine.CRM.Actividades.Edita(codReuniao);
                    reuniao.CodReuniao = objReuniao.get_ID();
                    reuniao.CodVendedor = objReuniao.get_CriadoPor();
                    reuniao.Descricao = objReuniao.get_Descricao();
                    reuniao.Notas = objReuniao.get_Resumo();
                    reuniao.Prioridade = Int32.Parse(objReuniao.get_Prioridade());
                    reuniao.DataInicio = objReuniao.get_DataInicio();
                    reuniao.DataFim = objReuniao.get_DataFim();
                    reuniao.TodoDia = objReuniao.get_TodoDia();
                    reuniao.Duracao = objReuniao.get_Duracao();
                    reuniao.ContactoCliente = objReuniao.get_IDContactoPrincipal();
                    reuniao.Oportunidade = objReuniao.get_IDCabecOVenda();

                    return reuniao;
                }

            }
            else
            {
                return null;
            }

        }

        #endregion Reuniao

        #region OportunidadeVenda

        public static Models.OportunidadeVenda get_oportVenda(string id)
        {

            Models.OportunidadeVenda oport = new Models.OportunidadeVenda();

            if (PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim()) == true)
            {
                if (PriEngine.Engine.CRM.OportunidadesVenda.Existe(id))
                {

                    CrmBEOportunidadeVenda venda = PriEngine.Engine.CRM.OportunidadesVenda.Edita(id);

                    oport.Id = venda.get_ID();
                    oport.NumEncomenda = venda.get_NumEncomenda();
                    oport.Entidade = venda.get_Entidade();
                    oport.CicloVenda = venda.get_CicloVenda();

                    Debug.WriteLine(oport.CicloVenda);

                    CrmBECicloVenda cicloVenda = PriEngine.Engine.CRM.CiclosVenda.Edita(oport.CicloVenda);
                    StdBECampos campos = cicloVenda.get_CamposUtil();
                    int i = campos.NumItens;
                    Debug.WriteLine(i);

                    return oport;

                }else{
                    Debug.WriteLine("Oportunidade de venda não existe");
                    return null;
                }
            }else{
                return null;
            }

        }

        #endregion OportunidadeVenda

    }
}