# Formulário de Captação de Médicos

Um formulário multi-etapas premium para captação de leads médicos com integração ao Supabase.

## 🚀 Configuração

### 1. Configurar Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Vá em **SQL Editor** e execute o seguinte script para criar a tabela:

```sql
-- Criar tabela para captação de médicos
CREATE TABLE captacao_medicos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome_completo TEXT NOT NULL,
    especialidade TEXT NOT NULL,
    cidade_estado TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    email TEXT NOT NULL,
    composicao_faturamento TEXT NOT NULL,
    faturamento_mensal TEXT NOT NULL,
    investimento_marketing TEXT NOT NULL,
    maior_desafio TEXT NOT NULL,
    equipe_whatsapp TEXT NOT NULL,
    prazo_crescimento TEXT NOT NULL,
    disposicao_investir TEXT NOT NULL,
    problema_90_dias TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE captacao_medicos ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserções públicas
CREATE POLICY "Permitir inserções públicas" ON captacao_medicos
    FOR INSERT
    WITH CHECK (true);

-- Criar política para leitura apenas autenticada (opcional)
CREATE POLICY "Permitir leitura autenticada" ON captacao_medicos
    FOR SELECT
    USING (auth.role() = 'authenticated');
```

4. Vá em **Settings > API** e copie:
   - `Project URL` (SUPABASE_URL)
   - `anon public` key (SUPABASE_ANON_KEY)

### 2. Configurar o Projeto

1. Abra o arquivo `app.js`
2. Substitua as constantes no início do arquivo:

```javascript
const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_AQUI';
```

3. Atualize os links de CTA na função `renderThankYouScreen()`:
   - Número do WhatsApp (linha com `https://wa.me/`)
   - Link do Calendly (linha com `calendlyUrl`)

### 3. Adicionar Supabase Client

Adicione a biblioteca do Supabase antes do fechamento da tag `</body>` no `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script type="module" src="app.js"></script>
```

## 📦 Estrutura do Projeto

```
Formulario/
├── index.html          # Página principal
├── styles.css          # Estilos premium com animações
├── app.js              # Lógica do formulário e integração Supabase
└── README.md           # Este arquivo
```

## 🎨 Características

- ✨ Design premium com gradientes e animações
- 📱 Totalmente responsivo
- 🌙 Tema dark moderno
- 🔄 Formulário multi-etapas com indicador de progresso
- ✅ Validação em tempo real
- 💾 Integração com Supabase
- 🎯 Experiência de usuário otimizada
- ♿ Acessível (WCAG)

## 🚀 Como Usar

1. Abra o arquivo `index.html` em um navegador moderno
2. Ou use um servidor local:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   ```

## 📊 Dados Coletados

O formulário coleta as seguintes informações:

- **Pessoais**: Nome, especialidade, localização, contato
- **Negócio**: Composição e faturamento
- **Marketing**: Investimentos e desafios
- **Objetivos**: Prazos e disposição para investir
- **Insights**: Principal problema a resolver

## 🔒 Segurança

- RLS (Row Level Security) habilitado no Supabase
- Apenas inserções públicas permitidas
- Leitura restrita a usuários autenticados
- Validação de dados no frontend

## 🎯 Próximos Passos

Após configurar o formulário:

1. Teste o envio de dados
2. Verifique no Supabase se os dados estão sendo salvos
3. Configure notificações por email (opcional)
4. Integre com seu CRM (opcional)
5. Configure analytics (opcional)

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- [Documentação do Supabase](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
