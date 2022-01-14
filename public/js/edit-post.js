async function editPostFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const post_text = document.querySelector('#post-text').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

    if (title && post_text) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, title, post_text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert('Failed to edit post!');
        }
    }

}

document.querySelector('.editpost-form').addEventListener('submit', editPostFormHandler);