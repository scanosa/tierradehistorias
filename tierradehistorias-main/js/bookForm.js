
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-book-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = form.title.value;
        const author = form.autor.value;
        const description = form.description.value;

        try {
            const response = await fetch('http://localhost:3000/api/books/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, author, description }),
});


            if (!response.ok) {
                throw new Error('Error al crear el libro');
            }

            const data = await response.json();
            alert(data.message); // Muestra un mensaje de éxito o manejo de errores
            form.reset(); // Reinicia el formulario después de crear el libro
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al crear el libro');
        }
    });
});
