/* ==========================================
   AMABINI SOLUTIONS - AI ASSISTANT TERMINAL
   ========================================== */

let chatbotScopingData = {
  objective: '',
  complexity: '',
  timeline: ''
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(triggerWelcomeMessage, 800);
});

/* ==========================================
   WIDGET VISIBILITY CONTROLS
   ========================================== */
function toggleChatbot(forceState) {
  const container = document.getElementById('bot-container');
  const trigger = document.getElementById('bot-trigger');
  const iconOpen = document.getElementById('bot-icon-open');
  const iconClose = document.getElementById('bot-icon-close');

  const isOpen = container.classList.contains('open');
  const nextState = typeof forceState === 'boolean' ? forceState : !isOpen;

  if (nextState) {
    container.classList.add('open');
    trigger.classList.add('active');
    iconOpen.style.display = 'none';
    iconClose.style.display = 'block';
  } else {
    container.classList.remove('open');
    trigger.classList.remove('active');
    iconOpen.style.display = 'block';
    iconClose.style.display = 'none';
  }
}

/* ==========================================
   CONVERSATION DRIVER & FEED MANIPULATION
   ========================================== */
function appendMessage(sender, text, isCustomElement = false, element = null) {
  const feed = document.getElementById('bot-feed');
  
  const msgWrapper = document.createElement('div');
  msgWrapper.classList.add('bot-message', sender);
  
  if (isCustomElement && element) {
    msgWrapper.appendChild(element);
  } else {
    msgWrapper.textContent = text;
  }
  
  feed.appendChild(msgWrapper);
  feed.scrollTop = feed.scrollHeight;
}

function showTypingIndicator() {
  const feed = document.getElementById('bot-feed');
  const indicator = document.createElement('div');
  indicator.id = 'bot-typing';
  indicator.classList.add('bot-message', 'bot');
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('bot-typing-indicator');
  wrapper.innerHTML = `
    <div class="bot-typing-dot"></div>
    <div class="bot-typing-dot"></div>
    <div class="bot-typing-dot"></div>
  `;
  
  indicator.appendChild(wrapper);
  feed.appendChild(indicator);
  feed.scrollTop = feed.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('bot-typing');
  if (indicator) {
    indicator.remove();
  }
}

function renderOptions(optionsList) {
  const optionsTray = document.getElementById('bot-options');
  optionsTray.innerHTML = '';
  
  optionsList.forEach(opt => {
    const btn = document.createElement('button');
    btn.classList.add('bot-opt-btn');
    btn.textContent = opt.label;
    btn.onclick = () => {
      optionsTray.innerHTML = '';
      appendMessage('user', opt.label);
      setTimeout(() => opt.action(), 400);
    };
    optionsTray.appendChild(btn);
  });
}

/* ==========================================
   BOT DIALOGUE STATE MACHINE (SME DESIGNED)
   ========================================== */
function triggerWelcomeMessage() {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', 'SYS_INIT: Secure link active. I am the Amabini Solutions growth and scoping assistant (AMABINI_AI).');
    
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      appendMessage('bot', 'I help business owners calculate development base estimates, identify manual tasks that can be automated, and outline custom scaling roadmaps. How can I help you?');
      renderMainMenu();
    }, 600);
  }, 900);
}

function renderMainMenu() {
  renderOptions([
    { label: '[01] // BOOK A FREE 20-MIN CONSULTATION', action: bookFreeConsultation },
    { label: '[02] // ESTIMATE A NEW DIGITAL PROJECT', action: startProjectScoping },
    { label: '[03] // EXPLORE CAPABILITIES DIRECTORY', action: browseDisciplines }
  ]);
}

function bookFreeConsultation() {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', 'Excellent choice. We offer a 100% free, 20-minute video consultation to map your company\'s tech systems, audit search rankings, and design a custom scaling plan. No pressure, no obligations.');
    
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      appendMessage('bot', 'To claim your spot, please fill out the Intake Console on this page or send a quick email to operations@amabini.com. We will reply with a secure calendar link in under 12 hours.');
      
      renderOptions([
        { label: '[<-] // RETRIEVE MAIN MENU', action: () => {
          appendMessage('bot', 'Returning to main menu.');
          renderMainMenu();
        }},
        { label: '[02] // ESTIMATE A DIGITAL PROJECT', action: startProjectScoping }
      ]);
    }, 500);
  }, 600);
}

