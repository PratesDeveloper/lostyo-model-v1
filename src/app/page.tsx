"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Shield, Zap, Layout, ArrowRight } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20 flex flex-col items-center text-center space-y-8">
        <Badge variant="secondary" className="px-4 py-1 text-sm rounded-full">
          Pronto para começar
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl max-w-3xl">
          Construa algo <span className="text-primary">incrível</span> hoje mesmo
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Esta é a sua nova aplicação Next.js. Comece a editar src/app/page.tsx para criar a experiência perfeita para seus usuários.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button size="lg" className="gap-2">
            Começar Agora <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline">
            Ver Documentação
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30 rounded-3xl mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Zap className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Performance</CardTitle>
              <CardDescription>Otimizado para máxima velocidade e SEO.</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Práticas modernas de segurança integradas.</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Layout className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Responsivo</CardTitle>
              <CardDescription>Funciona perfeitamente em qualquer dispositivo.</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Rocket className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Escalável</CardTitle>
              <CardDescription>Pronto para crescer com o seu negócio.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          Minha App
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Todos os direitos reservados.
        </p>
        <MadeWithDyad />
      </footer>
    </div>
  );
}