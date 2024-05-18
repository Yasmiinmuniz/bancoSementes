// Tela inicial
"use client"
import Card from "@/components/CardDefault";
import style from "./home.module.scss";
import { useState } from "react";
import { getStorageItem } from "@/utils/localStore";
import Image from "next/image";
import { useSelector } from "react-redux";

import styless from "@/components/Login/login.module.scss";
import Link from "next/link";


export default function InicioPage() {

  const [role, setRole] = useState(getStorageItem("userRole"));

  const userLogin = useSelector((state) => state.userLogin);

  function whatIsTypeUser() {
    if (role) {
      if (role == "ROLE_ADMIN" || role == "ROLE_COPPABACS") {
        return <LayoutAdmin />
      } else if (role == "ROLE_GERENTE") {
        return <LayoutCoordenador />
      } else if (role == "ROLE_AGRICULTOR") {
        return <LayoutAgricultor />
      }
    } else {
      return <LayoutPublic />
    }

  }

  return (
    <div>
      {
        /**
         * 
        {!userLogin ? <div className={style.mapa}><img className={style.mapa__img} src="/assets/Group 12.png " alt="menu burguer" /></div> : false}
         */
      }
      <div className={style.menu} style={!userLogin ? { paddingTop: '0px' } : {}}>
        <div className={style.conjuntoCards}>
          {whatIsTypeUser()}
        </div>
      </div>
    </div>
  )

}

const LayoutAdmin = () => {

  return (
    <>
      <Card title="Agricultores" icon="/assets/iconAgricultor.svg" description="Agricultores" link="/agricultores" />
      <Card title="Coordenadores" icon="/assets/IconCordenadores.svg" description="Coordenadores" link="/coordenadores" />
      <Card title="Funcionários" icon="/assets/iconAssociates.svg" description="Funcionários" link="/funcionarios" />
      <Card title="Bancos de Sementes" icon="/assets/iconBancoDeSementes.svg" description="Banco Sementes" link="/bancoSementes" />
      <Card title="Gestão de Sementes" icon="/assets/iconSeedGreen.svg" description="Sementes" link="/sementes" />
      <Card title="Mural" icon="/assets/iconMural.svg" description="Mural" link="/mural" />
    </>
  )
}

const LayoutCoordenador = () => {

  return (
    <>
      <Card title="Agricultores" icon="/assets/iconAgricultor.svg" description="Agricultores" link="/agricultores" />
      <Card title="Bancos de Sementes" icon="/assets/iconBancoDeSementes.svg" description="Banco Sementes" link="/bancoSementes" />
      <Card title="Doações de Sementes" icon="/assets/iconDoacaoDeSementes.svg" description="Doações Sementes" link="/doacoes" />
      <Card title="Retirada de Sementes" icon="/assets/iconRetiradaDeSementes.svg" description="Doações Sementes" link="/retiradas" />
      <Card title="Gestão de Sementes" icon="/assets/iconSeedGreen.svg" description="Sementes" link="/sementes" />
      <Card title="Mural" icon="/assets/iconMural.svg" description="Mural" link="/mural" />
    </>
  )
}

const LayoutAgricultor = () => {

  return (
    <>
      <Card title="Bancos de Sementes" icon="/assets/iconBancoDeSementes.svg" description="Banco Sementes" link="/bancoSementes" />
      <Card title="Sementes" icon="/assets/iconSeedGreen.svg" description="Sementes" link="/sementes" />
      <Card title="Histórico de Doações" icon="/assets/iconMovimentacaoBancoSementes.svg" description="Doações Sementes" link="/doacoes" />
      <Card title="Histórico de Retirada" icon="/assets/iconMovimentacaoBancoSementes.svg" description="Doações Sementes" link="/retiradas" />
      <Card title="Mural" icon="/assets/iconMural.svg" description="Mural" link="/mural" />
    </>
  )
}


const LayoutPublic = () => {
  return (
      <div className={styless.login}>

        <div className={styless.login__content}>
          <h1 className={styless.login__content_title}>O sistema</h1>
          <p className={styless.login__content_subtitle}>O App Sementes Crioulas é uma plataforma desenvolvida pela Universidade Federal do Agreste de Pernambuco por meio do Laboratório
            Multidisciplinar de Tecnologias Sociais (LMTS), em parceria com a Cooperativa de Pequenos Produtores
            Agrícolas dos Bancos Comunitários de Sementes (COPPABACS), tendo como objetivo, auxiliar a eficiência da gestão da cooperativa. A ferramenta visa contribuir no processo de gestão
            das sementes, dos agricultores e dos bancos de sementes.</p>
          <h1 className={styless.login__content_title}>Principais funcionalidades</h1>
          <ul>
            <li><Image src="/assets/Vector.svg" alt="Sementes" width={13} height={13} />  Gerenciamento de agricultores vinculados a associação.</li>
            <li><Image src="/assets/Vector.svg" alt="Sementes" width={13} height={13} />  Gerenciamento de solicitações de cadastros de novo agricultor.</li>
            <li><Image src="/assets/Vector.svg" alt="Sementes" width={13} height={13} />  Gerenciamento de coordenadores de bancos vinculados a associação.</li>
            <li><Image src="/assets/Vector.svg" alt="Sementes" width={13} height={13} />  Gerenciamento de funcionários vinculados a associação.</li>
            <li><Image src="/assets/Vector.svg" alt="Sementes" width={13} height={13} />  Gerenciamento de sementes trabalhadas na cooperativa.</li>
            <li><Image src="/assets/Vector.svg" alt="Sementes" width={13} height={13} />  Gerenciamento de bancos de sementes vinculados a cooperativa.</li>
            <li><Image src="/assets/Vector.svg" alt="Sementes" width={13} height={13} />  Gerenciamento de Doações de Sementes do Agricultor para o Banco.</li>
            <li><Image src="/assets/Vector.svg" alt="Sementes" width={13} height={13} />  Gerenciamento de Retirada de Sementes do Banco pelo Agricultor.</li>
            <li><Image src="/assets/Vector.svg" alt="Sementes" width={13} height={13} />  Sistema de login direcionamento e renderização por perfil de usuário.</li>
            <li><Image src="/assets/Vector.svg" alt="Sementes" width={13} height={13} />  Agricultor pode fazer um cadastro como solicitação de vínculo com a cooperativa.</li>
          </ul>
          <p className={styless.login__content_subtitle}></p>

        </div>

        <button className={styless.login__content_button}>
          <Link className={styless.login__content_link} href="/public">
            <h1>Acesse o sistema</h1>


          </Link>
        </button>
      </div>

    
  )
}

