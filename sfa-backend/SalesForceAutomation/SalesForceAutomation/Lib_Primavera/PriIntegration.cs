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
using System.Collections;
using SalesForceAutomation.Models;

namespace SalesForceAutomation.Lib_Primavera
{
    public class PriIntegration
    {
        public static int TIMESPAN_STATISTIC = 6 * 30;
        public static bool start = PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim());
        public static Boolean initializeCompany(){
            if (!PriEngine.isCompanyInitialized())
            {
                PriEngine.InitializeCompany(SalesForceAutomation.Properties.Settings.Default.Company.Trim(), SalesForceAutomation.Properties.Settings.Default.User.Trim(), SalesForceAutomation.Properties.Settings.Default.Password.Trim());
                return true;
            }
            else
            {
                return true;
            }
        }

        # region Cliente

        public static List<Models.Cliente> GetClientes()
        {

            StdBELista selectList;

            List<Models.Cliente> listClientes = new List<Models.Cliente>();

            if (initializeCompany() == true)
            {

                selectList = PriEngine.Engine.Consulta("SELECT Cliente, Nome, NomeFiscal, Fac_Tel, NumContrib, B2BEnderecoMail, Fac_Mor, Desconto, TotalDeb, EncomendasPendentes FROM  CLIENTES");

                while (!selectList.NoFim())
                {
                    Models.Cliente cliente = new Models.Cliente();

                    cliente.CodCliente = selectList.Valor("Cliente");
                    cliente.Nome = selectList.Valor("Nome");
                    cliente.NomeFiscal = selectList.Valor("NomeFiscal");
                    cliente.Fac_Tel = selectList.Valor("Fac_Tel");
                    cliente.NumContribuinte = selectList.Valor("NumContrib");
                    cliente.Fac_Mor = selectList.Valor("Fac_Mor");
                    cliente.Email = selectList.Valor("B2BEnderecoMail");
                    cliente.DescEntidade = selectList.Valor("Desconto");
                    cliente.ContaCorrente = selectList.Valor("TotalDeb");
                    cliente.EncomendasPendentes = selectList.Valor("EncomendasPendentes");

                    listClientes.Add(cliente);
                    selectList.Seguinte();

                }

                return listClientes;
            }
            else
                return null;
        }

