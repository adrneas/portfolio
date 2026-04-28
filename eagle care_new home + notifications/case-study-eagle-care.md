# Case Study: Redesign do Dashboard do Cidadão — Eagle Care

**Papel:** Senior Product Designer  
**Escopo:** UX Strategy, UI Design, Arquitetura de Informação, Design System.

---

## 1. Contexto e Desafio de Negócio
A plataforma municipal de saúde e cidadania enfrentava baixos índices de retenção. O comportamento do usuário era puramente reativo: abria-se o aplicativo para uma tarefa específica e encerrava-se a sessão imediatamente. Não havia um canal de comunicação eficiente entre o município e o cidadão.

### O Problema Identificado:
* **Subutilização de Espaço:** A tela inicial funcionava apenas como uma saudação, sem entregar valor imediato.
* **Carga Cognitiva Elevada:** Menus laterais com listas extensas (14 itens) dificultavam a localização de funcionalidades.
* **Falta de Engajamento:** Informações públicas importantes ficavam escondidas em submenus, resultando em baixa visibilidade de campanhas municipais.

---

## 2. Auditoria da Interface Legada (Análise de Fricção)

### Dashboard e Menu Anterior:
* **Dashboard:** Área central vazia; redundância entre navegação inferior e lateral; falta de hierarquia visual.
* **Menu Lateral:** Lista plana e não categorizada; excesso de itens sem separação lógica; ícones com baixo contraste.

---

## 3. Objetivos Estratégicos do Redesign
1. **Otimização de Utilitário:** Transformar o "Splash Screen" em um dashboard de resumo contextual.
2. **Aproximação Institucional:** Integrar uma funcionalidade de "Publicações" para aproximar a gestão municipal do cidadão.
3. **Eficiência de Navegação:** Reduzir o custo de interação através de uma arquitetura de informação categorizada.
4. **Prevenção de Erros:** Implementar estados vazios (Empty States) e mensagens de erro que orientem o usuário em vez de frustrá-lo.

---

## 4. Decisões de Design e Arquitetura

### De "Splash" para Dashboard Resumo
A tela inicial foi convertida em um **Summary Dashboard**. Em vez de forçar a navegação para encontrar dados básicos, trouxemos cartões dinâmicos (ex: "Próxima Consulta", "Lembrete de Medicação") para a superfície, eliminando cliques desnecessários.

### Integração do "Feed da Cidade"
A nova funcionalidade de publicações foi posicionada centralmente. Através de cartões visuais com hierarquia tipográfica clara, o município agora pode comunicar campanhas de vacinação ou obras públicas de forma proativa.

### Arquitetura de Menu em Grid
Substituímos a lista linear de 14 itens por um modelo de **Grid Modal**. 
* **Agrupamento Lógico:** Funções divididas entre "Ações de Saúde" e "Minhas Informações".
* **Ergonomia:** Botões de toque amplos facilitam o uso com uma mão e aceleram o reconhecimento visual.

---

## 5. Soluções de Interface Detalhadas

### Central de Notificações Acionáveis
As notificações deixaram de ser apenas informativas. Implementamos **Microinterações Integradas**: o usuário pode confirmar uma consulta ou registrar a ingestão de um medicamento diretamente na célula de notificação, sem trocar de contexto.

### Estratégia de Empty States e Erros
Projetamos ilustrações contextuais para momentos de ausência de dados ou erro 404.
* **Objetivo:** Manter o usuário orientado e reduzir a taxa de abandono causada por telas brancas ou jargões técnicos.

---

## 6. Medindo o Sucesso (KPIs Propostos)

Para validar a eficácia do novo design, propomos o monitoramento das seguintes métricas:

* **Tempo Médio de Sessão:** Aumento esperado devido ao consumo do Feed de Publicações.
* **Bounce Rate no Dashboard:** Redução esperada através da entrega de valor imediato via cartões contextuais.
* **CTR (Click-Through Rate):** Medição de engajamento nas publicações do município.
* **Eficiência de Tarefa (Time to Task):** Redução do tempo necessário para realizar agendamentos via novo menu em Grid.

---

## 7. Conclusão
O redesign do Eagle Care moveu o produto de uma ferramenta utilitária estática para um ecossistema dinâmico de cidadania. A solução prioriza o pragmatismo técnico e a eficiência do usuário, garantindo que a tecnologia sirva como uma ponte invisível e eficaz entre o governo e a população.
