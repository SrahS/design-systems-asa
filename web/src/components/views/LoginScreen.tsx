"use client";

import { useState, type ComponentProps } from "react";
import { Wallet, User, Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/services/useLogin";

const PRIVACY_URL = "https://teste.com/privacy";
const TERMS_URL = "https://teste.com/terms";

export const LoginScreen = () => {
    const { submit, error, isSubmitting } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secure, setSecure] = useState(true);

    const onSubmit: ComponentProps<"form">["onSubmit"] = (e) => {
        e.preventDefault();
        void submit(email, password);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 sm:p-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-8">

                {/* Cabeçalho */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Wallet className="h-8 w-8 text-blue-600" aria-hidden="true" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Bem-vindo</h1>
                    <p className="text-base text-gray-600">
                        Entre com seu e-mail e senha para acessar suas finanças.
                    </p>
                </div>

                {/* Formulário */}
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-4">

                        {/* Campo de E-mail */}
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-mail"
                                autoComplete="email"
                                required
                                aria-label="Campo de e-mail"
                                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                        </div>

                        {/* Campo de Senha */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <input
                                id="password"
                                type={secure ? "password" : "text"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Senha"
                                autoComplete="current-password"
                                required
                                aria-label="Campo de senha"
                                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setSecure((v) => !v)}
                                aria-label={secure ? "Mostrar senha" : "Ocultar senha"}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-blue-600"
                            >
                                {secure ? (
                                    <Eye className="h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <EyeOff className="h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mensagem de Erro */}
                    {error ? (
                        <div className="text-red-600 text-sm font-medium text-center" role="alert">
                            {error}
                        </div>
                    ) : null}

                    {/* Botão de Ação */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-label="Entrar"
                        className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? "Entrando…" : "Entrar"}
                    </button>
                </form>

                {/* Rodapé e Links */}
                <div className="text-center">
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Ao continuar, você aceita nossa{" "}
                        <a
                            href={PRIVACY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:underline focus:outline-none focus:underline"
                        >
                            Política de Privacidade
                        </a>{" "}
                        e os{" "}
                        <a
                            href={TERMS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:underline focus:outline-none focus:underline"
                        >
                            Termos de Uso
                        </a>
                        .
                    </p>
                </div>
            </div>
        </main>
    );
};