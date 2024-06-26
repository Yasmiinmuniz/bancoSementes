import React from "react";
import styles from "@/app/agricultores/novoAgricultor/index.module.scss"
import CoordenadorForm from "@/components/CoordenadorForm";

export default function novoCoordenadorPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageContainer__content}>
                <CoordenadorForm
                    diretorioAnterior="Home / Coordenadores /"
                    diretorioAtual="Novo(a) Coordenador(a)"
                    hrefAnterior="/coordenadores" />
            </div>
        </div>
    );
}