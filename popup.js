document.addEventListener('DOMContentLoaded', function() {
  // Load existing buttons
  loadButtons();
  
  // Add button event listener
  document.getElementById('addButton').addEventListener('click', function() {
    const buttonName = document.getElementById('buttonName').value.trim();
    const buttonText = document.getElementById('buttonText').value.trim();
    
    if (buttonName && buttonText) {
      addButton(buttonName, buttonText);
      document.getElementById('buttonName').value = '';
      document.getElementById('buttonText').value = '';
    } else {
      alert('Please enter both button name and text');
    }
  });
});

function loadButtons() {
  chrome.storage.sync.get('customButtons', function(data) {
    const buttonList = document.getElementById('buttonList');
    buttonList.innerHTML = '';
    
    const buttons = data.customButtons || [];
    
    if (buttons.length === 0) {
      buttonList.innerHTML = '<p>No custom buttons yet. Add one above!</p>';
      return;
    }
    
    buttons.forEach(function(button, index) {
      const buttonElement = document.createElement('div');
      buttonElement.className = 'custom-button';
      
      const buttonText = document.createElement('div');
      buttonText.className = 'button-text';
      buttonText.textContent = `${button.name}: "${button.text.substring(0, 30)}${button.text.length > 30 ? '...' : ''}"`;
      
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-btn';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        deleteButton(index);
      });
      
      buttonElement.appendChild(buttonText);
      buttonElement.appendChild(deleteButton);
      buttonList.appendChild(buttonElement);
    });
  });
}

function addButton(name, text) {
  chrome.storage.sync.get('customButtons', function(data) {
    const buttons = data.customButtons || [];
    buttons.push({ name, text });
    
    chrome.storage.sync.set({ customButtons: buttons }, function() {
      loadButtons();
    });
  });
}

function deleteButton(index) {
  chrome.storage.sync.get('customButtons', function(data) {
    const buttons = data.customButtons || [];
    buttons.splice(index, 1);
    
    chrome.storage.sync.set({ customButtons: buttons }, function() {
      loadButtons();
    });
  });
}