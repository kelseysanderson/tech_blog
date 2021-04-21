const addPostFormHandler = async (event) => {
    event.preventDefault();
    console.log('hello')
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {  
      const response = await fetch('/api/users/addpost', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  

  document
    .querySelector('.newpost-form')
    .addEventListener('submit', addPostFormHandler);
