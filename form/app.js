// Supabase Configuration
const SUPABASE_URL = 'https://vehxdveuyxlwnoqqqdpo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlaHhkdmV1eXhsd25vcXFxZHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTk0MTIsImV4cCI6MjA4MDM3NTQxMn0.Zq3VKDjI5ClrYwD_2ydL-aMXKXutxKYXw9xTRCE5jec';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Form state
let currentStep = 0;
const formData = {
    // Step 1: Personal Info
    nome_completo: '',
    especialidade: '',
    especialidade_outra: '',
    cidade_estado: '',
    whatsapp: '',
    email: '',

    // Step 2: Business Info
    composicao_faturamento: '',
    faturamento_mensal: '',

    // Step 3: Marketing & Challenges
    investimento_marketing: '',
    maior_desafio: '',
    desafio_outro: '',
    equipe_whatsapp: '',

    // Step 4: Goals & Investment
    prazo_crescimento: '',
    disposicao_investir: '',
    problema_90_dias: ''
};

// DOM Elements
const app = document.getElementById('app');

// Initialize app
function init() {
    renderWelcomeScreen();
}

// Render Welcome Screen
function renderWelcomeScreen() {
    app.innerHTML = `
        <div class="container">
            <div class="card welcome-screen">
                <div class="welcome-icon">🏥</div>
                <h1 class="welcome-title">Transforme sua clínica em uma máquina previsível de pacientes particulares</h1>
                <p class="welcome-description">
                    Preencha os dados abaixo para receber um diagnóstico inicial do seu funil de pacientes 
                    e entender se sua clínica está pronta para crescer com previsibilidade.
                </p>
                <button class="btn btn-primary" onclick="startForm()">
                    Começar Diagnóstico
                </button>
            </div>
        </div>
    `;
}

// Start Form
function startForm() {
    currentStep = 0;
    renderFormStep();
}

// Render Form Step
function renderFormStep() {
    const steps = [
        renderStep1,
        renderStep2,
        renderStep3,
        renderStep4
    ];

    if (currentStep < steps.length) {
        steps[currentStep]();
    }
}

