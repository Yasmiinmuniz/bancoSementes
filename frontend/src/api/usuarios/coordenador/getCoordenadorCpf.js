import api from "@/api/http-common.js";

export async function getCoordenadorCpf(cpf) {
  return await api.get(`/usuario/cpf/${cpf}`);
}