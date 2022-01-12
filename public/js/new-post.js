async function newPostFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const post_text = document.querySelector('#post-text').value.trim();

    if (title && text) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, post_text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to post!');
        }
    }

}

document.querySelector('.post-form').addEventListener('submit', newPostFormHandler);