// Step 1: Personal Information
function renderStep1() {
    app.innerHTML = `
        <div class="container">
            <div class="card">
                <div class="form-header">
                    <div class="step-indicator">
                        <div class="step-dot active"></div>
                        <div class="step-dot"></div>
                        <div class="step-dot"></div>
                        <div class="step-dot"></div>
                    </div>
                    <h2 class="form-title">Informações Pessoais</h2>
                    <p class="form-subtitle">Vamos começar conhecendo você</p>
                </div>
                
                <div id="error-container"></div>
                
                <form id="step-form" onsubmit="handleStep1Submit(event)">
                    <div class="form-group">
                        <label class="form-label" for="nome_completo">Nome Completo *</label>
                        <input 
                            type="text" 
                            id="nome_completo" 
                            class="form-input" 
                            placeholder="Dr(a). Seu Nome Completo"
                            value="${formData.nome_completo}"
                            required
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Especialidade Médica *</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="especialidade" value="Cirurgia Vascular / Angiologia" ${formData.especialidade === 'Cirurgia Vascular / Angiologia' ? 'checked' : ''} onchange="handleEspecialidadeChange(event)">
                                <span class="radio-custom"></span>
                                <span class="radio-label">Cirurgia Vascular / Angiologia</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="especialidade" value="Cirurgia Plástica" ${formData.especialidade === 'Cirurgia Plástica' ? 'checked' : ''} onchange="handleEspecialidadeChange(event)">
                                <span class="radio-custom"></span>
                                <span class="radio-label">Cirurgia Plástica</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="especialidade" value="Dermatologia / Estética Avançada" ${formData.especialidade === 'Dermatologia / Estética Avançada' ? 'checked' : ''} onchange="handleEspecialidadeChange(event)">
                                <span class="radio-custom"></span>
                                <span class="radio-label">Dermatologia / Estética Avançada</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="especialidade" value="Ginecologia / Reprodução / Saúde da Mulher" ${formData.especialidade === 'Ginecologia / Reprodução / Saúde da Mulher' ? 'checked' : ''} onchange="handleEspecialidadeChange(event)">
                                <span class="radio-custom"></span>
                                <span class="radio-label">Ginecologia / Reprodução / Saúde da Mulher</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="especialidade" value="Nutrologia / Medicina Integrativa / Performance" ${formData.especialidade === 'Nutrologia / Medicina Integrativa / Performance' ? 'checked' : ''} onchange="handleEspecialidadeChange(event)">
                                <span class="radio-custom"></span>
                                <span class="radio-label">Nutrologia / Medicina Integrativa / Performance</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="especialidade" value="Outra" ${formData.especialidade === 'Outra' ? 'checked' : ''} onchange="handleEspecialidadeChange(event)">
                                <span class="radio-custom"></span>
                                <span class="radio-label">Outra (especifique)</span>
                            </label>
                        </div>
                        <div id="especialidade-outra" class="other-input ${formData.especialidade === 'Outra' ? 'visible' : ''}">
                            <input 
                                type="text" 
                                id="especialidade_outra" 
                                class="form-input" 
                                placeholder="Digite sua especialidade"
                                value="${formData.especialidade_outra}"
                            >
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="cidade_estado">Cidade / Estado de Atendimento Principal *</label>
                        <input 
                            type="text" 
                            id="cidade_estado" 
                            class="form-input" 
                            placeholder="Ex: São Paulo, SP"
                            value="${formData.cidade_estado}"
                            required
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="whatsapp">WhatsApp (com DDD) *</label>
                        <input 
                            type="tel" 
                            id="whatsapp" 
                            class="form-input" 
                            placeholder="(11) 99999-9999"
                            value="${formData.whatsapp}"
                            required
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="email">E-mail *</label>
                        <input 
                            type="email" 
                            id="email" 
                            class="form-input" 
                            placeholder="seu@email.com"
                            value="${formData.email}"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="instagram">Instagram Profissional</label>
                        <input 
                            type="text" 
                            id="instagram" 
                            class="form-input" 
                            placeholder="@seu.perfil"
                            value="${formData.instagram || ''}"
                        >
                    </div>
                    
                    <div class="button-group">
                        <button type="button" class="btn btn-secondary" onclick="renderWelcomeScreen()">Voltar</button>
                        <button type="submit" class="btn btn-primary">Próximo</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function handleEspecialidadeChange(event) {
    const outraInput = document.getElementById('especialidade-outra');
    if (event.target.value === 'Outra') {
        outraInput.classList.add('visible');
        document.getElementById('especialidade_outra').required = true;
    } else {
        outraInput.classList.remove('visible');
        document.getElementById('especialidade_outra').required = false;
    }
}

function handleStep1Submit(event) {
    event.preventDefault();

    formData.nome_completo = document.getElementById('nome_completo').value;
    formData.especialidade = document.querySelector('input[name="especialidade"]:checked')?.value || '';
    formData.especialidade_outra = document.getElementById('especialidade_outra').value;
    formData.cidade_estado = document.getElementById('cidade_estado').value;
    formData.whatsapp = document.getElementById('whatsapp').value;
    formData.email = document.getElementById('email').value;
    formData.instagram = document.getElementById('instagram').value;

    if (!formData.especialidade) {
        showError('Por favor, selecione uma especialidade');
        return;
    }

    if (formData.especialidade === 'Outra' && !formData.especialidade_outra) {
        showError('Por favor, especifique sua especialidade');
        return;
    }

    currentStep++;
    renderFormStep();
}

// Step 2: Business Information
function renderStep2() {
    app.innerHTML = `
        <div class="container">
            <div class="card">
                <div class="form-header">
                    <div class="step-indicator">
                        <div class="step-dot active"></div>
                        <div class="step-dot active"></div>
                        <div class="step-dot"></div>
                        <div class="step-dot"></div>
                    </div>
                    <h2 class="form-title">Informações do Negócio</h2>
                    <p class="form-subtitle">Entenda o momento atual da sua clínica</p>
                </div>
                
                <div id="error-container"></div>
                
                <form id="step-form" onsubmit="handleStep2Submit(event)">
                    <div class="form-group">
                        <label class="form-label">Como é a composição do seu faturamento hoje? *</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="composicao_faturamento" value="Maior parte em convênios / planos" ${formData.composicao_faturamento === 'Maior parte em convênios / planos' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Maior parte em convênios / planos</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="composicao_faturamento" value="Misto (convênios + particular)" ${formData.composicao_faturamento === 'Misto (convênios + particular)' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Misto (convênios + particular)</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="composicao_faturamento" value="Maior parte em particular / protocolos de alto valor" ${formData.composicao_faturamento === 'Maior parte em particular / protocolos de alto valor' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Maior parte em particular / protocolos de alto valor</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Qual é, aproximadamente, o seu faturamento mensal atual com pacientes particulares? *</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="faturamento_mensal" value="Até R$ 30.000/mês" ${formData.faturamento_mensal === 'Até R$ 30.000/mês' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Até R$ 30.000/mês</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="faturamento_mensal" value="Entre R$ 30.000 e R$ 80.000/mês" ${formData.faturamento_mensal === 'Entre R$ 30.000 e R$ 80.000/mês' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Entre R$ 30.000 e R$ 80.000/mês</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="faturamento_mensal" value="Entre R$ 80.000 e R$ 150.000/mês" ${formData.faturamento_mensal === 'Entre R$ 80.000 e R$ 150.000/mês' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Entre R$ 80.000 e R$ 150.000/mês</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="faturamento_mensal" value="Acima de R$ 150.000/mês" ${formData.faturamento_mensal === 'Acima de R$ 150.000/mês' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Acima de R$ 150.000/mês</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="faturamento_mensal" value="Prefiro não informar" ${formData.faturamento_mensal === 'Prefiro não informar' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Prefiro não informar</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="button-group">
                        <button type="button" class="btn btn-secondary" onclick="previousStep()">Voltar</button>
                        <button type="submit" class="btn btn-primary">Próximo</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function handleStep2Submit(event) {
    event.preventDefault();

    formData.composicao_faturamento = document.querySelector('input[name="composicao_faturamento"]:checked')?.value || '';
    formData.faturamento_mensal = document.querySelector('input[name="faturamento_mensal"]:checked')?.value || '';

    if (!formData.composicao_faturamento || !formData.faturamento_mensal) {
        showError('Por favor, responda todas as perguntas');
        return;
    }

    currentStep++;
    renderFormStep();
}

// Step 3: Marketing & Challenges
function renderStep3() {
    app.innerHTML = `
        <div class="container">
            <div class="card">
                <div class="form-header">
                    <div class="step-indicator">
                        <div class="step-dot active"></div>
                        <div class="step-dot active"></div>
                        <div class="step-dot active"></div>
                        <div class="step-dot"></div>
                    </div>
                    <h2 class="form-title">Marketing & Desafios</h2>
                    <p class="form-subtitle">Entenda seus investimentos e principais obstáculos</p>
                </div>
                
                <div id="error-container"></div>
                
                <form id="step-form" onsubmit="handleStep3Submit(event)">
                    <div class="form-group">
                        <label class="form-label">Quanto você investe hoje em marketing (anúncios + agência / equipe)? *</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="investimento_marketing" value="Não invisto nada ainda" ${formData.investimento_marketing === 'Não invisto nada ainda' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Não invisto nada ainda</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="investimento_marketing" value="Até R$ 3.000/mês" ${formData.investimento_marketing === 'Até R$ 3.000/mês' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Até R$ 3.000/mês</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="investimento_marketing" value="Entre R$ 3.000 e R$ 7.000/mês" ${formData.investimento_marketing === 'Entre R$ 3.000 e R$ 7.000/mês' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Entre R$ 3.000 e R$ 7.000/mês</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="investimento_marketing" value="Entre R$ 7.000 e R$ 15.000/mês" ${formData.investimento_marketing === 'Entre R$ 7.000 e R$ 15.000/mês' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Entre R$ 7.000 e R$ 15.000/mês</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="investimento_marketing" value="Acima de R$ 15.000/mês" ${formData.investimento_marketing === 'Acima de R$ 15.000/mês' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Acima de R$ 15.000/mês</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Qual o seu maior desafio hoje com sua clínica/consultório? *</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="maior_desafio" value="Agenda instável / poucos pacientes particulares" ${formData.maior_desafio === 'Agenda instável / poucos pacientes particulares' ? 'checked' : ''} onchange="handleDesafioChange(event)">
                                <span class="radio-custom"></span>
                                <span class="radio-label">Agenda instável / poucos pacientes particulares</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="maior_desafio" value="Dependência de convênios / indicação" ${formData.maior_desafio === 'Dependência de convênios / indicação' ? 'checked' : ''} onchange="handleDesafioChange(event)">
                                <span class="radio-custom"></span>
                                <span class="radio-label">Dependência de convênios / indicação</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="maior_desafio" value="Equipe / secretária não consegue converter os leads em agendamentos" ${formData.maior_desafio === 'Equipe / secretária não consegue converter os leads em agendamentos' ? 'checked' : ''} onchange="handleDesafioChange(event)">
                                <span class="radio-custom"></span>
                                <span class="radio-label">Equipe / secretária não consegue converter os leads em agendamentos</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="maior_desafio" value="Já invisto em marketing, mas não vejo retorno claro" ${formData.maior_desafio === 'Já invisto em marketing, mas não vejo retorno claro' ? 'checked' : ''} onchange="handleDesafioChange(event)">
                                <span class="radio-custom"></span>
                                <span class="radio-label">Já invisto em marketing, mas não vejo retorno claro</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="maior_desafio" value="Outro" ${formData.maior_desafio === 'Outro' ? 'checked' : ''} onchange="handleDesafioChange(event)">
                                <span class="radio-custom"></span>
                                <span class="radio-label">Outro (especifique)</span>
                            </label>
                        </div>
                        <div id="desafio-outro" class="other-input ${formData.maior_desafio === 'Outro' ? 'visible' : ''}">
                            <input 
                                type="text" 
                                id="desafio_outro" 
                                class="form-input" 
                                placeholder="Descreva seu desafio"
                                value="${formData.desafio_outro}"
                            >
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Hoje você conta com alguém dedicado ao WhatsApp / agendamentos? *</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="equipe_whatsapp" value="Sim, tenho uma secretária/concierge dedicada e treinável" ${formData.equipe_whatsapp === 'Sim, tenho uma secretária/concierge dedicada e treinável' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Sim, tenho uma secretária/concierge dedicada e treinável</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="equipe_whatsapp" value="Sim, mas está sobrecarregada e sem processo" ${formData.equipe_whatsapp === 'Sim, mas está sobrecarregada e sem processo' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Sim, mas está sobrecarregada e sem processo</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="equipe_whatsapp" value="Não, eu mesmo(a) faço tudo" ${formData.equipe_whatsapp === 'Não, eu mesmo(a) faço tudo' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Não, eu mesmo(a) faço tudo</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="equipe_whatsapp" value="Não, mas pretendo estruturar isso nos próximos 3 meses" ${formData.equipe_whatsapp === 'Não, mas pretendo estruturar isso nos próximos 3 meses' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Não, mas pretendo estruturar isso nos próximos 3 meses</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="button-group">
                        <button type="button" class="btn btn-secondary" onclick="previousStep()">Voltar</button>
                        <button type="submit" class="btn btn-primary">Próximo</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function handleDesafioChange(event) {
    const outroInput = document.getElementById('desafio-outro');
    if (event.target.value === 'Outro') {
        outroInput.classList.add('visible');
        document.getElementById('desafio_outro').required = true;
    } else {
        outroInput.classList.remove('visible');
        document.getElementById('desafio_outro').required = false;
    }
}

function handleStep3Submit(event) {
    event.preventDefault();

    formData.investimento_marketing = document.querySelector('input[name="investimento_marketing"]:checked')?.value || '';
    formData.maior_desafio = document.querySelector('input[name="maior_desafio"]:checked')?.value || '';
    formData.desafio_outro = document.getElementById('desafio_outro').value;
    formData.equipe_whatsapp = document.querySelector('input[name="equipe_whatsapp"]:checked')?.value || '';

    if (!formData.investimento_marketing || !formData.maior_desafio || !formData.equipe_whatsapp) {
        showError('Por favor, responda todas as perguntas');
        return;
    }

    if (formData.maior_desafio === 'Outro' && !formData.desafio_outro) {
        showError('Por favor, especifique seu desafio');
        return;
    }

    currentStep++;
    renderFormStep();
}

// Step 4: Goals & Investment
function renderStep4() {
    app.innerHTML = `
        <div class="container">
            <div class="card">
                <div class="form-header">
                    <div class="step-indicator">
                        <div class="step-dot active"></div>
                        <div class="step-dot active"></div>
                        <div class="step-dot active"></div>
                        <div class="step-dot active"></div>
                    </div>
                    <h2 class="form-title">Objetivos & Investimento</h2>
                    <p class="form-subtitle">Última etapa para seu diagnóstico personalizado</p>
                </div>
                
                <div id="error-container"></div>
                
                <form id="step-form" onsubmit="handleStep4Submit(event)">
                    <div class="form-group">
                        <label class="form-label">Em quanto tempo você gostaria de ver sua clínica em outro patamar de faturamento? *</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="prazo_crescimento" value="Já nos próximos 3 meses" ${formData.prazo_crescimento === 'Já nos próximos 3 meses' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Já nos próximos 3 meses</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="prazo_crescimento" value="Entre 3 e 6 meses" ${formData.prazo_crescimento === 'Entre 3 e 6 meses' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Entre 3 e 6 meses</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="prazo_crescimento" value="Em 6–12 meses, com um plano estruturado" ${formData.prazo_crescimento === 'Em 6–12 meses, com um plano estruturado' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Em 6–12 meses, com um plano estruturado</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="prazo_crescimento" value="Sem pressa, quero entender primeiro" ${formData.prazo_crescimento === 'Sem pressa, quero entender primeiro' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Sem pressa, quero entender primeiro</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Você está disposto(a) a investir pelo menos R$ 3.000/mês em marketing (além dos custos internos da clínica) para crescer de forma previsível? *</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="disposicao_investir" value="Sim, se fizer sentido para minha realidade e tiver um plano claro" ${formData.disposicao_investir === 'Sim, se fizer sentido para minha realidade e tiver um plano claro' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Sim, se fizer sentido para minha realidade e tiver um plano claro</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="disposicao_investir" value="Talvez, preciso entender melhor primeiro" ${formData.disposicao_investir === 'Talvez, preciso entender melhor primeiro' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Talvez, preciso entender melhor primeiro</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="disposicao_investir" value="Não, neste momento não consigo investir esse valor" ${formData.disposicao_investir === 'Não, neste momento não consigo investir esse valor' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-label">Não, neste momento não consigo investir esse valor</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="problema_90_dias">Se você pudesse resolver apenas um problema da sua clínica nos próximos 90 dias, qual seria? *</label>
                        <textarea 
                            id="problema_90_dias" 
                            class="form-textarea" 
                            placeholder="Descreva o principal problema que você gostaria de resolver..."
                            required
                        >${formData.problema_90_dias}</textarea>
                    </div>
                    
                    <div class="button-group">
                        <button type="button" class="btn btn-secondary" onclick="previousStep()">Voltar</button>
                        <button type="submit" class="btn btn-primary">Enviar Diagnóstico</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

async function handleStep4Submit(event) {
    event.preventDefault();

    formData.prazo_crescimento = document.querySelector('input[name="prazo_crescimento"]:checked')?.value || '';
    formData.disposicao_investir = document.querySelector('input[name="disposicao_investir"]:checked')?.value || '';
    formData.problema_90_dias = document.getElementById('problema_90_dias').value;

    if (!formData.prazo_crescimento || !formData.disposicao_investir || !formData.problema_90_dias) {
        showError('Por favor, responda todas as perguntas');
        return;
    }

    // Show loading
    showLoading();

    try {
        // Submit to Supabase
        await submitToSupabase();

        // Track Meta Pixel Event
        if (window.fbq) {
            const eventId = 'lead_' + Date.now();
            window.fbq('track', 'Lead', {
                value: 900.00,
                currency: 'BRL',
                event_id: eventId
            });
        }

        // Show thank you screen
        renderThankYouScreen();
    } catch (error) {
        console.error('Error submitting form:', error);
        hideLoading();
        // Small delay to ensure DOM is updated before showing error
        setTimeout(() => {
            showError('Ocorreu um erro ao enviar o formulário: ' + (error.message || 'Erro desconhecido'));
        }, 100);
    }
}

// Submit to Supabase
async function submitToSupabase() {
    const dataToSubmit = {
        nome_completo: formData.nome_completo,
        especialidade: formData.especialidade === 'Outra' ? formData.especialidade_outra : formData.especialidade,
        cidade_estado: formData.cidade_estado,
        whatsapp: formData.whatsapp,
        email: formData.email,
        instagram: formData.instagram,
        composicao_faturamento: formData.composicao_faturamento,
        faturamento_mensal: formData.faturamento_mensal,
        investimento_marketing: formData.investimento_marketing,
        maior_desafio: formData.maior_desafio === 'Outro' ? formData.desafio_outro : formData.maior_desafio,
        equipe_whatsapp: formData.equipe_whatsapp,
        prazo_crescimento: formData.prazo_crescimento,
        disposicao_investir: formData.disposicao_investir,
        problema_90_dias: formData.problema_90_dias,
        created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
        .from('captacao_medicos')
        .insert([dataToSubmit]);

    if (error) throw error;

    return data;
}

// Render Thank You Screen
function renderThankYouScreen() {
    const whatsappMessage = encodeURIComponent(`Olá! Acabei de preencher o formulário de diagnóstico. Meu nome é ${formData.nome_completo}.`);
    const whatsappUrl = `https://wa.me/557592385103?text=${encodeURIComponent('Olá vim através do formulário e quero mais informações sobre a Agência Med10x')}`;
    const calendlyUrl = 'https://calendly.com/agenda-leandro/1'; // Substitua pelo link do Calendly

    app.innerHTML = `
        <div class="container">
            <div class="card thank-you-screen">
                <div class="success-icon">✅</div>
                <h1 class="thank-you-title">Obrigado, doutor(a)! ✅</h1>
                <p class="thank-you-text">
                    Recebemos suas informações. Nossa equipe vai analisar o estágio da sua clínica e,
                    em breve, entraremos em contato para apresentar um diagnóstico do seu funil de pacientes
                    e, se fizer sentido, um plano de crescimento previsível focado em pacientes particulares.
                </p>

                <div class="cta-buttons">
                    <a href="${whatsappUrl}" target="_blank" class="btn btn-cta btn-whatsapp">
                        <span>💬</span>
                        Falar agora no WhatsApp
                    </a>
                    <a href="${calendlyUrl}" target="_blank" class="btn btn-cta btn-calendar">
                        <span>📅</span>
                        Agendar meu diagnóstico
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Helper Functions
function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        renderFormStep();
    }
}

function showError(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = `< div class="error-message visible" > ${message}</div > `;

    setTimeout(() => {
        const errorMsg = errorContainer.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.classList.remove('visible');
        }
    }, 5000);
}

function showLoading() {
    app.innerHTML = `
        < div class="container" >
            <div class="card">
                <div class="loading active">
                    <div class="spinner"></div>
                    <p>Enviando seu diagnóstico...</p>
                </div>
            </div>
        </div >
        `;
}

function hideLoading() {
    currentStep--;
    renderFormStep();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Expose functions to window scope for inline HTML event handlers
window.startForm = startForm;
window.renderWelcomeScreen = renderWelcomeScreen;
window.handleStep1Submit = handleStep1Submit;
window.handleStep2Submit = handleStep2Submit;
window.handleStep3Submit = handleStep3Submit;
window.handleStep4Submit = handleStep4Submit;
window.handleEspecialidadeChange = handleEspecialidadeChange;
window.handleDesafioChange = handleDesafioChange;
window.previousStep = previousStep;
