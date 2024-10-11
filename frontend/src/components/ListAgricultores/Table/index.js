import Image from "next/image";
import style from "./table.module.scss";
import Link from "next/link";
import ExcluirButton from "@/components/ExcluirButton";
import { deleteAgricultor } from "@/api/usuarios/agricultor/deleteAgricultor";
import { useState } from "react";


export default function tableLayout({ table1, table2, table3, table4, listAgricultores, setAgricultores, onSelectAgricultor }) {

  const handleDeleteAgricultor = async (agricultorId) => {
    await deleteAgricultor(agricultorId);
    setAgricultores(listAgricultores.filter(agricultori => agricultori.id !== agricultorId))
  }



  return (
    <>
      <div className={style.contentBigger}>
        <div className={style.content}>
          <table className={style.content__table}>
            <thead className={style.content__table__header}>
              <tr>
                <th>{table1}</th>
                <th>{table2}</th>
                <th>{table3}</th>

                <th className={style.content__table__header_name3}>
                  <div >
                    {table4}
                    <Image src="/assets/iconInformacao.svg" alt="Visualizar" width={27} height={26} />

                  </div>

                </th>
              </tr>
            </thead>
            <tbody className={style.content__table__body}>
              {listAgricultores.map((agricultor, index) => {
                return (
                  <tr key={index}>
                    <td>{agricultor.nome}</td>
                    <td>{agricultor.nomePopular}</td>
                    <td>{agricultor.contato}</td>
                    <td>
                      <div >
                        <Image src="/assets/iconOlho.svg" onClick={() => onSelectAgricultor(agricultor)} alt="Visualizar" width={27} height={26} />
                        <ExcluirButton itemId={agricultor.id} onDelete={handleDeleteAgricultor} />

                      </div>
                    </td>
                  </tr>
                )
              }
              )
              }

            </tbody>
          </table>
        </div>
      </div>
      <div className={style.contentSmall}>
        <div className={style.content}>
          <table className={style.content__table}>
            <tbody className={style.content__table__body}>
              {listAgricultores.map((agricultor, index) => {
                return (
                  <tr key={index}>
                    <td data-label="Nome">{agricultor.nome}</td>
                    <td data-label="Apelido">{agricultor.nomePopular}</td>
                    <td data-label="Telefone">{agricultor.contato}</td>
                    <td className={style.content__table__buttonTabela}>
                    <div className={style.content__table__button}>
                      <h1>Visualizar</h1>
                        <Image className={style.content__table__button_img} src="/assets/iconOlhoBranco.png" onClick={() => onSelectAgricultor(agricultor)} alt="Visualizar" width={24} height={26} />

                        <ExcluirButton itemId={agricultor.id} onDelete={handleDeleteAgricultor} />

                      </div>
                    </td>
                  </tr>
                )
              }
              )
              }

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}



