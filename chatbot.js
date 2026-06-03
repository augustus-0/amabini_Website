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
    appendMessage('bot', 'SYS_INIT: Secure link active. I am AMABINI_AI v1.0.9, currently operating at 99.8% snark efficiency.');

    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      appendMessage('bot', 'I help business owners calculate how much time they waste on copy-pasting data, and estimate what it costs to automate their systems. What is your choice of action?');
      renderMainMenu();
    }, 600);
  }, 900);
}

function renderMainMenu() {
  renderOptions([
    { label: '[01] // BOOK A FREE SANITY CALL', action: bookFreeConsultation },
    { label: '[02] // ESTIMATE SPENT ON EXCEL MISERY', action: startProjectScoping },
    { label: '[03] // EXPLORE REPETITIVE LABOR REPLACEMENT', action: browseDisciplines }
  ]);
}

function bookFreeConsultation() {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', 'A wise choice. We offer a 100% free, 20-minute video audit where we outline exactly how to automate your administrative tasks and optimize search rankings. Warning: May cause spontaneous golf-playing.');

    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      appendMessage('bot', 'To secure your call, fill out the Intake Console on this page or send a quick email to operations@amabini.com. We reply in under 12 hours.');

      renderOptions([
        {
          label: '[<-] // RETRIEVE MAIN MENU', action: () => {
            appendMessage('bot', 'Returning to main menu.');
            renderMainMenu();
          }
        },
        { label: '[02] // ESTIMATE EXCEL MISERY BUDGET', action: startProjectScoping }
      ]);
    }, 500);
  }, 600);
}

function browseDisciplines() {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', 'We manage six key ways to pull you out of manual spreadsheet hell:\n\n1. WEB STORES: Responsive shops that do not look like 1999.\n2. BUSINESS ANALYTICS: Auto-updating sales charts (instead of crashy CSV files).\n3. PROCESS AUTOMATION: Syncing invoices & CRM so you do not copy-paste.\n4. APPLIED AI: Snarky customer support bots active 24/7.\n5. DIGITAL GROWTH: Technical SEO to steal search traffic from your rivals.\n6. CUSTOM PORTALS: Internal web tools to escape legacy software dread.');

    renderOptions([
      {
        label: '[<-] // RETRIEVE MAIN DIRECTORY', action: () => {
          appendMessage('bot', 'Returning to main menu.');
          renderMainMenu();
        }
      },
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
    appendMessage('bot', 'System Scoping Initialized. STEP 01: What bottleneck is currently draining your sanity?');

    renderOptions([
      { label: 'A website that doesn\'t look like it was built in 1999', action: () => saveObjective('Modern Web Store') },
      { label: 'Drowning in copy-paste manual file formatting hell', action: () => saveObjective('Workflow Automation') },
      { label: 'Excels that crash my computer when opened', action: () => saveObjective('Consolidated Dashboards') },
      { label: 'Sentient customer chatbots that don\'t hallucinate coupons', action: () => saveObjective('Practical AI Assistants') }
    ]);
  }, 400);
}

function saveObjective(obj) {
  chatbotScopingData.objective = obj;
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', `Bottleneck recorded: [${obj}]. STEP 02: What scale of legacy systems are we replacing?`);

    renderOptions([
      { label: 'One-person army (Solo Pilot)', action: () => saveComplexity('Solo SME Operations') },
      { label: 'Manager of managers (Multi-location friction)', action: () => saveComplexity('Multi-Location Operations') },
      { label: 'Stock photo enthusiasts (Global Enterprise scale)', action: () => saveComplexity('Enterprise Scale') }
    ]);
  }, 400);
}

function saveComplexity(cpx) {
  chatbotScopingData.complexity = cpx;
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', `Scale factor locked: [${cpx}]. STEP 03: When does this dread need to end?`);

    renderOptions([
      { label: 'Yesterday (Emergency speed)', action: () => compileEstimate('Immediate Emergency') },
      { label: 'Next month (Standard speed)', action: () => compileEstimate('Standard Phase') },
      { label: 'Whenever (We like Excel misery)', action: () => compileEstimate('Flexible Phase') }
    ]);
  }, 400);
}

