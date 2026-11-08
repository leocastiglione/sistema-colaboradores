"use client";

import { useState } from "react";

const USUARIOS_POR_PAGINA = 5;

export default function TabelaUsuarios({ usuarios }) {
    const [paginaAtual, setPaginaAtual] = useState(1);

    const totalPaginas = Math.ceil(
        usuarios.length / USUARIOS_POR_PAGINA
    );

    const indiceInicial = (paginaAtual - 1) * USUARIOS_POR_PAGINA;
    const indiceFinal = indiceInicial + USUARIOS_POR_PAGINA;

    const usuariosPagina = usuarios.slice(
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

    if (usuarios.length === 0) {
        return <p>Nenhum usuário cadastrado.</p>;
    }

    return (
        <div>
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
                            <tr key={usuario.id} className="border-b">
                                <td className="p-2">{usuario.id}</td>
                                <td className="p-2">{usuario.nome}</td>
                                <td className="p-2">{usuario.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <button
                    onClick={paginaAnterior}
                    disabled={paginaAtual === 1}
                    className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Anterior
                </button>

                <span>
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
        </div>
    );
}
