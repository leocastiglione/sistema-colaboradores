import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { api } from "@/services/api";

export default async function ListaUsuarios() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    await connection();
    let usuarios;

    try {
        const resposta = await api.get("/usuarios", {
            headers: { Authorization: `Bearer ${token}` },
        });
        usuarios = resposta.data;
    } catch (erro) {

        const status = axios.isAxiosError(erro) ? erro.response?.status : null;
        if (status === 401 || status === 403) {
            redirect("/login");
        }
        return (
            <p role="alert">
                Não foi possível consultar a API. Atualize a página para tentar novamente.
            </p>
        );
    }

    if (!Array.isArray(usuarios)) {
        return <p role="alert">A API respondeu em um formato inesperado.</p>;
    }

    return (
        <section>
            <h1 className="mb-4 text-2xl font-semibold">Lista de usuários</h1>
            {usuarios.length === 0 ? (
                <p>Nenhum usuário cadastrado.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white text-left">
                        <caption className="sr-only">Usuários cadastrados na API</caption>
                        <thead className="bg-slate-200">
                            <tr>
                                <th scope="col" className="p-2">ID</th>
                                <th scope="col" className="p-2">Nome</th>
                                <th scope="col" className="p-2">E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id} className="border-b">
                                    <td className="p-2">{usuario.id}</td>
                                    <td className="p-2">{usuario.nome}</td>
                                    <td className="p-2">{usuario.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}