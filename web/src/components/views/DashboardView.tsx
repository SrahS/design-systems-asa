"use client";

import { ArrowDownToLine, ArrowUpFromLine, Receipt } from "lucide-react";
import { BalanceCard } from "../dashboard/BalanceCard";
import { MetricCard } from "../dashboard/MetricCard";
import { ActionCard } from "../dashboard/ActionCard";

export const DashboardView = () => {
    const accountMock = {
        name: "Conta Principal",
        status: "Ativa",
        balance: 15420.50,
        routing: "0001",
        number: "12345-6"
    };

    const metricsMock = [
        { label: "Entradas deste mês", amount: 5200.00, type: "positive" as const },
        { label: "Saídas deste mês", amount: -2150.00, type: "negative" as const }
    ];

    return (
        <main className="p-4 sm:p-6 lg:p-8 space-y-10 max-w-7xl mx-auto focus:outline-none" tabIndex={-1}>

            <h2 className="sr-only">Resumo da sua conta</h2>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6" aria-label="Informações de Saldo">
                <div className="lg:col-span-1">
                    <BalanceCard account={accountMock} />
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {metricsMock.map((metric, idx) => (
                        <MetricCard key={idx} metric={metric} />
                    ))}
                </div>
            </section>

            <section aria-labelledby="quick-actions-title">
                <h3 id="quick-actions-title" className="text-3xl font-bold text-gray-900 mb-6">
                    O que você deseja fazer?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ActionCard
                        icon={<ArrowDownToLine className="w-8 h-8" aria-hidden="true" />}
                        title="Receber Dinheiro"
                        description="Gerar um boleto ou chave Pix para receber."
                        onClick={() => console.log("Ação: Receber")}
                    />
                    <ActionCard
                        icon={<ArrowUpFromLine className="w-8 h-8" aria-hidden="true" />}
                        title="Transferir"
                        description="Fazer um Pix ou TED para outra pessoa."
                        onClick={() => console.log("Ação: Transferir")}
                    />
                    <ActionCard
                        icon={<Receipt className="w-8 h-8" aria-hidden="true" />}
                        title="Pagar Contas"
                        description="Pagar boletos de água, luz, internet, etc."
                        onClick={() => console.log("Ação: Pagar")}
                    />
                </div>
            </section>

        </main>
    );
};