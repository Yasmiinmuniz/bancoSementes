"use client"

import { useMutation } from "react-query";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import style from "./agricultorForm.module.scss";
import HeaderNavegacao from "../HeaderNavegacao";
import DadosEndereco from "./DadosEndereco";
import Link from "next/link";
import DadosBanco from "./DadosBanco";
import ObjetosBanco from "./ObjetosBanco";
import { postBanco } from "@/api/bancoSementes/postBanco";

const BancoForm = ({ diretorioAnterior, diretorioAtual, hrefAnterior }) => {

  const initialValues = {
    nome: "",
    comunidade: "",
    anoFundacao: "",
    historiaBanco: "",
    variedadesTrabalhadas: "",
    responsavel: "",
    contato: "",
    endereco: {
      logradouro: "",
      referencia: "",
      complemento: "",
      cidade: "",
      estado: "",
      cep: "",
      numero: "",
      bairro: ""
    },
    objetos: {
      bombona: "",
      peneiraSelecao: "",
      balanca: "",
      armario: "",
      plantadeira: "",
      lona: "",
      batedeiraCereal: "",
    },
  }

  const validateSchema = Yup.object().shape({
    nome: Yup.string()
      .min(5, "O nome deve ter no mínimo 5 caracteres")
      .required('Obrigatório'),
    comunidade: Yup.string()
      .required('Obrigatória'),
    responsavel: Yup.string()
      .required('Obrigatória'),
    anoFundacao: Yup.string()
      .required('Obrigatório'),
    logradouro: Yup.string()
      .required('Obrigatório'),
    cidade: Yup.string()
      .required('Obrigatória'),
    estado: Yup.string()
      .required('Obrigatório'),
    cep: Yup.string()
      .required('Obrigatório'),
    numero: Yup.string()
      .required('Obrigatório'),
    bairro: Yup.string()
      .required('Obrigatório'),
  });

  const { status, mutate } = useMutation(
    async (values) => {
      return postBanco(values);
    }, {
    onSuccess: (res) => {
      window.location.href = '/bancoSementes';
    },
    onError: (error) => {
      console.log("Erro ao cadastrar novo banco", error);
    }
  });

  const [etapas, setEtapas] = useState(0);

  return (
    <div id="header" className={style.container}>
      <HeaderNavegacao
        diretorioAnterior={diretorioAnterior}
        diretorioAtual={diretorioAtual}
        hrefAnterior={hrefAnterior}
        etapas={etapas}
      />

      <div className={style.container__header}>
        {etapas === 0 && <h1 className={style.container__header_currentNav}>1. Dados do Banco</h1>}
        {etapas >= 1 && etapas <= 2 && <h1 className={style.container__header_current}>1. Dados do Banco</h1>}

        {etapas === 1 && <h1 className={style.container__header_currentNav}>2. Endereço do Banco</h1>}
        {etapas !== 1 && <h1 className={style.container__header_current}>2. Endereço do Banco</h1>}

        {etapas === 2 && <h1 className={style.container__header_currentNav}>3. Objetos do Banco</h1>}
        {etapas >= 0 && etapas < 2 && <h1 className={style.container__header_current}>3. Objetos do Banco</h1>}
      </div>

      <div className={style.container__ContainerForm}>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={(values, { setSubmitting }) => {
            mutate(values);
          }}
        >
          {(formik) => {
            return (
              <Form className={style.container__ContainerForm_form}>

                {etapas === 0 && <DadosBanco formik={formik} />}
                {etapas === 1 && <DadosEndereco formik={formik} />}
                {etapas === 2 && <ObjetosBanco formik={formik} />}
                {etapas === 0 && (
                  <div className={style.container__ContainerForm_buttons}>
                    <button type="button">
                      <Link className={style.container__ContainerForm_buttons_link} href="/bancoSementes">
                        <h1>Voltar</h1>
                      </Link>
                    </button>
                    <button type="button" onClick={() => setEtapas(etapas + 1)}>
                      <Link href="#header" className={style.container__ContainerForm_buttons_linkWhite}>
                        <h1>Continuar</h1>
                      </Link>
                    </button>
                  </div>
                )}
                {etapas === 1 && (
                  <div className={style.container__ContainerForm_buttons}>
                    <button type="button" onClick={() => setEtapas(etapas - 1)}>
                      <Link href="#header" className={style.container__ContainerForm_buttons_link}>
                        <h1>Voltar</h1>
                      </Link>
                    </button>
                    <button type="button" onClick={() => setEtapas(etapas + 1)}>
                      <Link href="#header" className={style.container__ContainerForm_buttons_linkWhite}>
                        <h1>Continuar</h1>
                      </Link>
                    </button>
                  </div>
                )}
                {etapas === 2 && (
                  <div className={style.container__ContainerForm_buttons}>
                    <button type="button" onClick={() => setEtapas(etapas - 1)}>
                      <Link href="#header" className={style.container__ContainerForm_buttons_link}>
                        <h1>Voltar</h1>
                      </Link>
                    </button>
                    <button type="submit" onClick={() => mutate(formik.values)} className={style.container__ContainerForm_buttons_linkWhite}>
                      <h1>Finalizar</h1>
                    </button>
                  </div>
                )}
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  );
}

export default BancoForm;
