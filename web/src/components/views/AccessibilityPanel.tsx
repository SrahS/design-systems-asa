"use client";

import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Type, Eye, LayoutTemplate, CheckCircle2 } from "lucide-react";

export function AccessibilityPanel() {
    const { fontSize, contrast, layout, setFontSize, setContrast, setLayout } = useAccessibility();

    const getButtonClass = (isActive: boolean) => `
    relative flex flex-col items-center justify-center gap-3 p-6 
    rounded-2xl border-4 transition-all min-h-[120px] focus:outline-none focus:ring-4 focus:ring-blue-300
    ${isActive
            ? "border-blue-600 bg-blue-50 text-blue-900 shadow-md"
            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
        }
  `;

    return (
        <section
            className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10"
            aria-labelledby="accessibility-title"
        >
            <div className="text-center sm:text-left">
                <h2 id="accessibility-title" className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Personalizar meu Aplicativo
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                    Ajuste as opções abaixo para deixar o aplicativo mais confortável para você usar. Suas escolhas ficam salvas automaticamente.
                </p>
            </div>

            <div className="space-y-10">

                <fieldset className="space-y-4">
                    <legend className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b-2 border-gray-100 pb-2 w-full">
                        <Type className="w-8 h-8 text-blue-600" aria-hidden="true" />
                        Tamanho das Letras
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                            onClick={() => setFontSize("normal")}
                            className={getButtonClass(fontSize === "normal")}
                            aria-pressed={fontSize === "normal"}
                        >
                            {fontSize === "normal" && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-blue-600" />}
                            <span className="text-xl font-medium">Tamanho Normal</span>
                        </button>

                        <button
                            onClick={() => setFontSize("large")}
                            className={getButtonClass(fontSize === "large")}
                            aria-pressed={fontSize === "large"}
                        >
                            {fontSize === "large" && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-blue-600" />}
                            <span className="text-2xl font-bold">Letras Grandes</span>
                        </button>

                        <button
                            onClick={() => setFontSize("extra-large")}
                            className={getButtonClass(fontSize === "extra-large")}
                            aria-pressed={fontSize === "extra-large"}
                        >
                            {fontSize === "extra-large" && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-blue-600" />}
                            <span className="text-3xl font-extrabold">Letras Gigantes</span>
                        </button>
                    </div>
                </fieldset>

                <fieldset className="space-y-4">
                    <legend className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b-2 border-gray-100 pb-2 w-full">
                        <Eye className="w-8 h-8 text-blue-600" aria-hidden="true" />
                        Cores e Contraste
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => setContrast("normal")}
                            className={getButtonClass(contrast === "normal")}
                            aria-pressed={contrast === "normal"}
                        >
                            {contrast === "normal" && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-blue-600" />}
                            <span className="text-xl font-bold">Cores Suaves (Padrão)</span>
                        </button>

                        <button
                            onClick={() => setContrast("high")}
                            className={getButtonClass(contrast === "high")}
                            aria-pressed={contrast === "high"}
                        >
                            {contrast === "high" && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-blue-600" />}
                            <span className="text-xl font-bold text-black bg-yellow-300 px-4 py-2 rounded-lg border-2 border-black">
                                Alto Contraste
                            </span>
                            <span className="text-base font-medium">Mais fácil de ler</span>
                        </button>
                    </div>
                </fieldset>

                <fieldset className="space-y-4">
                    <legend className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b-2 border-gray-100 pb-2 w-full">
                        <LayoutTemplate className="w-8 h-8 text-blue-600" aria-hidden="true" />
                        Quantidade de Informações
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => setLayout("simplified")}
                            className={getButtonClass(layout === "simplified")}
                            aria-pressed={layout === "simplified"}
                        >
                            {layout === "simplified" && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-blue-600" />}
                            <span className="text-xl font-bold">Modo Simples</span>
                            <span className="text-base font-medium text-center px-4">
                                Esconde botões extras e mostra apenas o que é essencial.
                            </span>
                        </button>

                        <button
                            onClick={() => setLayout("standard")}
                            className={getButtonClass(layout === "standard")}
                            aria-pressed={layout === "standard"}
                        >
                            {layout === "standard" && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-blue-600" />}
                            <span className="text-xl font-bold">Modo Completo</span>
                            <span className="text-base font-medium text-center px-4">
                                Mostra todas as opções e ferramentas disponíveis.
                            </span>
                        </button>
                    </div>
                </fieldset>

            </div>
        </section>
    );
}