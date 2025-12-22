"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, ArrowRight, CheckCircle, RefreshCw, Clock } from 'lucide-react';
import Link from 'next/link';

export default function SafeAlertPage() {
  const discordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&permissions=8&redirect_uri=https%3A%2F%2Flostyo.com%2Fstart&integration_type=0&scope=bot`;

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <div className="bg-[#141417] rounded-[3rem] p-8 md:p-12 border border-[#1A1A1E] shadow-2xl">
          {/* Header com destaque visual */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-red-500/10 border-2 border-red-500/20 mb-6 relative">
              <AlertTriangle className="w-12 h-12 text-red-500" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
              Permissões de Administrador
            </h1>
            <p className="text-white/50 text-lg font-medium max-w-xl mx-auto">
              Por que o LostyoCord precisa de acesso total e como isso beneficia você
            </p>
          </div>

          {/* Cards de informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Por que precisamos */}
            <div className="bg-[#1A1A1E] rounded-2xl p-6 border border-[#2A2A2E] hover:border-[#5865F2]/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#5865F2]" />
                </div>
                <h3 className="text-white font-bold text-lg">Por que Admin?</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Para automatizar moderação, gerenciar cargos, configurar canais e acessar 
                análises sem configuração manual. O bot faz o trabalho pesado por você.
              </p>
            </div>

            {/* Atualizações constantes */}
            <div className="bg-[#1A1A1E] rounded-2xl p-6 border border-[#2A2A2E] hover:border-[#5865F2]/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-white font-bold text-lg">Atualizações Constantes</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Lançamos melhorias semanais. Com permissão total, novas features funcionam 
                instantaneamente - sem precisar pedir que você atualize permissões toda vez.
              </p>
            </div>

            {/* O que não acessamos */}
            <div className="bg-[#1A1A1E] rounded-2xl p-6 border border-[#2A2A2E] hover:border-[#5865F2]/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-white font-bold text-lg">O que NÃO acessamos</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Mensagens privadas, dados de pagamento, ou exclusão do servidor. 
                Apenas operações do bot dentro da sua comunidade.
              </p>
            </div>

            {/* Segurança */}
            <div className="bg-[#1A1A1E] rounded-2xl p-6 border border-[#2A2A2E] hover:border-[#5865F2]/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-white font-bold text-lg">Controle Total</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Você pode remover o bot a qualquer momento. Todos os dados são 
                imediatamente apagados. Totalmente compatível com GDPR.
              </p>
            </div>
          </div>

          {/* Destaque visual para benefício principal */}
          <div className="bg-gradient-to-r from-[#5865F2]/10 to-[#4752C4]/10 rounded-2xl p-6 mb-8 border border-[#5865F2]/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#5865F2] flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Sem atualizações constantes
                </h3>
                <p className="text-white/60 text-sm">
                  Escolhemos permissões de administrador justamente para evitar que você precise 
                  ficar atualizando permissões a cada nova funcionalidade. O LostyoCord evolui 
                  constantemente, e com admin, tudo funciona automaticamente.
                </p>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col gap-3">
            <Link href={discordOAuthUrl} className="w-full">
              <Button 
                className="w-full h-14 text-lg font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all shadow-lg shadow-[#5865F2]/20"
              >
                Entendi - Adicionar LostyoCord
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            
            <Link href="/start" className="w-full">
              <Button 
                variant="ghost" 
                className="w-full h-14 text-lg font-bold rounded-full bg-[#1A1A1E] hover:bg-[#2A2A2E] text-white/60 hover:text-white transition-all"
              >
                Cancelar - Voltar
              </Button>
            </Link>
          </div>

          {/* Rodapé com disclaimer */}
          <div className="mt-6 text-center">
            <p className="text-white/30 text-xs leading-relaxed">
              Ao clicar em "Adicionar LostyoCord", você concorda em conceder permissões de administrador 
              necessárias para o funcionamento completo do bot. Suas permissões podem ser revogadas a 
              qualquer momento através das configurações do seu servidor Discord.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}