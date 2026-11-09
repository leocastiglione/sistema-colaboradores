
"use client";

import { useState } from "react";

const USUARIOS_POR_PAGINA = 5;

export default function TabelaUsuarios({ usuarios }) {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [busca, setBusca] = useState("");

    // Filtra pelo nome ou e-mail
    const usuariosFiltrados = usuarios.filter((usuario) => {
        const textoBusca = busca.toLowerCase();

        return (
            usuario.nome.toLowerCase().includes(textoBusca) ||
            usuario.email.toLowerCase().includes(textoBusca)
        );
    });

    // Calcula a quantidade de páginas após o filtro
    const totalPaginas = Math.ceil(
        usuariosFiltrados.length / USUARIOS_POR_PAGINA
    );

    // Calcula os índices da paginação
    const indiceInicial = (paginaAtual - 1) * USUARIOS_POR_PAGINA;
    const indiceFinal = indiceInicial + USUARIOS_POR_PAGINA;

    // Seleciona os usuários da página atual
    const usuariosPagina = usuariosFiltrados.slice(
        indiceInicial,
        indiceFinal
    );

    function paginaAnterior() {
        setPaginaAtual((pagina) => Math.max(1, pagina - 1));
    }

    function proximaPagina() {
        setPaginaAtual((pagina) =>
            Math.min(totalPaginas, pagina + 1)
        );
    }

    // Atualiza a busca e retorna à primeira página
    function alterarBusca(event) {
        setBusca(event.target.value);
        setPaginaAtual(1);
    }

    return (
        <div>
            {/* Campo de busca */}
            <div className="mb-4">
                <label
                    htmlFor="busca"
                    className="mb-2 block font-medium"
                >
                    Buscar usuário:
                </label>

                <input
                    id="busca"
                    type="text"
                    value={busca}
                    onChange={alterarBusca}
                    placeholder="Digite o nome ou e-mail..."
                    className="w-full rounded border border-slate-300 p-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
            </div>

            {/* Verifica se existem resultados */}
            {usuariosFiltrados.length === 0 ? (
                <p role="status" className="py-4 text-slate-600">
                    Nenhum usuário encontrado.
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white text-left">
                            <caption className="sr-only">
                                Usuários cadastrados na API
                            </caption>

                            <thead className="bg-slate-200">
                                <tr>
                                    <th scope="col" className="p-2">ID</th>
                                    <th scope="col" className="p-2">Nome</th>
                                    <th scope="col" className="p-2">E-mail</th>
                                </tr>
                            </thead>

                            <tbody>
                                {usuariosPagina.map((usuario) => (
                                    <tr
                                        key={usuario.id}
                                        className="border-b"
                                    >
                                        <td className="p-2">{usuario.id}</td>
                                        <td className="p-2">{usuario.nome}</td>
                                        <td className="p-2">{usuario.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginação */}
                    <div className="mt-4 flex items-center justify-between gap-2">
                        <button
                            onClick={paginaAnterior}
                            disabled={paginaAtual === 1}
                            className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Anterior
                        </button>

                        <span className="text-sm text-center">
                            Página {paginaAtual} de {totalPaginas}
                        </span>

                        <button
                            onClick={proximaPagina}
                            disabled={paginaAtual === totalPaginas}
                            className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Próxima
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