        public static Models.Cliente GetCliente(string codCliente)
        {


            GcpBECliente objCli = new GcpBECliente();

            Models.Cliente cliente = new Models.Cliente();

            if (initializeCompany() == true)
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
                    cliente.Email = objCli.get_B2BEnderecoMail();
                    cliente.DescEntidade = objCli.get_Desconto();
                    cliente.ContaCorrente = objCli.get_DebitoContaCorrente();
                    cliente.EncomendasPendentes = objCli.get_DebitoEncomendasPendentes();

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

        public static Models.RespostaErro PostCliente(Models.Cliente cliente)
        {

                Models.RespostaErro erro = new Models.RespostaErro();


                GcpBECliente newCliente = new GcpBECliente();

            try
            {
                if (initializeCompany() == true)
                {
                        cliente.CodCliente = Tools.Tools.Truncate(cliente.CodCliente, 12);
                        newCliente.set_Cliente(cliente.CodCliente);
                        newCliente.set_Nome(cliente.Nome);
                        newCliente.set_NomeFiscal(cliente.NomeFiscal);
                        newCliente.set_NumContribuinte(cliente.NumContribuinte);
                        newCliente.set_Morada(cliente.Fac_Mor);
                        newCliente.set_Telefone(cliente.Fac_Tel);
                        newCliente.set_B2BEnderecoMail(cliente.Email);
                        newCliente.set_Desconto(cliente.DescEntidade);
                        newCliente.set_Moeda("EUR");
                        newCliente.set_CondPag(cliente.CondPag);
                        newCliente.set_ModoPag("NUM");

                        PriEngine.Engine.Comercial.Clientes.Actualiza(newCliente);

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
                    Debug.WriteLine(ex.Message);
                    return erro;
                }


            }

        public static Models.RespostaErro PutCliente(Models.Cliente cliente)
        {
            Models.RespostaErro erro = new Models.RespostaErro();


            GcpBECliente objCli = new GcpBECliente();

            try
            {

                if (initializeCompany() == true)
                {

                    if (PriEngine.Engine.Comercial.Clientes.Existe(cliente.CodCliente) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O cliente não existe.";
                        return erro;
                    }
                    else
                    {
                        objCli = PriEngine.Engine.Comercial.Clientes.Edita(cliente.CodCliente);
                        objCli.set_EmModoEdicao(true);

                        objCli.set_Nome(cliente.Nome);
                        objCli.set_NomeFiscal(cliente.NomeFiscal);
                        objCli.set_NumContribuinte(cliente.NumContribuinte);
                        objCli.set_Morada(cliente.Fac_Mor);
                        objCli.set_Telefone(cliente.Fac_Tel);
                        objCli.set_B2BEnderecoMail(cliente.Email);

                        PriEngine.Engine.Comercial.Clientes.Actualiza(objCli);

                        erro.Erro = 0;
                        erro.Descricao = "Sucesso.";
                        return erro;
                    }
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa.";
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

        #endregion Cliente;   // -----------------------------  END   CLIENTE    -----------------------
        
        #region Artigo

        public static Models.Artigo GetArtigo(string codArtigo)
        {

            GcpBEArtigo objArtigo = new GcpBEArtigo();
            GcpBEArtigoMoeda artigoMoeda;
            Models.Artigo myArt = new Models.Artigo();

            if (initializeCompany() == true)
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
                    myArt.IVA = objArtigo.get_IVA();
                    myArt.StockAtual = objArtigo.get_StkActual();

                    artigoMoeda = PriEngine.Engine.Comercial.ArtigosPrecos.Edita(codArtigo, "EUR", objArtigo.get_UnidadeSaida());

                    myArt.UnidadeVenda = artigoMoeda.get_Unidade();
                    myArt.PVP1 = artigoMoeda.get_PVP1();
                    myArt.PVP2 = artigoMoeda.get_PVP2();
                    myArt.PVP3 = artigoMoeda.get_PVP3();
                    myArt.PVP4 = artigoMoeda.get_PVP4();
                    myArt.PVP5 = artigoMoeda.get_PVP5();
                    myArt.PVP6 = artigoMoeda.get_PVP6();


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
            GcpBEArtigoMoeda artigoMoeda;

            Models.Artigo art = new Models.Artigo();
            List<Models.Artigo> listArts = new List<Models.Artigo>();
            

            if (initializeCompany() == true)
            {

                try{
                    objList = PriEngine.Engine.Consulta("Select Artigo.Artigo AS CodArtigo, Descricao, Artigo.IVA AS IVA, STKMaximo, Familia, ArtigoMoeda.Unidade AS Unidade, PVP1, PVP2, PVP3, PVP4, PVP5, PVP6 FROM Artigo, ArtigoMoeda WHERE Artigo.Artigo = ArtigoMoeda.Artigo AND Artigo.UnidadeVenda = ArtigoMoeda.Unidade");

                while (!objList.NoFim())
                {
                    art = new Models.Artigo();

                    art.CodArtigo = objList.Valor("CodArtigo");
                    art.DescArtigo = objList.Valor("Descricao");
                    art.IVA = objList.Valor("IVA");
                    art.StockAtual = objList.Valor("STKMaximo");
                    art.Familia = objList.Valor("Familia");

                    art.UnidadeVenda = objList.Valor("Unidade");
                    art.PVP1 = objList.Valor("PVP1");
                    art.PVP2 = objList.Valor("PVP2");
                    art.PVP3 = objList.Valor("PVP3");
                    art.PVP4 = objList.Valor("PVP4");
                    art.PVP5 = objList.Valor("PVP5");
                    art.PVP6 = objList.Valor("PVP6");

                    listArts.Add(art);
                    objList.Seguinte();
                }
            }catch(Exception e){

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

            if (initializeCompany() == true)
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

            if (initializeCompany() == true)
            {
                objList = PriEngine.Engine.Comercial.ArtigosArmazens.ListaArtigosArmazens(artigoID);

                foreach(GcpBEArtigoArmazem artArmOffList in objList){
                    
                    objArtArm = new Models.ArtigoArmazem();

                    objArtArm.ArtigoID = artigoID;
                    objArtArm.Armazem = artArmOffList.get_Localizacao();
                    objArtArm.Stock = artArmOffList.get_StkActual();
                    objArtArm.Lote = artArmOffList.get_Lote();

                    GcpBEArmazem armazem = PriEngine.Engine.Comercial.Armazens.Edita(artArmOffList.get_Armazem());

                    objArtArm.CodPost = armazem.get_CodigoPostal();
                    objArtArm.Localidade = armazem.get_Localidade();
                    objArtArm.Morada = armazem.get_Morada();


                    listArtigoArmazens.Add(objArtArm);
                }

            }

            return listArtigoArmazens;
        }

        #endregion ArtigoArmazem

       #region TiposReuniao

        public static List<Models.TiposReuniao> GetTiposReuniao()
        {
            StdBELista selectList;

            Models.TiposReuniao tipoReuniao;

            List<Models.TiposReuniao> listReunioes = new List<Models.TiposReuniao>();

            if (initializeCompany() == true)
            {
                selectList = PriEngine.Engine.CRM.Actividades.LstTiposActividade();

                while (!selectList.NoFim())
                {
                    Console.WriteLine(selectList.NumLinhas());
                    tipoReuniao = new Models.TiposReuniao();

                    tipoReuniao.Id = selectList.Valor("Id");
                    tipoReuniao.Tipo = selectList.Valor("TipoActividade");
                    tipoReuniao.Descricao = selectList.Valor("Descricao");

                    listReunioes.Add(tipoReuniao);
                    selectList.Seguinte();
                }

                return listReunioes;
            }
            else
                return null;
        }

        #endregion TiposReuniao

        #region Reuniao

        public static List<Models.Reuniao> GetReunioes()
        {

            StdBELista selectList;

            Models.Reuniao reuniao;

            List<Models.Reuniao> listReunioes = new List<Models.Reuniao>();

            if (initializeCompany() == true)
            {

                //selectList = PriEngine.Engine.CRM.Actividades.LstActividades();
                selectList = PriEngine.Engine.Consulta("SELECT Tarefas.Id AS RId, TiposTarefa.Descricao AS Tipo, * FROM Tarefas LEFT JOIN TiposTarefa ON IdTipoActividade=TiposTarefa.Id");

                while(!selectList.NoFim())
                {
                    Console.WriteLine(selectList.NumLinhas());
                    reuniao = new Models.Reuniao();

                    reuniao.CodReuniao = selectList.Valor("RId");
                    reuniao.Tipo = selectList.Valor("Tipo");
                    reuniao.TipoId = selectList.Valor("IdTipoActividade");
                    reuniao.CodVendedor = selectList.Valor("CriadoPor");
                    reuniao.Descricao = selectList.Valor("Descricao");
                    reuniao.Notas = selectList.Valor("Resumo");
                    reuniao.Prioridade = selectList.Valor("Prioridade").ToString();
                    reuniao.DataInicio = selectList.Valor("DataInicio");
                    reuniao.DataFim = selectList.Valor("DataFim");
                    reuniao.TodoDia = selectList.Valor("TodoDia");
                    reuniao.Duracao = selectList.Valor("Duracao");
                    reuniao.Entidade = selectList.Valor("EntidadePrincipal");
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
            Models.Reuniao reuniao = new Models.Reuniao();

            if (initializeCompany() == true)
            {
                if (PriEngine.Engine.CRM.Actividades.Existe(codReuniao) == false)
                {
                    return null;
                }
                else
                {
                    CrmBEActividade objReuniao = PriEngine.Engine.CRM.Actividades.Edita(codReuniao);
                    reuniao.CodReuniao = objReuniao.get_ID();
                    reuniao.TipoId = objReuniao.get_IDTipoActividade();
                    reuniao.CodVendedor = objReuniao.get_CriadoPor();
                    reuniao.Descricao = objReuniao.get_Descricao();
                    reuniao.Notas = objReuniao.get_Resumo();
                    reuniao.Prioridade = objReuniao.get_Prioridade();
                    reuniao.DataInicio = objReuniao.get_DataInicio();
                    reuniao.DataFim = objReuniao.get_DataFim();
                    reuniao.TodoDia = objReuniao.get_TodoDia();
                    reuniao.Duracao = objReuniao.get_Duracao();
                    reuniao.Entidade = objReuniao.get_EntidadePrincipal();
                    reuniao.Oportunidade = objReuniao.get_IDCabecOVenda();

                    return reuniao;
                }

            }
            else
            {
                return null;
            }

        }

        public static Models.RespostaErro PostReuniao(Models.Reuniao reuniao)
        {
            Models.RespostaErro erro = new Models.RespostaErro();

            CrmBEActividade actividade = new CrmBEActividade();
           
            try
            {
                if (initializeCompany() == true)
                {

                    /****************************************************************************************************
                     *                                     criar Tarefa
                     ****************************************************************************************************/
                    actividade.set_IDTipoActividade(reuniao.TipoId);
                    actividade.set_Descricao(reuniao.Descricao);
                    actividade.set_DataInicio(Convert.ToDateTime(reuniao.DataInicio));
                    actividade.set_DataFim(Convert.ToDateTime(reuniao.DataFim));
                    actividade.set_DataCriacao(DateTime.Now);
                    actividade.set_CriadoPor(reuniao.CodVendedor);
                    actividade.set_Resumo(reuniao.Notas);
                    actividade.set_Prioridade(reuniao.Prioridade.ToString());
                    actividade.set_TodoDia(reuniao.TodoDia);
                    actividade.set_EntidadePrincipal(reuniao.Entidade);
                    actividade.set_Estado("0"); // a realizar

                    // guardar Tarefa
                    PriEngine.Engine.CRM.Actividades.Actualiza(actividade);

                    reuniao.CodReuniao = actividade.get_ID();
                    erro.Data = reuniao;
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

        public static Models.RespostaErro PutReuniao(Models.Reuniao meeting)
        {
            Models.RespostaErro erro = new Models.RespostaErro();

            CrmBEActividade actividade = new CrmBEActividade();

            try
            {

                if (initializeCompany() == true)
                {

                    if (PriEngine.Engine.CRM.Actividades.Existe(meeting.CodReuniao) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "A reunião não existe.";
                        return erro;
                    }
                    else
                    {
                        actividade = PriEngine.Engine.CRM.Actividades.Edita(meeting.CodReuniao);
                        actividade.set_EmModoEdicao(true);

                        actividade.set_IDTipoActividade(meeting.TipoId);
                        actividade.set_CriadoPor(meeting.CodVendedor);
                        actividade.set_Descricao(meeting.Descricao);
                        actividade.set_DataInicio(meeting.DataInicio);
                        actividade.set_DataFim(meeting.DataFim);
                        actividade.set_Resumo(meeting.Notas);
                        actividade.set_Prioridade(meeting.Prioridade.ToString());
                        actividade.set_TodoDia(meeting.TodoDia);
                        actividade.set_EntidadePrincipal(meeting.Entidade);

                        PriEngine.Engine.CRM.Actividades.Actualiza(actividade);

                        erro.Erro = 0;
                        erro.Descricao = "Sucesso.";
                        return erro;
                    }
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa.";
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

        public static Models.RespostaErro DeleteReuniao(Models.Reuniao meeting)
        {

            Models.RespostaErro erro = new Models.RespostaErro();

            try
            {

                if (initializeCompany() == true)
                {

                    if (PriEngine.Engine.CRM.Actividades.Existe(meeting.CodReuniao) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O cliente não existe.";
                        return erro;
                    }
                    else
                    {
                        PriEngine.Engine.CRM.Actividades.Remove(meeting.CodReuniao);

                        erro.Erro = 0;
                        erro.Descricao = "Sucesso.";
                        return erro;
                    }
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa.";
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

        #endregion Reuniao

        #region ClienteReuniao

        public static List<Models.Reuniao> GetReuniaoCliente(string codEntidade)
        {
            Debug.WriteLine(codEntidade);

            StdBELista selectList;
            Models.Reuniao reuniao;

            List<Models.Reuniao> listReunioes = new List<Models.Reuniao>();

            if (initializeCompany() == true)
            {
                selectList = PriEngine.Engine.Consulta("SELECT Tarefas.Id AS RId, TiposTarefa.Descricao AS Tipo, * FROM Tarefas LEFT JOIN TiposTarefa ON IdTipoActividade=TiposTarefa.Id WHERE EntidadePrincipal = '" + codEntidade + "'");

                while (!selectList.NoFim())
                {
                    Console.WriteLine(selectList.NumLinhas());
                    reuniao = new Models.Reuniao();

                    reuniao.CodReuniao = selectList.Valor("RId");
                    reuniao.Tipo = selectList.Valor("Tipo");
                    reuniao.TipoId = selectList.Valor("IdTipoActividade");
                    reuniao.CodVendedor = selectList.Valor("CriadoPor");
                    reuniao.Descricao = selectList.Valor("Descricao");
                    reuniao.Notas = selectList.Valor("Resumo");
                    reuniao.Prioridade = selectList.Valor("Prioridade").ToString();
                    reuniao.DataInicio = selectList.Valor("DataInicio");
                    reuniao.DataFim = selectList.Valor("DataFim");
                    reuniao.TodoDia = selectList.Valor("TodoDia");
                    reuniao.Duracao = selectList.Valor("Duracao");
                    reuniao.Entidade = selectList.Valor("EntidadePrincipal");
                    reuniao.Oportunidade = selectList.Valor("IDCabecOVenda");

                    listReunioes.Add(reuniao);
                    selectList.Seguinte();
                }

                return listReunioes;
            }
            else
                return null;

        }

        #endregion ClienteReuniao

        #region OportunidadeVenda

        public static Models.OportunidadeVenda GetOportunidadeVenda(string id)
        {

            Models.OportunidadeVenda oport = new Models.OportunidadeVenda();

            try
            {
                if (initializeCompany() == true)
                {
                    if (PriEngine.Engine.CRM.OportunidadesVenda.ExisteID(id))
                    {

                        CrmBEOportunidadeVenda oportVenda = PriEngine.Engine.CRM.OportunidadesVenda.EditaID(id);

                        oport.Id = oportVenda.get_ID();
                        oport.NumEncomenda = oportVenda.get_NumEncomenda();
                        oport.Entidade = oportVenda.get_Entidade();
                        Debug.WriteLine(oportVenda.get_ID());

                        // obter lista de artigos associados à oportunidade
                        CrmBELinhasPropostaOPV listaOportunidades = PriEngine.Engine.CRM.PropostasOPV.Edita(oport.Id, 1).get_Linhas();
                        oport.Artigos = new List<string>();
                        foreach (CrmBELinhaPropostaOPV oportunidade in listaOportunidades)
                        {
                            oport.Artigos.Add(oportunidade.get_Artigo());
                        }

                        return oport;

                    }
                    else
                    {
                        Debug.WriteLine("Oportunidade de venda não existe.");
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e) { return null; }

        }

        public static Models.RespostaErro PostOportunidadeVenda(Models.OportunidadeVenda oport)
        {

            Models.RespostaErro erro = new Models.RespostaErro();

            CrmBEActividade actividade = new CrmBEActividade();
            CrmBEOportunidadeVenda novaOport = new CrmBEOportunidadeVenda();
           
            try
            {
                if (initializeCompany() == true)
                {


                    /****************************************************************************************************
                     *                                     criar OportunidadeVenda
                     ****************************************************************************************************/
                    string oportId = "OVenda_" + DateTime.Now.ToString("yyyyMMddHHmmss");
                    novaOport.set_Oportunidade(oportId.Substring(0, 20));
                    novaOport.set_Descricao(oport.Descricao);
                    novaOport.set_Entidade(oport.Entidade);
                    novaOport.set_TipoEntidade("C");    // Tipo Entidade é Cliente
                    novaOport.set_DataCriacao(DateTime.Now);
                    novaOport.set_DataExpiracao(DateTime.Now.AddDays(30));
                    novaOport.set_Moeda("EUR");
                    novaOport.set_CicloVenda(PriEngine.Engine.CRM.CiclosVenda.CicloPorDefeito());
                    novaOport.set_Vendedor(oport.CodVendedor);

                    // guardar OportunidadeVenda
                    PriEngine.Engine.CRM.OportunidadesVenda.Actualiza(novaOport);
                    PriEngine.Engine.CRM.Actividades.ActualizaValorAtributo(oport.CodReuniao, "IDCabecOVenda", novaOport.get_ID());
                    oport.Id = novaOport.get_ID();

                    /****************************************************************************************************
                     *                                     criar PropostaVenda
                     ****************************************************************************************************/
                    CrmBEPropostaOPV proposta = new CrmBEPropostaOPV();
                    proposta.set_IdOportunidade(novaOport.get_ID());
                    proposta.set_NumProposta(1);

                    /****************************************************************************************************
                     *                                     criar LinhasPropostaVenda
                     ****************************************************************************************************/
                    CrmBELinhasPropostaOPV linhasProposta = new CrmBELinhasPropostaOPV();

                    for (int i = 0; i < oport.Artigos.Count; i++)
                    {
                        // preencher linha de proposta
                        CrmBELinhaPropostaOPV linhaProposta = PriEngine.Engine.CRM.PropostasOPV.PreencheLinhaProposta("EUR", oport.Artigos[i], 0, "C", oport.Entidade);
                        linhaProposta.set_IdOportunidade(novaOport.get_ID());
                        linhaProposta.set_NumProposta(1);
                        linhasProposta.Insere(linhaProposta);   
     
                    }
                    /****************************************************************************************************
                     *                                     guardar linhas e atualizar PropostaVenda
                     ****************************************************************************************************/
                    proposta.set_Linhas(linhasProposta);
                    PriEngine.Engine.CRM.PropostasOPV.Actualiza(proposta);

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
                Debug.WriteLine(ex.Message);
                return erro;
            }   
        }

        public static Models.RespostaErro PutOportunidadeVenda(Models.OportunidadeVenda oport)
        {
            Models.RespostaErro erro = new Models.RespostaErro();

            CrmBEOportunidadeVenda oportunidade = new CrmBEOportunidadeVenda();

            try
            {
                if (initializeCompany() == true)
                {

                    if (PriEngine.Engine.CRM.OportunidadesVenda.ExisteID(oport.Id))
                    {
                        oportunidade = PriEngine.Engine.CRM.OportunidadesVenda.EditaID(oport.Id);
                        oportunidade.set_Descricao(oport.Descricao);
                        oportunidade.set_DataExpiracao(DateTime.Now.AddDays(30));

                        // atualizar OportunidadeVenda
                        PriEngine.Engine.CRM.OportunidadesVenda.Actualiza(oportunidade);

                        /****************************************************************************************************
                         *                                     criar novas LinhasPropostaVenda
                         ****************************************************************************************************/
                        CrmBELinhasPropostaOPV linhasProposta = new CrmBELinhasPropostaOPV();

                        for (int i = 0; i < oport.Artigos.Count; i++)
                        {
                            // preencher linha de proposta
                            CrmBELinhaPropostaOPV linhaProposta = PriEngine.Engine.CRM.PropostasOPV.PreencheLinhaProposta("EUR", oport.Artigos[i], 0, "C", oport.Entidade);
                            linhaProposta.set_IdOportunidade(oport.Id);
                            linhaProposta.set_NumProposta(1);
                            linhasProposta.Insere(linhaProposta);
                        }
                        Debug.WriteLine("AFTER LINHA PROPOSTA");

                        /****************************************************************************************************
                         *                                     guardar linhas e atualizar PropostaVenda
                         ****************************************************************************************************/
                        try
                        {
                            CrmBEPropostaOPV proposta = PriEngine.Engine.CRM.PropostasOPV.Edita(oport.Id, 1);
                            proposta.set_EmModoEdicao(true);
                            proposta.set_Linhas(linhasProposta);
                            PriEngine.Engine.CRM.PropostasOPV.Actualiza(proposta);
                        }
                        catch (Exception e) { }

                        erro.Erro = 0;
                        erro.Descricao = "Sucesso";
                        return erro;
                    }
                    else
                    {
                        erro.Erro = 1;
                        erro.Descricao = "Oportunidade não encontrada.";
                        return erro;
                    }
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
                Debug.WriteLine(ex.Message);
                return erro;
            }
        }

        #endregion OportunidadeVenda

        #region Encomenda

        public static List<Models.Encomenda> get_all_sales()
        {
            StdBELista objListDoc;
            StdBELista objListDocLines;

            Models.Encomenda sale;
            Models.LinhaEncomenda saleLine;
            List<Models.LinhaEncomenda> saleLineList;
            List<Models.Encomenda> saleList = new List<Models.Encomenda>();


            if (initializeCompany() == true)
            {

                objListDoc = PriEngine.Engine.Consulta("SELECT TOP 20 id, Entidade, Data, NumDoc, Responsavel, TotalDocumento, Serie FROM CabecDoc WHERE TipoDoc = 'ECL' ORDER BY TotalDocumento DESC");

                while (!objListDoc.NoFim())
                {
                    sale = new Models.Encomenda();

                    sale.Id = objListDoc.Valor("id");
                    sale.Entidade = objListDoc.Valor("Entidade");
                    sale.Data = objListDoc.Valor("Data");
                    sale.Responsavel = objListDoc.Valor("Responsavel");
                    sale.NumDoc = objListDoc.Valor("NumDoc");
                    sale.TotalMerc = objListDoc.Valor("TotalDocumento");
                    sale.Serie = objListDoc.Valor("Serie");

                    objListDocLines = PriEngine.Engine.Consulta("Select IdCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalIliquido, PrecoLiquido FROM LinhasDoc WHERE IdCabecDoc='" + sale.Id + "'");
                    saleLineList = new List<Models.LinhaEncomenda>();

                    while (!objListDocLines.NoFim())
                    {
                        saleLine = new Models.LinhaEncomenda();

                        saleLine.CodArtigo = objListDocLines.Valor("Artigo");
                        saleLine.DescArtigo = objListDocLines.Valor("Descricao");
                        saleLine.Desconto = objListDocLines.Valor("Desconto1");
                        saleLine.IdCabecDoc = objListDocLines.Valor("IdCabecDoc");
                        saleLine.Quantidade = objListDocLines.Valor("Quantidade");
                        saleLine.TotalLiquido = objListDocLines.Valor("PrecoLiquido");
                        saleLine.TotalILiquido = objListDocLines.Valor("TotalIliquido");
                        saleLine.Unidade = objListDocLines.Valor("Unidade");
                        saleLine.PrecoUnitario = objListDocLines.Valor("PrecUnit");

                        saleLineList.Add(saleLine);

                        objListDocLines.Seguinte();
                    }

                    sale.LinhasDoc = saleLineList;

                    saleList.Add(sale);
                    objListDoc.Seguinte();
                }
            }

            return saleList;
        }

        public static Models.Encomenda get_sale(string id)
        {
            StdBELista objListDoc;
            StdBELista objListDocLines;

            Models.Encomenda sale = new Models.Encomenda();
            Models.LinhaEncomenda saleLine = new Models.LinhaEncomenda();
            List<Models.LinhaEncomenda> saleLineList = new List<Models.LinhaEncomenda>();

            if (initializeCompany())
            {
                objListDoc = PriEngine.Engine.Consulta("SELECT id, Entidade, Data, NumDoc, Responsavel, TotalDocumento, Serie FROM CabecDoc WHERE TipoDoc = 'ECL' AND id = '" + id + "'");

                sale.Id = objListDoc.Valor("id");
                sale.Entidade = objListDoc.Valor("Entidade");
                sale.Data = objListDoc.Valor("Data");
                sale.NumDoc = objListDoc.Valor("NumDoc");
                sale.Responsavel = objListDoc.Valor("Responsavel");
                sale.TotalMerc = objListDoc.Valor("TotalDocumento");
                sale.Serie = objListDoc.Valor("Serie");

                objListDocLines = PriEngine.Engine.Consulta("Select IdCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalIliquido, PrecoLiquido FROM LinhasDoc WHERE IdCabecDoc='" + sale.Id + "'");
                saleLineList = new List<Models.LinhaEncomenda>();

                while (!objListDocLines.NoFim())
                {
                    saleLine = new Models.LinhaEncomenda();

                    saleLine.CodArtigo = objListDocLines.Valor("Artigo");
                    saleLine.DescArtigo = objListDocLines.Valor("Descricao");
                    saleLine.Desconto = objListDocLines.Valor("Desconto1");
                    saleLine.IdCabecDoc = objListDocLines.Valor("IdCabecDoc");
                    saleLine.Quantidade = objListDocLines.Valor("Quantidade");
                    saleLine.TotalLiquido = objListDocLines.Valor("PrecoLiquido");
                    saleLine.TotalILiquido = objListDocLines.Valor("TotalIliquido");
                    saleLine.Unidade = objListDocLines.Valor("Unidade");
                    saleLine.PrecoUnitario = objListDocLines.Valor("PrecUnit");

                    saleLineList.Add(saleLine);

                    objListDocLines.Seguinte();
                }

                sale.LinhasDoc = saleLineList;
            }

            return sale;
        }

        public static Models.RespostaErro new_sale(Models.Encomenda dv)
        {
            Models.RespostaErro erro = new Models.RespostaErro();
            GcpBEDocumentoVenda myEnc = new GcpBEDocumentoVenda();

            GcpBELinhaDocumentoVenda myLin = new GcpBELinhaDocumentoVenda();

            GcpBELinhasDocumentoVenda myLinhas = new GcpBELinhasDocumentoVenda();

            
            Interop.GcpBE900.PreencheRelacaoVendas rl = new Interop.GcpBE900.PreencheRelacaoVendas();
            List<Models.LinhaEncomenda> lstlindv = new List<Models.LinhaEncomenda>();


            if (initializeCompany() == true)
            {
                
                myEnc.set_DataDoc(DateTime.Now);
                myEnc.set_Entidade(dv.Entidade);
                myEnc.set_Serie(dv.Serie);
                myEnc.set_Responsavel(dv.Responsavel);
                myEnc.set_Tipodoc("ECL");
                myEnc.set_TipoEntidade("C");
                
                lstlindv = dv.LinhasDoc;
                
                PriEngine.Engine.Comercial.Vendas.PreencheDadosRelacionados(myEnc);

                foreach (Models.LinhaEncomenda lin in lstlindv)
                {
                    PriEngine.Engine.Comercial.Vendas.AdicionaLinha(myEnc, lin.CodArtigo, lin.Quantidade, "", "", lin.PrecoUnitario, lin.Desconto);
                }

                PriEngine.Engine.IniciaTransaccao();

                try
                {
                    PriEngine.Engine.Comercial.Vendas.Actualiza(myEnc, "Teste");
                    PriEngine.Engine.TerminaTransaccao();
                    erro.Erro = 0;
                    erro.Descricao = "Sucesso";
                    erro.Data = myEnc.get_ID();
                    return erro;
                }
                catch (Exception e)
                {
                    PriEngine.Engine.DesfazTransaccao();
                    erro.Erro = 2;
                    erro.Descricao = "Erro ao submeter a encomenda";
                    return erro;
                }

            }
            else
            {
                erro.Erro = 1;
                erro.Descricao = "Erro ao abrir empresa";
                return erro;
            }
        }

        public static List<Models.Encomenda> get_salesRep_sales(string salesRepID)
        {
            StdBELista listRepSales;
            StdBELista listRepSaleLines;

            Models.Encomenda tmpSale;
            List<Models.Encomenda> saleList = new List<Models.Encomenda>();
            Models.LinhaEncomenda tmpLine;
            List<Models.LinhaEncomenda> tmpListLine;

            if (initializeCompany())
            {
                listRepSales = PriEngine.Engine.Consulta("SELECT id, Entidade, Data, NumDoc, TotalDocumento, Serie, Responsavel FROM CabecDoc WHERE TipoDoc = 'ECL' AND Responsavel='"+salesRepID+"'");

                while (!listRepSales.NoFim())
                {
                    tmpSale = new Models.Encomenda();
                    tmpSale.Id = listRepSales.Valor("id");
                    tmpSale.Entidade = listRepSales.Valor("Entidade");
                    tmpSale.Data = listRepSales.Valor("Data");
                    tmpSale.NumDoc = listRepSales.Valor("NumDoc");
                    tmpSale.TotalMerc = listRepSales.Valor("TotalDocumento");
                    tmpSale.Serie = listRepSales.Valor("Serie");
                    tmpSale.Responsavel = listRepSales.Valor("Responsavel");

                    listRepSaleLines = PriEngine.Engine.Consulta("Select IdCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalIliquido, PrecoLiquido FROM LinhasDoc WHERE IdCabecDoc='" + tmpSale.Id + "'");
                    tmpListLine = new List<Models.LinhaEncomenda>();
                    while (!listRepSaleLines.NoFim())
                    {
                        tmpLine = new Models.LinhaEncomenda();
                        tmpLine.IdCabecDoc = listRepSaleLines.Valor("IdCabecDoc");
                        tmpLine.CodArtigo = listRepSaleLines.Valor("Artigo");
                        tmpLine.DescArtigo = listRepSaleLines.Valor("Descricao");
                        tmpLine.Quantidade = listRepSaleLines.Valor("Quantidade");
                        tmpLine.Unidade = listRepSaleLines.Valor("Unidade");
                        tmpLine.TotalILiquido = listRepSaleLines.Valor("TotalIliquido");
                        tmpLine.TotalLiquido = listRepSaleLines.Valor("PrecoLiquido");
                        tmpLine.PrecoUnitario = listRepSaleLines.Valor("PrecUnit");
                        tmpLine.Desconto = listRepSaleLines.Valor("Desconto1");



                        tmpListLine.Add(tmpLine);
                        listRepSaleLines.Seguinte();
                    }

                    tmpSale.LinhasDoc = tmpListLine;

                    saleList.Add(tmpSale);
                    listRepSales.Seguinte();
                }

            }

            return saleList;
        }

        public static List<Models.Encomenda> get_client_purchases(string clientID)
        {
            StdBELista listClientPurchases;
            StdBELista listClientPurchaseLines;

            Models.Encomenda tmpSale;
            List<Models.Encomenda> saleList = new List<Models.Encomenda>();
            Models.LinhaEncomenda tmpLine;
            List<Models.LinhaEncomenda> tmpListLine;

            if (initializeCompany())
            {
                listClientPurchases = PriEngine.Engine.Consulta("SELECT id, Entidade, Data, NumDoc, TotalDocumento, Serie, Responsavel FROM CabecDoc WHERE TipoDoc = 'ECL' AND Entidade='" + clientID + "'");

                while (!listClientPurchases.NoFim())
                {
                    tmpSale = new Models.Encomenda();
                    tmpSale.Id = listClientPurchases.Valor("id");
                    tmpSale.Entidade = listClientPurchases.Valor("Entidade");
                    tmpSale.Data = listClientPurchases.Valor("Data");
                    tmpSale.NumDoc = listClientPurchases.Valor("NumDoc");
                    tmpSale.TotalMerc = listClientPurchases.Valor("TotalDocumento");
                    tmpSale.Serie = listClientPurchases.Valor("Serie");
                    tmpSale.Responsavel = listClientPurchases.Valor("Responsavel");

                    listClientPurchaseLines = PriEngine.Engine.Consulta("Select IdCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalIliquido, PrecoLiquido FROM LinhasDoc WHERE IdCabecDoc='" + tmpSale.Id + "'");
                    tmpListLine = new List<Models.LinhaEncomenda>();
                    while (!listClientPurchaseLines.NoFim())
                    {
                        tmpLine = new Models.LinhaEncomenda();
                        tmpLine.IdCabecDoc = listClientPurchaseLines.Valor("IdCabecDoc");
                        tmpLine.CodArtigo = listClientPurchaseLines.Valor("Artigo");
                        tmpLine.DescArtigo = listClientPurchaseLines.Valor("Descricao");
                        tmpLine.Quantidade = listClientPurchaseLines.Valor("Quantidade");
                        tmpLine.Unidade = listClientPurchaseLines.Valor("Unidade");
                        tmpLine.TotalILiquido = listClientPurchaseLines.Valor("TotalIliquido");
                        tmpLine.TotalLiquido = listClientPurchaseLines.Valor("PrecoLiquido");
                        tmpLine.PrecoUnitario = listClientPurchaseLines.Valor("PrecUnit");
                        tmpLine.Desconto = listClientPurchaseLines.Valor("Desconto1");



                        tmpListLine.Add(tmpLine);
                        listClientPurchaseLines.Seguinte();
                    }

                    tmpSale.LinhasDoc = tmpListLine;

                    saleList.Add(tmpSale);
                    listClientPurchases.Seguinte();
                }

            }

            return saleList;
        }

        #endregion

        #region Administration

        public static List<Models.Vendedor> GetSalesReps()
        {
            StdBELista objList;

            List<Models.Vendedor> salesRepList = new List<Models.Vendedor>();
            Models.Vendedor tmpSalesRep;

            if (initializeCompany())
            {
                //objList = PriEngine.Engine.Comercial.Vendedores.LstVendedores();
                objList = PriEngine.Engine.Consulta("SELECT Vendedor, Nome, Comissao, Localidade, Morada, CPostal, Telemovel, EMail FROM Vendedores");

                while (!objList.NoFim())
                {
                    tmpSalesRep = new Models.Vendedor();

                    tmpSalesRep.VendedorID = objList.Valor("Vendedor");
                    tmpSalesRep.Nome = objList.Valor("Nome");
                    tmpSalesRep.Comissao = objList.Valor("Comissao");
                    tmpSalesRep.Morada = objList.Valor("Morada");
                    tmpSalesRep.Localidade = objList.Valor("Localidade");
                    tmpSalesRep.CPostal = objList.Valor("CPostal");
                    tmpSalesRep.Telemovel = objList.Valor("Telemovel");
                    tmpSalesRep.Email = objList.Valor("EMail");

                    // Ler o campo de utilizador "CDU_Password" directamente
                    string pwdEncriptada = PriEngine.Engine.Comercial.Vendedores.DaValorAtributo(tmpSalesRep.VendedorID, "CDU_Password");
                    tmpSalesRep.Password = PriEngine.Platform.Criptografia.Descripta(pwdEncriptada, 50);

                    // Ler o campo de utilizador "CDU_EChefe"
                    tmpSalesRep.VendedorChefe = PriEngine.Engine.Comercial.Vendedores.DaValorAtributo(tmpSalesRep.VendedorID, "CDU_EChefe");

                    salesRepList.Add(tmpSalesRep);
                    objList.Seguinte();
                }

            }

            return salesRepList;
        }

        public static Vendedor GetSalesRep(string email)
        {
            Boolean isEmail = email.Contains('@');
            email = SalesForceAutomation.Tools.Tools.Parse(email);
            
            StdBELista objList;
            GcpBEVendedor rep = new GcpBEVendedor();
            Models.Vendedor tmpSalesRep = new Vendedor();

            try
            {
                if (initializeCompany())
                {
                    if (isEmail)
                    {
                        objList = PriEngine.Engine.Consulta("SELECT Vendedor FROM Vendedores WHERE EMail = '" + email + "'");

                        if (objList.NoFim())
                        {
                            return null;
                        }

                        tmpSalesRep.VendedorID = objList.Valor("Vendedor");
                    }
                    else
                    {
                        tmpSalesRep.VendedorID = email;
                    }

                    rep = PriEngine.Engine.Comercial.Vendedores.Edita(tmpSalesRep.VendedorID);

                    tmpSalesRep.Nome = rep.get_Nome();
                    tmpSalesRep.Comissao = rep.get_Comissao();
                    tmpSalesRep.Morada = rep.get_Morada();
                    tmpSalesRep.Localidade = rep.get_Localidade();
                    tmpSalesRep.CPostal = rep.get_CodigoPostal();
                    tmpSalesRep.Telemovel = rep.get_Telemovel();
                    tmpSalesRep.Email = rep.get_Email();

                    // Ler o campo de utilizador "CDU_Password" directamente
                    string pwdEncriptada = PriEngine.Engine.Comercial.Vendedores.DaValorAtributo(tmpSalesRep.VendedorID, "CDU_Password");
                    tmpSalesRep.Password = PriEngine.Platform.Criptografia.Descripta(pwdEncriptada, 50);

                    // Ler o campo de utilizador "CDU_EChefe"
                    tmpSalesRep.VendedorChefe = PriEngine.Engine.Comercial.Vendedores.DaValorAtributo(tmpSalesRep.VendedorID, "CDU_EChefe");
                }

                return tmpSalesRep;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return null;
            }
        }

        public static RespostaErro PostSalesRep(Vendedor newSalesRep)
        {
            RespostaErro erro = new RespostaErro();
            GcpBEVendedor newRep = new GcpBEVendedor();

            try
            {

                if (initializeCompany())
                {
                    // generate next sales rep Id
                    int newId = 1;
                    StdBELista objList;
                    objList = PriEngine.Engine.Consulta("SELECT COUNT(Vendedor) AS NewId FROM Vendedores");
                    if (!objList.Vazia())
                    {
                        newId = objList.Valor("NewId") + 2;
                        Debug.WriteLine(newId);
                    }
                    newSalesRep.VendedorID = newId.ToString();

                    StdBECampos cmps = new StdBECampos();
                    StdBECampo cmp1 = new StdBECampo();
                    StdBECampo cmp2 = new StdBECampo();

                    cmp1.Nome = "CDU_EChefe";
                    cmp1.Valor = newSalesRep.VendedorChefe;
                    cmps.Insere(cmp1);

                    cmp2.Nome = "CDU_Password";
                    string ps = PriEngine.Platform.Criptografia.Encripta(newSalesRep.Password, 50);
                    Debug.WriteLine(newSalesRep.Password);
                    cmp2.Valor = ps;
                    cmps.Insere(cmp2);

                    newRep.set_Vendedor(newSalesRep.VendedorID);
                    newRep.set_CodigoPostal(newSalesRep.CPostal);
                    newRep.set_Nome(newSalesRep.Nome);
                    newRep.set_Morada(newSalesRep.Morada);
                    newRep.set_Localidade(newSalesRep.Localidade);
                    newRep.set_Comissao((float)newSalesRep.Comissao);
                    newRep.set_Email(newSalesRep.Email);
                    newRep.set_Telemovel(newSalesRep.Telemovel);
                    newRep.set_CamposUtil(cmps);

                    PriEngine.Engine.Comercial.Vendedores.Actualiza(newRep);
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

        #endregion

        #region Statistics

        public static Models.VendasArtigo get_product_sales_value(string productID)
        {
            StdBELista objList;

            Models.VendasArtigo productSales = new Models.VendasArtigo();

            TimeSpan halfAYear = new TimeSpan(TIMESPAN_STATISTIC, 0, 0, 0);
            DateTime myDateTime = DateTime.Now;
            myDateTime = myDateTime.Subtract(halfAYear);
            string sqlFormattedDate = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");


            if (initializeCompany())
            {
                objList = PriEngine.Engine.Consulta("SELECT Artigo.Artigo AS Artigo, SUM(LinhasDoc.PrecoLiquido) AS Soma FROM Artigo, LinhasDoc, CabecDoc WHERE Artigo.Artigo = LinhasDoc.Artigo AND LinhasDoc.IdCabecDoc = CabecDoc.Id AND CabecDoc.TipoDoc = 'ECL' AND Artigo.Artigo = '" + productID + "' AND CabecDoc.Data > '" + sqlFormattedDate + "' GROUP BY Artigo.Artigo");

                productSales.ArtigoID = objList.Valor("Artigo");
                productSales.Vendas = objList.Valor("Soma");

            }

            return productSales;
        }
        public static List<Models.VendasArtigo> get_all_product_sales_value()
        {
            StdBELista objList;

            Models.VendasArtigo tmpProdSales;
            List<Models.VendasArtigo> productSalesList = new List<Models.VendasArtigo>();

            TimeSpan halfAYear = new TimeSpan(TIMESPAN_STATISTIC, 0, 0, 0);
            DateTime myDateTime = DateTime.Now;
            myDateTime = myDateTime.Subtract(halfAYear);
            string sqlFormattedDate = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");

            if (initializeCompany())
            {
                objList = PriEngine.Engine.Consulta("SELECT Artigo.Artigo AS Artigo, SUM(LinhasDoc.PrecoLiquido) AS Soma, Artigo.STKActual AS STKActual, Artigo.PCUltimo AS PCUltimo FROM Artigo, LinhasDoc, CabecDoc WHERE Artigo.Artigo = LinhasDoc.Artigo AND LinhasDoc.IdCabecDoc = CabecDoc.Id AND (CabecDoc.TipoDoc = 'FAI' OR CabecDoc.TipoDoc = 'FI' OR CabecDoc.TipoDoc = 'FM' OR CabecDoc.TipoDoc = 'FO' OR CabecDoc.TipoDoc = 'FP' OR CabecDoc.TipoDoc = 'FR' OR CabecDoc.TipoDoc = 'FS' OR CabecDoc.TipoDoc = 'FA') AND CabecDoc.Data > '" + sqlFormattedDate + "' GROUP BY Artigo.Artigo, STKActual, PCUltimo");

                while (!objList.NoFim())
                {
                    tmpProdSales = new Models.VendasArtigo();

                    tmpProdSales.ArtigoID = objList.Valor("Artigo");
                    tmpProdSales.Vendas = objList.Valor("Soma");
                    tmpProdSales.Stock = objList.Valor("STKActual");
                    tmpProdSales.Preco = objList.Valor("PCUltimo");

                    productSalesList.Add(tmpProdSales);
                    objList.Seguinte();
                }

            }

            return productSalesList;
        }

        public static Models.VendasVendedor get_salesRep_sales_value(string salesRepID)
        {
            StdBELista objList;

            Models.VendasVendedor repSales = new Models.VendasVendedor();

            TimeSpan halfAYear = new TimeSpan(TIMESPAN_STATISTIC, 0, 0, 0);
            DateTime myDateTime = DateTime.Now;
            myDateTime = myDateTime.Subtract(halfAYear);
            string sqlFormattedDate = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");

            if (initializeCompany())
            {
                objList = PriEngine.Engine.Consulta("SELECT Vendedores.Vendedor AS Vendedor, Vendedores.Nome AS Nome, SUM(LinhasDoc.PrecoLiquido) AS Soma FROM Vendedores, LinhasDoc, CabecDoc WHERE Vendedores.Vendedor = CabecDoc.Responsavel AND LinhasDoc.IdCabecDoc = CabecDoc.Id AND (CabecDoc.TipoDoc = 'FAI' OR CabecDoc.TipoDoc = 'FI' OR CabecDoc.TipoDoc = 'FM' OR CabecDoc.TipoDoc = 'FO' OR CabecDoc.TipoDoc = 'FP' OR CabecDoc.TipoDoc = 'FR' OR CabecDoc.TipoDoc = 'FS' OR CabecDoc.TipoDoc = 'FA') AND Vendedores.Vendedor = '" + salesRepID + "' AND CabecDoc.Data > '" + sqlFormattedDate + "' GROUP BY Vendedores.Vendedor, Vendedores.Nome");

                repSales.VendedorID = objList.Valor("Vendedor");
                repSales.Nome = objList.Valor("Nome");
                repSales.Vendas = objList.Valor("Soma");

            }

            return repSales;
        }
        public static List<Models.VendasVendedor> get_all_salesRep_sales_value()
        {
            StdBELista objList;

            Models.VendasVendedor tmpRepSales;
            List<Models.VendasVendedor> repSalesList = new List<Models.VendasVendedor>();

            TimeSpan halfAYear = new TimeSpan(TIMESPAN_STATISTIC, 0, 0, 0);
            DateTime myDateTime = DateTime.Now;
            myDateTime = myDateTime.Subtract(halfAYear);
            string sqlFormattedDate = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");

            if (initializeCompany())
            {
                objList = PriEngine.Engine.Consulta("SELECT Vendedores.Vendedor AS Vendedor, Vendedores.Nome AS Nome, SUM(LinhasDoc.PrecoLiquido) AS Soma, Vendedores.Morada AS Morada, Vendedores.Telemovel AS Telemovel FROM Vendedores, LinhasDoc, CabecDoc WHERE Vendedores.Vendedor = CabecDoc.Responsavel AND LinhasDoc.IdCabecDoc = CabecDoc.Id AND (CabecDoc.TipoDoc = 'FAI' OR CabecDoc.TipoDoc = 'FI' OR CabecDoc.TipoDoc = 'FM' OR CabecDoc.TipoDoc = 'FO' OR CabecDoc.TipoDoc = 'FP' OR CabecDoc.TipoDoc = 'FR' OR CabecDoc.TipoDoc = 'FS' OR CabecDoc.TipoDoc = 'FA') AND CabecDoc.Data > '" + sqlFormattedDate + "' GROUP BY Vendedores.Vendedor, Vendedores.Nome, Vendedores.Morada, Vendedores.Telemovel");

                try
                {
                    while (!objList.NoFim())
                    {
                        tmpRepSales = new Models.VendasVendedor();

                        tmpRepSales.VendedorID = objList.Valor("Vendedor");
                        tmpRepSales.Nome = objList.Valor("Nome");
                        tmpRepSales.Vendas = objList.Valor("Soma");
                        tmpRepSales.Morada = objList.Valor("Morada");
                        tmpRepSales.Telemovel = objList.Valor("Telemovel");

                        repSalesList.Add(tmpRepSales);
                        objList.Seguinte();
                    }
                }
                catch (Exception e) { }

            }

            return repSalesList;
        }

        public static Models.VendasCliente get_client_sales_value(string clientID)
        {
            StdBELista objList;

            Models.VendasCliente client = new Models.VendasCliente();

            TimeSpan halfAYear = new TimeSpan(TIMESPAN_STATISTIC, 0, 0, 0);
            DateTime myDateTime = DateTime.Now;
            myDateTime = myDateTime.Subtract(halfAYear);
            string sqlFormattedDate = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");

            if (initializeCompany())
            {
                objList = PriEngine.Engine.Consulta("SELECT Clientes.Cliente AS ClienteID, Clientes.Fac_Mor AS Morada, Clientes.Fac_Tel AS Telefone, Clientes.Fac_Cp AS CodPost, Clientes.Fac_Local AS Localidade, SUM(LinhasDoc.PrecoLiquido) AS Soma FROM Clientes, LinhasDoc, CabecDoc WHERE Clientes.Cliente = CabecDoc.Entidade AND LinhasDoc.IdCabecDoc = CabecDoc.Id AND (CabecDoc.TipoDoc = 'FAI' OR CabecDoc.TipoDoc = 'FI' OR CabecDoc.TipoDoc = 'FM' OR CabecDoc.TipoDoc = 'FO' OR CabecDoc.TipoDoc = 'FP' OR CabecDoc.TipoDoc = 'FR' OR CabecDoc.TipoDoc = 'FS' OR CabecDoc.TipoDoc = 'FA') AND Clientes.Cliente = '" + clientID + "' AND CabecDoc.Data > '" + sqlFormattedDate + "' GROUP BY Clientes.Cliente, Clientes.Fac_Tel, Clientes.Fac_Mor, Clientes.Fac_Cp, Clientes.Fac_Local");

                client.ClienteID = objList.Valor("ClienteID");
                client.Vendas = objList.Valor("Soma");
                client.Morada = objList.Valor("Morada");
                client.Telefone = objList.Valor("Telefone");
                client.Localidade = objList.Valor("Localidade");
                client.CodPost = objList.Valor("CodPost");

            }

            return client;
        }
        public static List<Models.VendasCliente> get_all_clients_sales_value()
        {
            StdBELista objList;

            Models.VendasCliente tmpClientSales;
            List<Models.VendasCliente> clientList = new List<Models.VendasCliente>();

            TimeSpan halfAYear = new TimeSpan(TIMESPAN_STATISTIC, 0, 0, 0);
            DateTime myDateTime = DateTime.Now;
            myDateTime = myDateTime.Subtract(halfAYear);
            string sqlFormattedDate = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");

            if (initializeCompany())
            {
                objList = PriEngine.Engine.Consulta("SELECT Clientes.Cliente AS ClienteID, Clientes.Fac_Mor AS Morada, Clientes.Fac_Tel AS Telefone, Clientes.Fac_Cp AS CodPost, Clientes.Fac_Local AS Localidade, SUM(LinhasDoc.PrecoLiquido) AS Soma FROM Clientes, LinhasDoc, CabecDoc WHERE Clientes.Cliente = CabecDoc.Entidade AND LinhasDoc.IdCabecDoc = CabecDoc.Id AND (CabecDoc.TipoDoc = 'FAI' OR CabecDoc.TipoDoc = 'FI' OR CabecDoc.TipoDoc = 'FM' OR CabecDoc.TipoDoc = 'FO' OR CabecDoc.TipoDoc = 'FP' OR CabecDoc.TipoDoc = 'FR' OR CabecDoc.TipoDoc = 'FS' OR CabecDoc.TipoDoc = 'FA') AND CabecDoc.Data > '" + sqlFormattedDate + "' GROUP BY Clientes.Cliente, Clientes.Fac_Tel, Clientes.Fac_Mor, Clientes.Fac_Cp, Clientes.Fac_Local");

                while (!objList.NoFim())
                {
                    tmpClientSales = new Models.VendasCliente();

                    tmpClientSales.ClienteID = objList.Valor("ClienteID");
                    tmpClientSales.Vendas = objList.Valor("Soma");
                    tmpClientSales.Morada = objList.Valor("Morada");
                    tmpClientSales.Telefone = objList.Valor("Telefone");
                    tmpClientSales.Localidade = objList.Valor("Localidade");
                    tmpClientSales.CodPost = objList.Valor("CodPost");

                    clientList.Add(tmpClientSales);
                    objList.Seguinte();
                }

            }

            return clientList;
        }

        #endregion

        #region Payment Modes and Conditions

        public static IEnumerable<Models.CondPag> listCondPag()
        {
            StdBELista objList;

            Models.CondPag condPag = new Models.CondPag();
            List<Models.CondPag> listCondPag = new List<Models.CondPag>();

            if (initializeCompany() == true)
            {

                objList = PriEngine.Engine.Comercial.CondsPagamento.LstCondsPagamento();

                while (!objList.NoFim())
                {
                    condPag = new Models.CondPag();
                    condPag.condPag = objList.Valor("CondPag");
                    condPag.Descricao = objList.Valor("Descricao");

                    listCondPag.Add(condPag);
                    objList.Seguinte();
                }

                return listCondPag;

            }
            else
            {
                return null;

            }
        }

        #endregion


    }
}