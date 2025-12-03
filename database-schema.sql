-- ============================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS
-- Formulário de Captação de Médicos
-- ============================================

-- Criar tabela para armazenar os dados do formulário
CREATE TABLE IF NOT EXISTS captacao_medicos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Informações Pessoais
    nome_completo TEXT NOT NULL,
    especialidade TEXT NOT NULL,
    cidade_estado TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    email TEXT NOT NULL,
    instagram TEXT,
    
    -- Informações do Negócio
    composicao_faturamento TEXT NOT NULL,
    faturamento_mensal TEXT NOT NULL,
    
    -- Marketing & Desafios
    investimento_marketing TEXT NOT NULL,
    maior_desafio TEXT NOT NULL,
    equipe_whatsapp TEXT NOT NULL,
    
    -- Objetivos & Investimento
    prazo_crescimento TEXT NOT NULL,
    disposicao_investir TEXT NOT NULL,
    problema_90_dias TEXT NOT NULL,
    
    -- Metadados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- ÍNDICES PARA MELHOR PERFORMANCE
-- ============================================

-- Índice para busca por email
CREATE INDEX IF NOT EXISTS idx_captacao_medicos_email ON captacao_medicos(email);

-- Índice para busca por data de criação
CREATE INDEX IF NOT EXISTS idx_captacao_medicos_created_at ON captacao_medicos(created_at DESC);

-- Índice para busca por especialidade
CREATE INDEX IF NOT EXISTS idx_captacao_medicos_especialidade ON captacao_medicos(especialidade);

-- ============================================
-- SEGURANÇA: ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS na tabela
ALTER TABLE captacao_medicos ENABLE ROW LEVEL SECURITY;

-- Política: Permitir inserções públicas (para o formulário)
CREATE POLICY "Permitir inserções públicas" ON captacao_medicos
    FOR INSERT
    WITH CHECK (true);

-- Política: Permitir leitura apenas para usuários autenticados
CREATE POLICY "Permitir leitura autenticada" ON captacao_medicos
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Política: Permitir atualização apenas para usuários autenticados
CREATE POLICY "Permitir atualização autenticada" ON captacao_medicos
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Política: Permitir exclusão apenas para usuários autenticados
CREATE POLICY "Permitir exclusão autenticada" ON captacao_medicos
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- ============================================
-- FUNÇÃO PARA ATUALIZAR updated_at AUTOMATICAMENTE
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_captacao_medicos_updated_at
    BEFORE UPDATE ON captacao_medicos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS ÚTEIS PARA ANÁLISE
-- ============================================

-- View: Resumo por especialidade
CREATE OR REPLACE VIEW vw_resumo_por_especialidade AS
SELECT 
    especialidade,
    COUNT(*) as total_leads,
    COUNT(CASE WHEN disposicao_investir = 'Sim, se fizer sentido para minha realidade e tiver um plano claro' THEN 1 END) as leads_qualificados,
    AVG(CASE 
        WHEN faturamento_mensal = 'Até R$ 30.000/mês' THEN 1
        WHEN faturamento_mensal = 'Entre R$ 30.000 e R$ 80.000/mês' THEN 2
        WHEN faturamento_mensal = 'Entre R$ 80.000 e R$ 150.000/mês' THEN 3
        WHEN faturamento_mensal = 'Acima de R$ 150.000/mês' THEN 4
        ELSE 0
    END) as nivel_faturamento_medio
FROM captacao_medicos
GROUP BY especialidade
ORDER BY total_leads DESC;

-- View: Leads por investimento em marketing
CREATE OR REPLACE VIEW vw_leads_por_investimento AS
SELECT 
    investimento_marketing,
    COUNT(*) as total_leads,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentual
FROM captacao_medicos
GROUP BY investimento_marketing
ORDER BY total_leads DESC;

-- View: Leads recentes (últimos 30 dias)
CREATE OR REPLACE VIEW vw_leads_recentes AS
SELECT 
    id,
    nome_completo,
    especialidade,
    email,
    whatsapp,
    disposicao_investir,
    created_at
FROM captacao_medicos
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- ============================================
-- COMENTÁRIOS NA TABELA
-- ============================================

COMMENT ON TABLE captacao_medicos IS 'Armazena os dados dos médicos captados através do formulário de diagnóstico';
COMMENT ON COLUMN captacao_medicos.id IS 'Identificador único do registro';
COMMENT ON COLUMN captacao_medicos.nome_completo IS 'Nome completo do médico';
COMMENT ON COLUMN captacao_medicos.especialidade IS 'Especialidade médica do profissional';
COMMENT ON COLUMN captacao_medicos.cidade_estado IS 'Cidade e estado onde atende';
COMMENT ON COLUMN captacao_medicos.whatsapp IS 'Número de WhatsApp com DDD';
COMMENT ON COLUMN captacao_medicos.email IS 'Endereço de email';
COMMENT ON COLUMN captacao_medicos.composicao_faturamento IS 'Como é composto o faturamento (convênios/particular)';
COMMENT ON COLUMN captacao_medicos.faturamento_mensal IS 'Faixa de faturamento mensal com particulares';
COMMENT ON COLUMN captacao_medicos.investimento_marketing IS 'Quanto investe atualmente em marketing';
COMMENT ON COLUMN captacao_medicos.maior_desafio IS 'Principal desafio da clínica/consultório';
COMMENT ON COLUMN captacao_medicos.equipe_whatsapp IS 'Situação da equipe de atendimento';
COMMENT ON COLUMN captacao_medicos.prazo_crescimento IS 'Prazo desejado para crescimento';
COMMENT ON COLUMN captacao_medicos.disposicao_investir IS 'Disposição para investir em marketing';
COMMENT ON COLUMN captacao_medicos.problema_90_dias IS 'Principal problema a resolver em 90 dias';
COMMENT ON COLUMN captacao_medicos.created_at IS 'Data e hora de criação do registro';
COMMENT ON COLUMN captacao_medicos.updated_at IS 'Data e hora da última atualização';

-- ============================================
-- MENSAGEM DE SUCESSO
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Banco de dados configurado com sucesso!';
    RAISE NOTICE '📊 Tabela captacao_medicos criada';
    RAISE NOTICE '🔒 Políticas de segurança aplicadas';
    RAISE NOTICE '📈 Views de análise criadas';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 Próximos passos:';
    RAISE NOTICE '1. Copie a URL do projeto e a chave anônima';
    RAISE NOTICE '2. Atualize as constantes no arquivo app.js';
    RAISE NOTICE '3. Configure os links de WhatsApp e Calendly';
    RAISE NOTICE '4. Teste o formulário!';
END $$;