function compileEstimate(timeline) {
  chatbotScopingData.timeline = timeline;

  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', 'Scoping parameters locked. Simulating spreadsheet deletions... calculating coffee consumption coefficients... routing gateways.');

    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();

      let hoursMin = 40, hoursMax = 60;
      let costMin = 3500, costMax = 5500;

      if (chatbotScopingData.objective.includes('AI')) {
        hoursMin += 40; hoursMax += 60; costMin += 4000; costMax += 6500;
      } else if (chatbotScopingData.objective.includes('Dashboards')) {
        hoursMin += 20; hoursMax += 40; costMin += 2500; costMax += 4000;
      } else if (chatbotScopingData.objective.includes('Automation')) {
        hoursMin += 30; hoursMax += 50; costMin += 3000; costMax += 5000;
      }

      if (chatbotScopingData.complexity.includes('Multi-Location')) {
        hoursMin *= 2; hoursMax *= 2; costMin *= 1.8; costMax *= 1.8;
      } else if (chatbotScopingData.complexity.includes('Enterprise')) {
        hoursMin *= 4; hoursMax *= 4.5; costMin *= 3.5; costMax *= 3.8;
      }

      hoursMin = Math.round(hoursMin);
      hoursMax = Math.round(hoursMax);
      costMin = Math.round(costMin / 100) * 100;
      costMax = Math.round(costMax / 100) * 100;

      const coffeeMin = Math.round(hoursMin * 1.5);
      const coffeeMax = Math.round(hoursMax * 2.2);

      const hash = '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();

      const card = document.createElement('div');
      card.classList.add('estimate-card');
      card.innerHTML = `
        <div class="estimate-title">AMABINI DYNAMIC SANITY AUDIT</div>
        <div class="estimate-row">BOTTLENECK: <span>${chatbotScopingData.objective}</span></div>
        <div class="estimate-row">SCALE: <span>${chatbotScopingData.complexity}</span></div>
        <div class="estimate-row">TIMELINE: <span>${chatbotScopingData.timeline}</span></div>
        <div class="estimate-row">EST. COFFEE CONSUMPTION: <span>${coffeeMin} - ${coffeeMax} Cups</span></div>
        <div class="estimate-row" style="color: var(--accent-teal);">ROUTING CODE: <span>${hash}</span></div>
        <div class="estimate-total estimate-row">
          <span>MISERY REDUCTION COST:</span>
          <span>$${costMin.toLocaleString()} - $${costMax.toLocaleString()} USD</span>
        </div>
      `;

      appendMessage('bot', 'Dynamic Sanity Scoping parameters compiled successfully. Details below:', true, card);

      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        appendMessage('bot', 'Outstanding! You qualify for a 100% Free 20-Minute Sanity Call. Download this Scoping Brief, attach it to your form request, and let\'s delete your manual work.');

        renderOptions([
          { label: '📥 DOWNLOAD FREE SCOPING BRIEF (.TXT)', action: () => downloadScopingBrief(hoursMin, hoursMax, costMin, costMax, hash, coffeeMin, coffeeMax) },
          { label: '📅 CLAIM MY FREE SANITY RESTORATION', action: bookFreeConsultation },
          { label: '[<-] // RETRIEVE MAIN MENU', action: renderMainMenu }
        ]);
      }, 500);
    }, 1200);
  }, 500);
}

/* ==========================================
   METADATA SCOPING BRIEF DOWNLOAD DAEMON
   ========================================== */
function downloadScopingBrief(hrsMin, hrsMax, budgetMin, budgetMax, secHash, coffeeMin, coffeeMax) {
  const briefText = `===================================================================
AMABINI SOLUTIONS // SYSTEM SANITY AUDIT SCOPING BRIEF
===================================================================
DOC_REF: AMABINI-SANITY-SCOPING-${secHash.substring(2)}
DATE: ${new Date().toISOString()}
LOCALE: Manila, PH // International Digital Integration
DOMAIN: amabini.com
-------------------------------------------------------------------

BUSINESS SCOPING PROFILE:
- Business Bottleneck:  ${chatbotScopingData.objective}
- Legacy System Scale:  ${chatbotScopingData.complexity}
- Desired Relief Phase: ${chatbotScopingData.timeline}

AMABINI ENGINEERING ESTIMATION ANALYSIS:
- Projected Cap:        ${hrsMin} - ${hrsMax} Hours of Spreadsheet Misery
- Coffee Fuel Required: ${coffeeMin} - ${coffeeMax} Cups (Estimated)
- Misery Reduction Fee: $${budgetMin.toLocaleString()} - $${budgetMax.toLocaleString()} USD
- Integrity Hash:       ${secHash} (Validated)

SYSTEM CONTEXT:
"Automated software is only optimal when it keeps manual
copy-paste duties as close to 0% as physically possible."
-------------------------------------------------------------------
INSTRUCTIONS FOR SANITY RESTORATION:
1. Save this text file.
2. Email it directly to: operations@amabini.com or attach it in our 
   online intake console at amabini.com

We will review your parameters and provide an interactive 
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
