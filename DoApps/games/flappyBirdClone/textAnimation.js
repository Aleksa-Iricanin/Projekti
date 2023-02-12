const observerOdd = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const oddDiv = entry.target.querySelector('.oddRow');

    if (entry.isIntersecting) {
      oddDiv.classList.add('oddRowAnimation');
	  return; 
    }
    oddDiv.classList.remove('oddRowAnimation');

  });
});

const observerEven = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const evenDiv = entry.target.querySelector('.evenRow');

    if (entry.isIntersecting) {
      evenDiv.classList.add('evenRowAnimation');
	  return; 
    }
    evenDiv.classList.remove('evenRowAnimation');
  });
});


observerOdd.observe(document.querySelector('#firstRow'));
observerOdd.observe(document.querySelector('#thirdRow'));

observerEven.observe(document.querySelector('#secondRow'));