function browseDisciplines() {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', 'Amabini Solutions manages six core digital growth practices:\n\n1. WEB & E-COMMERCE: High-converting, responsive online stores.\n2. BUSINESS ANALYTICS: Automated, simple sales & inventory dashboards.\n3. PROCESS AUTOMATION: Linking invoice, CRM, and email tools to save hours.\n4. APPLIED AI: Practical support chat agents active 24/7.\n5. DIGITAL GROWTH & SEO: Systematic Google ranking for international lead generation.\n6. CUSTOM SOFTWARE: Secure customer portals and customized business databases.');
    
    renderOptions([
      { label: '[<-] // RETRIEVE MAIN DIRECTORY', action: () => {
        appendMessage('bot', 'Returning to main menu.');
        renderMainMenu();
      }},
      { label: '[01] // BOOK A FREE CONSULTATION', action: bookFreeConsultation }
    ]);
  }, 700);
}

/* ==========================================
   PROJECT SCOPING ENGINE & CALCULATIONS
   ========================================== */
function startProjectScoping() {
  chatbotScopingData = { objective: '', complexity: '', timeline: '' };
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', 'Project Scoping Initiated. STEP 01: What is the primary business goal of your digital asset?');
    
    renderOptions([
      { label: 'Build Web / E-Commerce Store', action: () => saveObjective('Web & E-Commerce Integration') },
      { label: 'Automate Manual Task Pipelines', action: () => saveObjective('Process & Workflow Automation') },
      { label: 'Understand Sales / Customer Data', action: () => saveObjective('Business Analytics Dashboards') },
      { label: 'Deploy Custom AI Client Support', action: () => saveObjective('Applied AI Customer Support') }
    ]);
  }, 400);
}

function saveObjective(obj) {
  chatbotScopingData.objective = obj;
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', `Target recorded: [${obj}]. STEP 02: What scale of operation corresponds to this project?`);
    
    renderOptions([
      { label: 'SME / Local Shop Pilot', action: () => saveComplexity('Local Business / SME Scale') },
      { label: 'Multi-Location / Integrated Ops', action: () => saveComplexity('Multi-Location Business') },
      { label: 'Global Brand / High Scale', action: () => saveComplexity('Global Enterprise Scaling') }
    ]);
  }, 400);
}

function saveComplexity(cpx) {
  chatbotScopingData.complexity = cpx;
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', `Operational scale: [${cpx}]. STEP 03: What is the target timeline for initial roll-out?`);
    
    renderOptions([
      { label: 'Extremely Rapid (< 4 Weeks)', action: () => compileEstimate('Under 4 Weeks') },
      { label: 'Standard Schedule (1 - 3 Months)', action: () => compileEstimate('1 to 3 Months') },
      { label: 'Flexible / Ongoing Optimization', action: () => compileEstimate('Flexible Schedule') }
    ]);
  }, 400);
}

