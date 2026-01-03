// ====== Storage rules ======
const STORAGE_KEY = "placeholder_app_save_v1";
const ONE_HOUR_MS = 60 * 60 * 1000;

const $ = (id) => document.getElementById(id);

function now() { return Date.now(); }

function saveState(state){
  const payload = { ...state, ts: now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadState(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return null;
  try{
    const data = JSON.parse(raw);
    if(!data.ts || now() - data.ts > ONE_HOUR_MS){
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  }catch{
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function clearState(){
  localStorage.removeItem(STORAGE_KEY);
}

// ====== Helpers ======
function msg(text){
  $("msg").textContent = text || "";
}

function formatMoney(cents){
  const dollars = (cents / 100);
  return dollars.toLocaleString(undefined, { style:"currency", currency:"USD" });
}

function parseDollarsToCents(input){
  const cleaned = String(input || "").trim().replace("$","");
  if(!cleaned) return null;

  // Accept "2", "2.4", "2.40", "0.89"
  if(!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;

  const parts = cleaned.split(".");
  const whole = parseInt(parts[0], 10);
  const frac = parts[1] ? parts[1].padEnd(2,"0") : "00";
  return (whole * 100) + parseInt(frac, 10);
}

function generateUniqueLast4(used){
  let n;
  do {
    n = Math.floor(1000 + Math.random() * 9000).toString();
  } while(used.has(n));
  used.add(n);
  return n;
}

// PLACEHOLDER account labels you can rename anytime
function displayTypeFromSelect(sel){
  return sel === "Checking" ? "Everyday Checking" : "Way2Save Savings";
}

// ====== UI builders ======
function buildAccountBlocks(count, existingAccounts=null){
  const wrap = $("accountsWrap");
  wrap.innerHTML = "";

  for(let i=0;i<count;i++){
    const block = document.createElement("div");
    block.className = "accountBlock";

    block.innerHTML = `
      <div class="label" style="font-weight:700;color:#333;">Account ${i+1}</div>

      <label class="field">
        <span class="label">Account type</span>
        <select class="type">
          <option>Checking</option>
          <option>Savings</option>
        </select>
      </label>

      <label class="field">
        <span class="label">Account number (last 4 or random)</span>
        <input class="last4" type="text" placeholder="1234 or random" autocomplete="off" />
      </label>

      <label class="field">
        <span class="label">Balance (dollars and cents)</span>
        <input class="balance" type="text" inputmode="decimal" placeholder="2.41" autocomplete="off" />
      </label>
    `;

    // restore existing values if provided
    if(existingAccounts && existingAccounts[i]){
      const a = existingAccounts[i];
      block.querySelector(".type").value = a.typeRaw;
      block.querySelector(".last4").value = a.lastFour;
      block.querySelector(".balance").value = (a.balanceCents/100).toFixed(2);
    }

    wrap.appendChild(block);
  }
}

function showInput(){
  $("pageInput").classList.remove("hidden");
  $("pageDash").classList.add("hidden");
}

function showDash(){
  $("pageInput").classList.add("hidden");
  $("pageDash").classList.remove("hidden");
}

function renderDashboard(name, accounts){
  $("greeting").textContent = `Good evening, ${name || "Name"}`;

  const cards = $("cards");
  cards.innerHTML = "";

  accounts.forEach((a) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="cardTop">${a.typeDisplay.toUpperCase()} …${a.lastFour}</div>
      <div class="balance">${formatMoney(a.balanceCents)}</div>
      <div class="avail">Available balance</div>
    `;
    cards.appendChild(card);
  });
}

// ====== App logic ======
function collectAccounts(count){
  const blocks = Array.from(document.querySelectorAll(".accountBlock"));
  const used = new Set();
  const accounts = [];

  for(let i=0;i<count;i++){
    const b = blocks[i];
    const typeRaw = b.querySelector(".type").value;
    const last4Raw = b.querySelector(".last4").value.trim();
    const balRaw = b.querySelector(".balance").value.trim();

    let lastFour = last4Raw.toLowerCase() === "random"
      ? generateUniqueLast4(used)
      : last4Raw;

    if(!/^\d{4}$/.test(lastFour)){
      return { error: `Account ${i+1}: last 4 must be 4 digits (or type random)` };
    }
    if(used.has(lastFour)){
      return { error: `Account ${i+1}: duplicate last 4` };
    }
    used.add(lastFour);

    const cents = parseDollarsToCents(balRaw);
    if(cents === null){
      return { error: `Account ${i+1}: balance must be like 2.41` };
    }

    accounts.push({
      typeRaw,
      typeDisplay: displayTypeFromSelect(typeRaw),
      lastFour,
      balanceCents: cents
    });
  }
  return { accounts };
}

// ====== Wire up ======
document.addEventListener("DOMContentLoaded", () => {
  const saved = loadState();

  const countSel = $("count");
  countSel.addEventListener("change", () => {
    const c = parseInt(countSel.value, 10);
    buildAccountBlocks(c);
  });

  // restore if saved (and not expired)
  if(saved){
    $("name").value = saved.name || "";
    $("count").value = String(saved.count || 1);
    buildAccountBlocks(saved.count || 1, saved.accounts || []);
  } else {
    buildAccountBlocks(1);
  }

  $("btnReset").addEventListener("click", () => {
    clearState();
    $("name").value = "";
    $("count").value = "1";
    buildAccountBlocks(1);
    msg("Reset complete.");
  });

  $("btnEnter").addEventListener("click", () => {
    msg("");

    const name = $("name").value.trim();
    if(!name){
      msg("Enter name.");
      return;
    }

    const count = parseInt($("count").value, 10);
    const result = collectAccounts(count);

    if(result.error){
      msg(result.error);
      return;
    }

    const state = { name, count, accounts: result.accounts };
    saveState(state);

    renderDashboard(name, result.accounts);
    showDash();
  });

  $("btnBack").addEventListener("click", () => {
    showInput();
  });

  $("btnSignOff").addEventListener("click", () => {
    showInput();
  });
});
