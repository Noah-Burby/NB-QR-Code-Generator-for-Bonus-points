(function(){
  const input = document.getElementById('url-input');
  const genBtn = document.getElementById('generate');
  const clearBtn = document.getElementById('clear');
  const qrcodeEl = document.getElementById('qrcode');
  const downloadLink = document.getElementById('download-link');

  let qr; // QRCode instance

  function createQRCode(text){
    // clear previous
    qrcodeEl.innerHTML = '';
    qr = new QRCode(qrcodeEl, {
      text: text,
      width: 256,
      height: 256,
      colorDark : '#000000',
      colorLight : '#ffffff',
      correctLevel : QRCode.CorrectLevel.H
    });

    // small timeout so rendering finishes
    setTimeout(()=>{
      prepareDownload();
    }, 50);
  }

  function prepareDownload(){
    // QRCode.js may render a canvas or an img. Prefer canvas for better quality.
    const canvas = qrcodeEl.querySelector('canvas');
    const img = qrcodeEl.querySelector('img');
    let dataUrl = '';
    if(canvas){
      dataUrl = canvas.toDataURL('image/png');
    } else if(img){
      dataUrl = img.src;
    }
    if(dataUrl){
      downloadLink.href = dataUrl;
      downloadLink.classList.remove('hidden');
      downloadLink.setAttribute('download', 'qrcode.png');
    }
  }

  genBtn.addEventListener('click', ()=>{
    const url = input.value.trim();
    if(!url){
      input.focus();
      return;
    }
    // ensure scheme exists
    const parsed = /^https?:\/\//i.test(url) ? url : 'https://' + url;
    createQRCode(parsed);
  });

  clearBtn.addEventListener('click', ()=>{
    input.value = '';
    qrcodeEl.innerHTML = '';
    downloadLink.href = '#';
    downloadLink.classList.add('hidden');
    input.focus();
  });

  // allow Enter to generate
  input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      genBtn.click();
    }
  });

})();