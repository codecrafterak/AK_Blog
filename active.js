// Comments section integration
const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

function fetchComments() {
	fetch('http://localhost:4000/api/comments')
		.then(res => res.json())
		.then(comments => {
			commentsList.innerHTML = '';
			comments.forEach(c => {
				const div = document.createElement('div');
				div.className = 'comment-item';
				div.innerHTML = `<strong>${c.name}</strong> <span style="color:#b8860b;font-size:0.9em;">${new Date(c.date).toLocaleString()}</span><br>${c.comment}`;
				commentsList.appendChild(div);
			});
		});
}

if (commentForm) {
	commentForm.addEventListener('submit', function(e) {
		e.preventDefault();
		const name = document.getElementById('comment-name').value;
		const comment = document.getElementById('comment-text').value;
		fetch('http://localhost:4000/api/comments', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, comment })
		})
		.then(res => res.json())
		.then(data => {
			if (data.success) {
				commentForm.reset();
				fetchComments();
			} else {
				alert('Failed to post comment.');
			}
		});
	});
	fetchComments();
}
// Back to Top button functionality
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
	if (window.scrollY > 300) {
		backToTopBtn.style.display = 'block';
		backToTopBtn.style.opacity = '1';
	} else {
		backToTopBtn.style.opacity = '0';
		setTimeout(() => { backToTopBtn.style.display = 'none'; }, 400);
	}
});
backToTopBtn.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Blog card hover effect (for smooth transition)
document.querySelectorAll('.blog-card').forEach(card => {
	card.addEventListener('mouseenter', () => {
		card.style.boxShadow = '0 4px 24px rgba(255, 215, 0, 0.18)';
		card.style.transform = 'translateY(-4px) scale(1.03)';
		card.style.transition = 'box-shadow 0.3s, transform 0.3s';
	});
	card.addEventListener('mouseleave', () => {
		card.style.boxShadow = '0 2px 12px rgba(255, 215, 0, 0.10)';
		card.style.transform = 'none';
	});
});
