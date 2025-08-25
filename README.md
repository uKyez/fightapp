# Instagram Battle Arena

Um app web interativo que coleta seguidores reais do Instagram e simula batalhas épicas entre eles em uma arena visual.

## 🚀 Funcionalidades

### Autenticação Instagram
- Login seguro com conta real do Instagram
- Usa a Instagram Basic Display API oficial
- Tokens de longa duração para sessões persistentes

### Coleta de Seguidores
- Interface para inserir username do perfil alvo
- Coleta automática de seguidores (simulada devido a limitações da API)
- Suporte para grandes listas de seguidores
- Paginação eficiente para performance

### Arena de Batalha
- Grid visual com avatars e nomes dos seguidores
- Sistema de HP com barras animadas (100 HP inicial)
- Batalhas em tempo real com seleção aleatória
- Dano aleatório de 0-30 por ataque
- Eliminação automática quando HP ≤ 0

### Controles de Batalha
- Botão "Iniciar Batalha" para começar simulação
- Controle de velocidade: 1x, 2x, 4x, 6x
- Botão "Reset" para reiniciar com HP completo
- Estatísticas em tempo real (vivos/eliminados/total)

### Log de Batalha
- Registro em tempo real de todas as ações
- Histórico das últimas 50 ações
- Ícones diferenciados por tipo de ataque
- Timestamps para cada ação

### Efeitos Visuais
- Animações suaves para transições de HP
- Efeitos de partículas para o vencedor
- Gradientes vibrantes e design moderno
- Micro-interações e hover states
- Modal de celebração para o campeão

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Instagram Basic Display API
- **HTTP Client**: Axios

## 📋 Pré-requisitos

### Configuração da Instagram API

1. **Criar App no Facebook Developers**:
   - Acesse [Facebook Developers](https://developers.facebook.com/)
   - Crie um novo app
   - Adicione o produto "Instagram Basic Display"

2. **Configurar OAuth**:
   - Adicione redirect URI: `http://localhost:5173/auth/callback`
   - Para produção: `https://seudominio.com/auth/callback`

3. **Obter Credenciais**:
   - App ID
   - App Secret

## 🚀 Instalação

1. **Clone o repositório**:
```bash
git clone <repository-url>
cd instagram-battle-arena
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure as variáveis de ambiente**:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
VITE_INSTAGRAM_APP_ID=seu_app_id_aqui
VITE_INSTAGRAM_APP_SECRET=seu_app_secret_aqui
VITE_INSTAGRAM_REDIRECT_URI=http://localhost:5173/auth/callback
```

4. **Execute o projeto**:
```bash
npm run dev
```

## 🔧 Configuração para Produção

### Variáveis de Ambiente
```env
VITE_INSTAGRAM_APP_ID=seu_app_id_producao
VITE_INSTAGRAM_APP_SECRET=seu_app_secret_producao
VITE_INSTAGRAM_REDIRECT_URI=https://seudominio.com/auth/callback
```

### Build
```bash
npm run build
npm run preview
```

## ⚠️ Limitações da API

### Instagram Basic Display API
- **Não fornece acesso direto a seguidores** por questões de privacidade
- Limitado a dados do próprio usuário autenticado
- Para dados de seguidores reais, é necessário:
  - Instagram Graph API (apenas contas business)
  - Permissões avançadas aprovadas pelo Instagram
  - Conta business do perfil alvo

### Alternativas para Dados Reais
1. **Instagram Graph API**: Requer conta business e aprovação
2. **Coleta Manual**: Upload de CSV/JSON com lista de seguidores
3. **Integração com Ferramentas**: APIs de terceiros autorizadas

## 🎮 Como Usar

1. **Autenticação**:
   - Clique em "Connect Instagram Account"
   - Autorize o app no Instagram
   - Aguarde o redirecionamento

2. **Coleta de Seguidores**:
   - Digite o username do perfil alvo
   - Clique em "Collect Followers"
   - Aguarde a coleta (simulada)

3. **Batalha**:
   - Visualize todos os seguidores na arena
   - Ajuste a velocidade da batalha
   - Clique em "Start" para iniciar
   - Acompanhe o log em tempo real

4. **Vencedor**:
   - Celebre o campeão com efeitos visuais
   - Opção de jogar novamente ou fechar

## 🔒 Segurança e Privacidade

- Usa apenas APIs oficiais do Instagram
- Respeita termos de serviço da plataforma
- Tokens seguros com renovação automática
- Não armazena dados sensíveis
- Conformidade com LGPD/GDPR

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação da Instagram API
2. Confira as issues do repositório
3. Abra uma nova issue com detalhes do problema

---

**Nota**: Este projeto é para fins educacionais e demonstrativos. Sempre respeite os termos de serviço das plataformas utilizadas.