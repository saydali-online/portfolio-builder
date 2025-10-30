const API = 'https://portfolio-builder-2-6499.onrender.com';
const $ = (id) => document.getElementById(id);

$('registerBtn').onclick = async () => {
  const r = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: $('regEmail').value,
      password: $('regPass').value,
      fullName: $('regName').value
    })
  });
  if(r.ok){ alert('Registered & logged in'); showBuilder(); } else alert('Register failed');
};

$('loginBtn').onclick = async () => {
  const r = await fetch(`${API}/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
    body: JSON.stringify({ email: $('logEmail').value, password: $('logPass').value })
  });
  if(r.ok){ alert('Logged in'); showBuilder(); } else alert('Login failed');
};

async function showBuilder(){
  $('auth').classList.add('hidden');
  $('builder').classList.remove('hidden');
  // Try load existing
  const r = await fetch(`${API}/portfolio/mine`, { credentials: 'include' });
  if(r.ok){ const d = await r.json(); if(d){
    $('handle').value = d.handle || '';
    $('accountType').value = d.accountType || 'FREE';
    $('fullName').value = d.fullName || '';
    $('email').value = d.email || '';
    $('specialization').value = d.specialization || '';
    $('bio').value = d.bio || '';
    $('visibility').value = d.visibility || 'PUBLIC';
    updateViewBtn();
  }}
}

$('handle').oninput = updateViewBtn;
function updateViewBtn(){
  const h = $('handle').value || 'your-handle';
  $('viewBtn').href = `./profile.html?handle=${encodeURIComponent(h)}`;
}

$('saveBtn').onclick = async () => {
  const payload = {
    handle: $('handle').value.trim(),
    accountType: $('accountType').value,
    fullName: $('fullName').value,
    email: $('email').value,
    specialization: $('specialization').value,
    bio: $('bio').value,
    visibility: $('visibility').value
  };
  const r = await fetch(`${API}/portfolio/mine`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
    body: JSON.stringify(payload)
  });
  if(r.ok){ alert('Saved'); updateViewBtn(); } else { const e = await r.json(); alert(e.error || 'Save failed'); }
};
