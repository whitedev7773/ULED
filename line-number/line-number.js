const textareas = document.querySelectorAll('textarea');
const lineNumbers = document.querySelectorAll('.line-numbers');

textareas.forEach((ta) => {
  ta.addEventListener('keyup', event => {
    // 성능 최적화
    var trigger = ["Enter", "Backspace", "Control", "Delete"];
    if (trigger.includes(event.key)) {
      const numberOfLines = event.target.value.split('\n').length;
  
      if (ta.dataset.previousLines !== numberOfLines) {
        ta.parentElement.children[0].innerHTML = Array(numberOfLines).fill('<span></span>').join('');
        ta.dataset.previousLines = numberOfLines;
      }
    }

  });
});


textareas.forEach((ta) => {
  ta.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
  
      ta.value = ta.value.substring(0, start) + '    ' + ta.value.substring(end);
  
      event.preventDefault();
    }
  });
});
