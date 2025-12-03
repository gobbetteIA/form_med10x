# 🔧 Guia de Configuração Rápida

## Passo 1: Configurar Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em "New Project"
3. Preencha os dados:
   - **Name**: Captação Médicos
   - **Database Password**: Escolha uma senha forte
   - **Region**: South America (São Paulo) - para melhor performance no Brasil
4. Aguarde a criação do projeto (1-2 minutos)

## Passo 2: Criar o Banco de Dados

1. No painel do Supabase, vá em **SQL Editor** (menu lateral)
2. Clique em "New Query"
3. Copie todo o conteúdo do arquivo `database-schema.sql`
4. Cole no editor SQL
5. Clique em "Run" ou pressione `Ctrl + Enter`
6. Aguarde a mensagem de sucesso ✅

## Passo 3: Obter as Credenciais

1. No menu lateral, vá em **Settings** > **API**
2. Copie os seguintes valores:

```
Project URL: https://xxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Passo 4: Configurar o Projeto

1. Abra o arquivo `app.js`
2. Nas primeiras linhas, substitua:

```javascript
const SUPABASE_URL = 'https://xxxxxxxxxx.supabase.co'; // Cole sua URL aqui
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Cole sua chave aqui
```

## Passo 5: Configurar WhatsApp e Calendly

No arquivo `app.js`, procure pela função `renderThankYouScreen()` e atualize:

```javascript
// Linha ~580 - Substitua pelo seu número de WhatsApp
const whatsappUrl = `https://wa.me/5511999999999?text=${whatsappMessage}`;
// Exemplo: https://wa.me/5511987654321?text=...

// Linha ~581 - Substitua pelo seu link do Calendly
const calendlyUrl = 'https://calendly.com/seu-usuario/diagnostico';
// Exemplo: https://calendly.com/drclinica/consulta-diagnostico
```

## Passo 6: Testar o Formulário

### Opção 1: Abrir diretamente
- Dê duplo clique no arquivo `index.html`

### Opção 2: Usar servidor local (recomendado)

**Com Python:**
```bash
cd "C:\Users\WTINFO PC\Desktop\Formulario"
python -m http.server 8000
```
Acesse: http://localhost:8000

**Com Node.js:**
```bash
cd "C:\Users\WTINFO PC\Desktop\Formulario"
npx http-server
```

**Com VS Code:**
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

## Passo 7: Verificar os Dados

1. Preencha o formulário de teste
2. No Supabase, vá em **Table Editor**
3. Selecione a tabela `captacao_medicos`
4. Verifique se os dados foram salvos ✅

## 📊 Visualizar Analytics

No Supabase SQL Editor, você pode executar:

```sql
-- Ver todos os leads
SELECT * FROM captacao_medicos ORDER BY created_at DESC;

-- Resumo por especialidade
SELECT * FROM vw_resumo_por_especialidade;

-- Leads recentes (últimos 30 dias)
SELECT * FROM vw_leads_recentes;

-- Leads por investimento
SELECT * FROM vw_leads_por_investimento;
```

## 🚨 Solução de Problemas

### Erro: "Failed to fetch"
- Verifique se as credenciais do Supabase estão corretas
- Confirme que o projeto está ativo no Supabase

### Erro: "Permission denied"
- Verifique se as políticas RLS foram criadas corretamente
- Execute novamente o script `database-schema.sql`

### Formulário não envia
- Abra o Console do navegador (F12)
- Verifique se há erros em vermelho
- Confirme que a biblioteca do Supabase foi carregada

## 🎉 Pronto!

Seu formulário está configurado e pronto para captar leads!

### Próximos passos opcionais:
- [ ] Configurar notificações por email no Supabase
- [ ] Integrar com Google Analytics
- [ ] Adicionar pixel do Facebook/Meta Ads
- [ ] Criar dashboard de análise de leads
- [ ] Configurar backup automático dos dados
