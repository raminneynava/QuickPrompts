function insertCustomButtons(buttons) {
    const existing = document.getElementById('custom-button-container');
    if (existing) existing.remove(); // حذف قبلی اگه باشه
  
    const footerActions = document.querySelector('div[data-testid="composer-footer-actions"]');
    if (!footerActions) return;
  
    const container = document.createElement('div');
    container.id = 'custom-button-container';
    container.style.display = 'flex';
    container.style.gap = '8px';
    container.style.marginLeft = '10px';  // فاصله از دکمه‌های اصلی
  
    buttons.forEach(btn => {
      const b = document.createElement('button');
      b.textContent = btn.name;
      b.title = btn.text;
      b.type = 'button';
      b.style.padding = '5px 10px';
      b.style.borderRadius = '8px';
      b.style.border = '1px solid #ccc';
      b.style.cursor = 'pointer';
      b.style.backgroundColor = '#f3f3f3';
      b.style.fontSize = '14px';
  
      b.addEventListener('click', (e) => {
        e.preventDefault();
  
        const editor = document.querySelector('.ProseMirror');
        if (editor) {
          const currentHTML = editor.innerHTML.trim();
          const newLine = `<p>${btn.text}</p>`;
          const updatedHTML = newLine + currentHTML;
  
          editor.innerHTML = updatedHTML;
  
          editor.dispatchEvent(new Event('input', { bubbles: true }));
          editor.focus();
  
          setTimeout(() => {
            const enterEvent = new KeyboardEvent('keydown', {
              bubbles: true,
              cancelable: true,
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
            });
            editor.dispatchEvent(enterEvent);
          }, 50);
        }
      });
  
      container.appendChild(b);
    });
  
    footerActions.appendChild(container);
  }
  
  // فراخوانی تابع مشابه کد قبلی شما
  function loadAndInsertButtons() {
    chrome.storage.sync.get('customButtons', data => {
      const buttons = data.customButtons || [];
      insertCustomButtons(buttons);
    });
  }
  
  const interval = setInterval(() => {
    const footerActions = document.querySelector('div[data-testid="composer-footer-actions"]');
    if (footerActions) {
      clearInterval(interval);
      loadAndInsertButtons();
    }
  }, 1000);
  