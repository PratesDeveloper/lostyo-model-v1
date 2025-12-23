# SECURITY_RULES.md

> **ATENÇÃO PARA IA:** Estas regras são MANDATÓRIAS. Priorize segurança acima de performance ou conveniência. Se houver dúvida, escolha a abordagem mais restritiva.

## 1. Variáveis de Ambiente e Segredos
- **REGRA DE OURO:** NUNCA faça hardcode de senhas, chaves de API ou tokens no código.
- **Prefixos:** Utilize o prefixo `NEXT_PUBLIC_` *apenas* para variáveis que DEVEM ser expostas ao navegador (ex: Analytics, Chaves públicas do Firebase).
- **Validação:** Todas as variáveis de ambiente devem ser validadas na inicialização (sugestão: usar `t3-env` ou `zod`).
- **Verificação:** Antes de finalizar um componente, verifique se `process.env.SUA_CHAVE_PRIVADA` não está sendo importada em um arquivo com `'use client'`.

## 2. Server Components vs. Client Components (Next.js App Router)
- **Padrão:** Todo componente deve ser **Server Component** por padrão.
- **Isolamento:** Mantenha a lógica de banco de dados e chaves de API estritamente nos Server Components ou Server Actions.
- **'use client':** Use apenas para interatividade (onClick, useState). Nunca passe dados sensíveis via props para Client Components.
- **Serialização:** Não passe objetos inteiros do banco de dados (ex: User object com hash de senha) para o cliente. Crie DTOs (Data Transfer Objects) retornando apenas o necessário.

## 3. Server Actions e API Routes
- **Validação de Input:** NUNCA confie nos dados vindos do cliente. Use **Zod** para validar 100% dos inputs em Server Actions e API Routes.
- **Autenticação:** Verifique a sessão do usuário DENTRO da Server Action ou Rota, não confie apenas no middleware ou verificação no frontend.
- **CSRF:** Certifique-se de que as mutações de dados (POST/PUT/DELETE) estejam protegidas contra CSRF (Server Actions do Next.js já lidam com isso nativamente, mas API Routes precisam de cuidado).

## 4. Proteção de Rotas (Middleware)
- Use o `middleware.ts` para bloquear acesso a rotas privadas (`/dashboard`, `/settings`) se não houver sessão válida.
- Não renderize conteúdo protegido condicionalmente no cliente; o bloqueio deve ocorrer antes da renderização.

## 5. Prevenção de XSS e Injeção
- **HTML Puro:** Evite ao máximo `dangerouslySetInnerHTML`. Se for estritamente necessário, sanitize o conteúdo com `dompurify`.
- **SQL Injection:** Nunca concatene strings em queries de banco de dados. Use ORMs (Prisma, Drizzle) ou query builders que parametrizem inputs.
- **Links:** Em tags `<a>` com `target="_blank"`, sempre adicione `rel="noopener noreferrer"`.

## 6. Dependências
- Evite pacotes npm abandonados ou com pouca manutenção.
- Rode `npm audit` regularmente.