function compileEstimate(timeline) {
  chatbotScopingData.timeline = timeline;
  
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', 'Scoping parameters locked. Computing development coefficients... matching server instances... calculating average hours saved.');
    
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      
      let hoursMin = 40, hoursMax = 60;
      let costMin = 3500, costMax = 5500;
      
      if (chatbotScopingData.objective.includes('AI')) {
        hoursMin += 40; hoursMax += 60; costMin += 4000; costMax += 6500;
      } else if (chatbotScopingData.objective.includes('Analytics')) {
        hoursMin += 20; hoursMax += 40; costMin += 2500; costMax += 4000;
      } else if (chatbotScopingData.objective.includes('Automation')) {
        hoursMin += 30; hoursMax += 50; costMin += 3000; costMax += 5000;
      }
      
      if (chatbotScopingData.complexity.includes('Multi-Location')) {
        hoursMin *= 2; hoursMax *= 2; costMin *= 1.8; costMax *= 1.8;
      } else if (chatbotScopingData.complexity.includes('Global')) {
        hoursMin *= 4; hoursMax *= 4.5; costMin *= 3.5; costMax *= 3.8;
      }
      
      hoursMin = Math.round(hoursMin);
      hoursMax = Math.round(hoursMax);
      costMin = Math.round(costMin / 100) * 100;
      costMax = Math.round(costMax / 100) * 100;
      
      const hash = '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
      
      const card = document.createElement('div');
      card.classList.add('estimate-card');
      card.innerHTML = `
        <div class="estimate-title">AMABINI PROJECT ESTIMATE</div>
        <div class="estimate-row">OBJECTIVE: <span>${chatbotScopingData.objective}</span></div>
        <div class="estimate-row">SCALE: <span>${chatbotScopingData.complexity}</span></div>
        <div class="estimate-row">TIMELINE: <span>${chatbotScopingData.timeline}</span></div>
        <div class="estimate-row">EST. CAPACITY: <span>${hoursMin}h - ${hoursMax}h</span></div>
        <div class="estimate-row" style="color: var(--accent-teal);">ROUTING CODE: <span>${hash}</span></div>
        <div class="estimate-total estimate-row">
          <span>BASE BUDGET:</span>
          <span>$${costMin.toLocaleString()} - $${costMax.toLocaleString()} USD</span>
        </div>
      `;
      
      appendMessage('bot', 'Dynamic Scoping parameters compiled successfully. Details below:', true, card);
      
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        appendMessage('bot', 'You qualify for a 100% Free 20-Minute Scoping Call! Download this estimate brief as a text summary, and attach it to your free consultation request to unlock custom scaling discounts.');
        
        renderOptions([
          { label: '📥 DOWNLOAD FREE SCOPING BRIEF (.TXT)', action: () => downloadScopingBrief(hoursMin, hoursMax, costMin, costMax, hash) },
          { label: '📅 CLAIM MY FREE CONSULTATION', action: bookFreeConsultation },
          { label: '[<-] // RETRIEVE MAIN MENU', action: renderMainMenu }
        ]);
      }, 500);
    }, 1200);
  }, 500);
}

/* ==========================================
   METADATA SCOPING BRIEF DOWNLOAD DAEMON
   ========================================== */
function downloadScopingBrief(hrsMin, hrsMax, budgetMin, budgetMax, secHash) {
  const briefText = `===================================================================
AMABINI SOLUTIONS // SYSTEM SCOPING BRIEF
===================================================================
DOC_REF: AMABINI-SME-SCOPING-${secHash.substring(2)}
DATE: ${new Date().toISOString()}
LOCALE: Manila, PH // International Digital Integration
DOMAIN: amabini.com
-------------------------------------------------------------------

BUSINESS SCOPING PROFILE:
- Business Objective:  ${chatbotScopingData.objective}
- Operational Scale:   ${chatbotScopingData.complexity}
- Target Timeline:     ${chatbotScopingData.timeline}

AMABINI ENGINEERING ESTIMATION ANALYSIS:
- Projected Cap:       ${hrsMin} - ${hrsMax} Hours
- Base Budget Scale:   $${budgetMin.toLocaleString()} - $${budgetMax.toLocaleString()} USD
- Integrity Hash:      ${secHash} (Validated)

SYSTEM CONTEXT:
"Software is optimized only when it remains a simple,
empowering assistant to your team and your customers."
-------------------------------------------------------------------
INSTRUCTIONS FOR FREE CONSULTATION:
1. Save this text file.
2. Email it directly to: operations@amabini.com or attach it in our 
   online intake console at amabini.solutions.

We will review your business parameters and provide an interactive 
20-minute digital scaling map tailored to your workflows & budget.
===================================================================`;

  const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `amabini_scoping_brief_${secHash.substring(2)}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  appendMessage('bot', 'Brief compiled. The text file scoping brief has downloaded to your local device.');
  
  setTimeout(() => {
    appendMessage('bot', 'Is there any other business operational flow I can help you streamline?');
    renderMainMenu();
  }, 600);
}
