# IBRAS — Instituto Brasileiro de Atenção Social

<div align="center">
  <img src="public/logo-ibras.png" alt="Logo IBRAS" width="160" />
  <p><strong>Transformando realidades através da cidadania, inclusão social e transparência ativa.</strong></p>
  <p><em>Organização da Sociedade Civil (OSC) sem fins lucrativos — Salvador, Bahia.</em></p>
  <p><strong>CNPJ: 30.285.883/0001-94</strong></p>
</div>

---

## 📌 Sobre o Projeto

Este repositório contém o código-fonte do portal institucional oficial do **IBRAS (Instituto Brasileiro de Atenção Social)**. A plataforma foi desenvolvida com foco em modernidade, alto impacto visual, transparência pública e facilidade de gestão de conteúdo para a equipe institucional.

- **Website Oficial:** [https://siteibras.vercel.app](https://siteibras.vercel.app)
- **Repositório GitHub:** [https://github.com/Esamwell/siteibras](https://github.com/Esamwell/siteibras)

---

## ✨ Principais Funcionalidades

### 🌐 Portal Institucional
- **Design Moderno e Responsivo:** 100% adaptado para computadores, tablets e smartphones (iOS e Android), sem rolagem lateral ou quebra de layout.
- **Hero & Vídeo Ambiente:** Apresentação visual limpa com chamada para ação e badges institucionais.
- **Quem Somos & Equipe:** Histórico de atuação, missão, visão, valores e diretoria executiva.
- **Eixos de Atuação & Projetos:** Informações sobre iniciativas comunitárias e conformidade com o MROSC (Lei 13.019/2014).
- **Portal de Transparência Ativa:** Informações cadastrais, conformidade LGPD e compromisso contábil.
- **Formulário de Contato:** Envio direto de mensagens para `contato@ibrasinstituto.org` com confirmação visual na tela.

### 📰 Central de Notícias (`/noticias`)
- **Destaque Principal:** Notícia de capa com foto ampla e resumo.
- **Filtros por Categoria:** Institucional, Cidadania, Parcerias, Voluntariado e Eventos.
- **Busca em Tempo Real:** Pesquisa instantânea por título, resumo ou conteúdo.
- **Paginação:** Exibição organizada em grade.
- **Leitor de Matérias:** Modal rico com tipografia legível, imagem e formatação de texto.

### 🔐 Painel Administrativo (`/admin`)
- **Acesso Seguro:** Login com criptografia de senha via SHA-256 no navegador.
- **Publicação na Nuvem:** Criação e edição de notícias salvas diretamente no banco **Supabase (PostgreSQL)** em tempo real.
- **Editor Rico (WYSIWYG):** Formatação de texto (negrito, itálico, títulos, listas e citações).
- **Upload de Imagens:** Suporte a upload local com pré-visualização em miniatura.
- **Gerenciamento de Notícias:** Definir matéria como destaque principal, editar e excluir.
- **Gestão de Usuários:** Criação de novos administradores/editores e alteração de senha do usuário logado.
- **Backup dos Dados:** Botão de exportação rápida para arquivo JSON.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** CSS3 Vanilla com variáveis customizadas (Design System exclusivo)
- **Banco de Dados em Nuvem:** [Supabase](https://supabase.com/) (PostgreSQL + Realtime API)
- **Roteamento:** [React Router v7](https://reactrouter.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Hospedagem & Deploy:** [Vercel](https://vercel.com/) com suporte a SPA Rewrites (`vercel.json`)

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Gerenciador de pacotes `npm` ou `yarn`

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Esamwell/siteibras.git
   cd siteibras
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O site estará disponível em `http://localhost:5173`.

4. **Gerar a versão de produção:**
   ```bash
   npm run build
   ```

---

## 📁 Estrutura de Pastas

```text
siteibras/
├── public/                 # Imagens estáticas, fotos da equipe e favicon
│   ├── logo-ibras.png      # Logo oficial
│   ├── equipe/             # Fotos institucionais
│   ├── _redirects          # Configuração de SPA (fallback)
├── src/
│   ├── components/         # Componentes modulares da interface
│   │   ├── Navbar.tsx      # Barra de navegação com menu móvel
│   │   ├── Hero.tsx        # Seção de apresentação principal
│   │   ├── Stats.tsx       # Números de impacto
│   │   ├── Pillars.tsx     # Pilares institucionais
│   │   ├── About.tsx       # Quem Somos e Diretoria
│   │   ├── Projects.tsx    # Projetos e eixos de atuação
│   │   ├── News.tsx        # Seção de notícias da página inicial
│   │   ├── Transparency.tsx# Transparência e LGPD
│   │   ├── Contact.tsx     # Contato e formulário
│   │   └── Footer.tsx      # Rodapé e links legais
│   ├── pages/              # Páginas completas (Rotas)
│   │   ├── AdminPage.tsx   # Painel Administrativo (/admin)
│   │   └── NoticiasPage.tsx# Central de Notícias (/noticias)
│   ├── utils/              # Funções utilitárias e conectores
│   │   ├── supabase.ts     # Cliente do banco de dados Supabase
│   │   ├── newsStorage.ts  # Gerenciamento e sincronização de notícias
│   │   └── crypto.ts       # Hash SHA-256 para senhas
│   ├── types/              # Definições de tipos TypeScript
│   ├── data/               # Dados padrão de contingência
│   ├── App.tsx             # Componente raiz da página inicial
│   ├── main.tsx            # Ponto de entrada com React Router
│   └── index.css           # Design System e variáveis globais
├── vercel.json             # Regras de redirecionamento para Vercel SPA
└── package.json            # Dependências e scripts do projeto
```

---

## 🔒 Acesso ao Painel Administrativo

- **URL de acesso:** `/admin` ou através do link discreto no rodapé do site.
- **Credenciais padrão de primeiro acesso:**
  - **Usuário:** `admin`
  - **Senha inicial:** `ibras2026`
- *Recomenda-se alterar a senha padrão na aba "Minha Senha" após o primeiro login.*

---

## 📄 Licença e Direitos Autorais

© 2014–2026 **IBRAS – Instituto Brasileiro de Atenção Social**.  
Todos os direitos reservados.  

- **Sede:** Rua dos Rádioamadores, 73 - Pituaçu, Salvador - BA, CEP 41741-080  
- **E-mail:** [contato@ibrasinstituto.org](mailto:contato@ibrasinstituto.org)
