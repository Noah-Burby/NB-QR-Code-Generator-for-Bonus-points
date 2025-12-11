// script.js - simple QR generation and self-test using Qrious
const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const testBtn = document.getElementById('testBtn');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');
const errorDiv = document.getElementById('error');
const testStatusDiv = document.getElementById('testStatus');
const canvas = document.getElementById('qr');

let qr; // QRious instance

function setError(msg){
  errorDiv.textContent = msg || '';
  errorDiv.className = msg ? 'error' : '';
}

function validateURL(input){
  if(!input) return false;
  try{
    // allow URLs without scheme by coalescing to https
    let u = input.trim();
    if(!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(u)){
      u = 'https://' + u;
    }
    const parsed = new URL(u);
    return parsed.href;
  }catch(e){
    return false;
  }
}

function generate(url){
  const valid = validateURL(url);
  if(!valid){
    setError('Please enter a valid URL.');
    downloadBtn.disabled = true;
    testStatusDiv.textContent = '';
    return false;
  }
  setError('');
  // create or update QRious
  qr = new QRious({
    element: canvas,
    value: valid,
    size: 256,
    level: 'H'
  });
  // enable download
  downloadBtn.disabled = false;
  testStatusDiv.textContent = '';
  return true;
}

function downloadPNG(){
  if(!qr) return;
  const dataURL = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'qr.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function clearAll(){
  urlInput.value = '';
  setError('');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  downloadBtn.disabled = true;
  testStatusDiv.textContent = '';
}

// Self-test: try to generate QR for provided testUrl, retry up to maxAttempts
async function selfTest(testUrl, maxAttempts = 5, delayMs = 300){
  testStatusDiv.textContent = 'Self-test: starting...';
  for(let attempt=1; attempt<=maxAttempts; attempt++){
    const ok = generate(testUrl);
    await new Promise(r => setTimeout(r, delayMs));
    // basic check: canvas has non-empty data URL
    const dataURL = canvas.toDataURL && canvas.toDataURL('image/png');
    if(ok && dataURL && dataURL.length > 2000){
      testStatusDiv.textContent = `Self-test: OK (attempt ${attempt})`;
      testStatusDiv.className = 'test-status ok';
      return true;
    }else{
      testStatusDiv.textContent = `Self-test: attempt ${attempt} failed, retrying...`;
      testStatusDiv.className = 'test-status fail';
    }
  }
  testStatusDiv.textContent = 'Self-test: failed after retries';
  testStatusDiv.className = 'test-status fail';
  return false;
}

// wiring
generateBtn.addEventListener('click', ()=> generate(urlInput.value.trim()));
testBtn.addEventListener('click', ()=> {
  const rick = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  urlInput.value = rick;
  selfTest(rick, 5, 250);
});
downloadBtn.addEventListener('click', downloadPNG);
clearBtn.addEventListener('click', clearAll);

// auto-run a silent self-test on load using the provided URL
window.addEventListener('load', ()=>{
  const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  // run but show process to user
  selfTest(testUrl, 5, 250);
});
