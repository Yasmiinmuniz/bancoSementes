"use client";

import { useMutation } from "react-query";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import style from "./detalhamentoUsuario.module.scss";
import HeaderNavegacao from "../HeaderNavegacao";
import DadosForm from "./DadosUsuario";
import DadosEndereco from "./DadosEndereco";
import DadosSementes from "./DadosSementes";
import Image from "next/image";
import { validarAgricultor } from "@/api/usuarios/agricultor/validarAgricultor";
import { useRouter } from "next/navigation";
import { patchAgricultor } from "@/api/usuarios/agricultor/patchAgricultor";
import { patchCoppabacs } from "@/api/usuarios/coppabacs/patchCoppabacs";
import { patchCoordenador } from "@/api/usuarios/coordenador/patchCoordenador";
import HeaderDetalhamento from "../HeaderDetalhamento";
import { addSementesAgricultor } from "@/api/usuarios/agricultor/addSementes";
import { removeSementesAgricultor } from "@/api/usuarios/agricultor/removeSementes";
import { postArquivo } from "@/api/arquivos/postArquivo";
import { getArquivo } from "@/api/arquivos/getArquivo";


const DetalhamentoUsuario = ({ diretorioAnterior, diretorioAtual, hrefAnterior, usuario, backDetalhamento }) => {

  const router = useRouter();
  const [etapas, setEtapas] = useState(0);
  const [editar, setEditar] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedImageFile(file);
    }
  };

  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    nomePopular: '',
    contato: '',
    cpf: '',
    dataNascimento: '',
    sexo: '',
    endereco: {
      estado: '',
      cidade: '',
      bairro: '',
      nome: '',
      numero: '',
      referencia: '',
    },
    bancoId: '',
    atividadeRural: {
      caprino: '',
      fruticultura: '',
      avicultura: '',
      agriculturaMilho: '',
      suinoCultura: '',
      aquiCultura: '',
      apicultura: '',
      agriculturaFeijao: '',
      pecuaria: '',
      pescaArtesanal: '',
      agriculturaSequeira: '',
      outra: '',
      outraAtividade: '',
    },
    estadoCivil: '',
    conjuge: {
      nome: '',
      sexo: '',
    },
    sementes: [],
    sementesAdicionadas: [],
    sementesRemovidas: [],
    imagem: '',
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        email: usuario.email || '',
        nome: usuario.nome || '',
        nomePopular: usuario.nomePopular || '',
        contato: usuario.contato || '',
        cpf: usuario.cpf || '',
        dataNascimento: usuario.dataNascimento || '',
        sexo: usuario.sexo || '',
        endereco: usuario.endereco || {},
        bancoId: usuario.bancoId || '',
        sementes: usuario.sementes || {},
        estadoCivil: usuario.estadoCivil || '',
        conjuge: usuario.conjuge || {},
        imagem: usuario.imagem || '',
      });
    }
  }, [usuario]);

  const mutationAprovacao = useMutation(() => validarAgricultor(usuario.id), {
    onSuccess: () => {
      window.location.href = '/agricultores/solicitacoes'
      // router.push(`${hrefAnterior}`);
    },
    onError: (error) => {
      console.error('Erro ao aprovar usuário', error);
    }
  });
  const mutationUpdateAgricultor = useMutation(async newData => {

    const { sementesAdicionadas, sementesRemovidas, sementes, ...resto } = newData;

    patchAgricultor(resto, usuario.id)
    if (sementesAdicionadas && sementesAdicionadas.length > 0) {
      await addSementesAgricultor(usuario.id, sementesAdicionadas);
    }
    if (sementesRemovidas && sementesRemovidas.length > 0) {
      await removeSementesAgricultor(usuario.id, sementesRemovidas);
    }
  }, {
    onSuccess: () => {

      window.location.reload();
    },
    onError: (error) => {
      console.error('Erro ao tentar atualizar os dados', error);
    }
  });
  const mutationUpdateCoordenador = useMutation(newData => patchCoordenador(newData, usuario.id), {
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('Erro ao tentar atualizar os dados', error);
    }
  });
  const mutationUpdateFuncionario = useMutation(newData => patchCoppabacs(newData, usuario.id), {
    onSuccess: () => {
      router.push('/funcionários');
    },
    onError: (error) => {
      console.error('Erro ao tentar atualizar os dados', error);
    }


  });

  const handleSubmit = async (values) => {
    if (selectedImageFile) {
      const url = await postArquivo(selectedImageFile);
      values.imagem = url;
    }

    if (hrefAnterior === "/funcionários") {
      mutationUpdateFuncionario.mutate(values);
    } else if (hrefAnterior === "/coordenadores") {
      mutationUpdateCoordenador.mutate(values);
    } else if (hrefAnterior === "/agricultores") {
      mutationUpdateAgricultor.mutate(values);
    }

  }


  const handleGetImagem = async () => {
    const url = await getArquivo(usuario.imagem);
    setFormData({ ...formData, imagem: url });
  }

  useEffect(() => {
    if (usuario?.imagem) {
      handleGetImagem();
    }
  }
    , [usuario]);


  return (
    <div id="header" className={style.container}>
      <HeaderDetalhamento
        hrefAnterior={backDetalhamento}
        diretorioAnterior="Home / Agricultores / "
        diretorioAtual="Detalhamento do Usuário"

      />



      <div className={style.container__ContainerForm}>
        <Formik
          initialValues={formData}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
           handleSubmit(values);

          }}
        >
          {(formik) => {
            return (

              <Form
                className={style.container__ContainerForm_form}
              >
                <div className={style.container__profile}>

                  {editar ? (
                     <div className={style.container__profile_img}>
                     <input
                       type="file"
                       accept="image/*"
                       onChange={handleImageChange}
                       style={{ display: 'none' }}
                       id="upload-button"
                     />
                     <label htmlFor="upload-button">
                       <Image
                         src={selectedImage || usuario?.imagem || "/assets/agricultorteste.png"}
                         alt="Foto do usuário"
                         width={72}
                         height={72}
                         style={{ cursor: 'pointer' }}
                       />
                     </label>
                     <h1>{usuario?.nome}</h1>
                   </div>
                  ) : (
                    <div className={style.container__profile_img}>
                      <Image
                        src={usuario?.imagem ? usuario.imagem : "/assets/agricultorteste.png"}
                        alt="Foto do usuário"
                        width={72}
                        height={72}
                      />
                      <h1>{usuario?.nome}</h1>
                    </div>
                  )
                  }





                  {hrefAnterior === "/agricultores" || hrefAnterior === "/funcionarios" || hrefAnterior === "/coordenadores" ? (
                    <>
                      {editar === false ? (
                        <button
                          onClick={() => setEditar(true)}
                          className={style.container__profile_button}>

                          <span>Editar</span>
                          <Image src="/assets/iconLapis.svg" alt="editar perfil" width={20} height={20} />
                        </button >
                      ) : (
                        <button
                          onClick={() => setEditar(false)}
                          className={style.container__profile_button}>

                          <span>Salvar</span>
                          <Image src="/assets/iconLapis.svg" alt="editar perfil" width={20} height={20} />
                        </button >
                      )}
                    </>
                  ) : ("")}

                </div>

                <DadosForm formik={formik} editar={editar} hrefAnterior={hrefAnterior} />
                <DadosEndereco formik={formik} editar={editar} />
                {
                  hrefAnterior === "/agricultores" && (
                    <DadosSementes formik={formik} editar={editar} />
                  )
                }
                {
                  hrefAnterior === "/agricultores/solicitacoes" ? (
                    <div className={style.container__profile}>
                      <button
                        type="submit"
                        onClick={() => setEditar(true)}
                        className={style.container__profile_button}>

                        <span>Recusar Solicitação</span>
                        <Image src="/assets/iconLapis.svg" alt="Recusar" width={25} height={25} />
                      </button >
                      <button
                        type="submit"
                        onClick={() => mutationAprovacao.mutate(usuario.id)}
                        className={style.container__profile_button}>

                        <span>Aprovar Solicitação</span>
                        <Image src="/assets/iconLapis.svg" alt="Aprovar" width={25} height={25} />
                      </button >

                    </div>
                  ) : ("")
                }
              </Form >
            )
          }
          }
        </Formik >
      </div >

    </div >
  );
};


export default DetalhamentoUsuario;