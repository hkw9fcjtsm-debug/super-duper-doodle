:root{
  --bg: #f5f5f5;
  --card: #ffffff;
  --text: #111111;
  --muted: #666666;
  --brand: #b71c1c; /* PLACEHOLDER COLOR */
  --brandText: #ffffff;
  --border: rgba(0,0,0,0.08);
}

*{ box-sizing:border-box; }
html,body{ height:100%; }

body{
  margin:0;
  font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display",system-ui,sans-serif;
  background:var(--bg);
  color:var(--text);
}

.app{ min-height:100%; }

.page{
  min-height:100vh;
  display:flex;
  flex-direction:column;
}

.hidden{ display:none; }

/* ===== HEADERS ===== */

.header{
  padding:16px;
}

.header.basic{
  background:#111;
  color:#fff;
}

.header.dash{
  background:var(--brand);
  color:var(--brandText);
  padding-bottom:18px;
}

.brandRow{
  display:flex;
  align-items:center;
  gap:10px;
}

.logoBox{
  width:44px;
  height:44px;
  border-radius:10px;
  background:#333;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:12px;
}

.brandText{
  font-weight:700;
}

.subText{
  margin-top:8px;
  color:#ddd;
  font-size:13px;
}

/* ===== TOP ROW ===== */

.topRow{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
}

.pill{
  background:rgba(255,255,255,0.2);
  border:1px solid rgba(255,255,255,0.25);
  color:#fff;
  padding:10px 12px;
  border-radius:999px;
  font-size:14px;
  flex:1;
}

.topActions{
  display:flex;
  align-items:center;
  gap:10px;
}

.icon{
  font-size:18px;
}

.linkBtn{
  background:transparent;
  border:0;
  color:#fff;
  font-size:14px;
  padding:8px 6px;
}

/* ===== TEXT ===== */

.greeting{
  margin:14px 0 0;
  font-size:34px;
  line-height:1.05;
  font-weight:800;
}

.content{
  padding:16px;
  display:flex;
  flex-direction:column;
  gap:12px;
}

/* ===== FORMS ===== */

.field{
  display:flex;
  flex-direction:column;
  gap:6px;
}

.label{
  font-size:13px;
  color:var(--muted);
}

input,select{
  width:100%;
  padding:12px;
  border-radius:12px;
  border:1px solid var(--border);
  background:#fff;
  font-size:16px;
  outline:none;
}

.accountsWrap{
  display:flex;
  flex-direction:column;
  gap:10px;
}

.accountBlock{
  background:#fff;
  border:1px solid var(--border);
  border-radius:14px;
  padding:12px;
  display:flex;
  flex-direction:column;
  gap:10px;
}

/* ===== BUTTONS ===== */

.buttonsRow{
  display:flex;
  gap:12px;
  margin-top:6px;
}

.btn{
  border:0;
  border-radius:12px;
  padding:12px 14px;
  font-size:16px;
}

.btn.primary{
  background:var(--brand);
  color:#fff;
  font-weight:700;
  flex:1;
}

.btn.secondary{
  background:#e9e9e9;
  color:#111;
  font-weight:700;
  flex:1;
}

.btn.full{
  width:100%;
}

.hint{
  margin:0;
  font-size:13px;
  color:var(--muted);
}

.msg{
  margin:0;
  font-size:13px;
  color:#b00020;
  min-height:18px;
}

/* ===== DASHBOARD ===== */

.cards{
  display:flex;
  flex-direction:column;
  gap:12px;
}

.card{
  background:var(--card);
  border:1px solid var(--border);
  border-radius:18px;
  padding:16px;
}

.cardTop{
  font-size:13px;
  font-weight:700;
  letter-spacing:.03em;
  text-transform:uppercase;
}

.balance{
  font-size:40px;
  font-weight:800;
  margin-top:10px;
}

.avail{
  margin-top:4px;
  color:var(--muted);
  font-size:14px;
}

.blank{
  height:320px;
}
