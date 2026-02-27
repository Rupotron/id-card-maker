const canvas = document.getElementById('idCanvas');
const ctx = canvas.getContext('2d');

function generateCard() {
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const imageInput = document.getElementById('imageInput');

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Header Bar
    ctx.fillStyle = "#1a73e8";
    ctx.fillRect(0, 0, canvas.width, 60);

    // Text Styling
    ctx.fillStyle = "#000";
    ctx.font = "bold 20px Arial";
    ctx.fillText(name.toUpperCase(), 150, 120);
    
    ctx.font = "16px Arial";
    ctx.fillStyle = "#555";
    ctx.fillText(role, 150, 150);

    // Image Upload Handling
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                ctx.drawImage(img, 20, 80, 100, 100);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(imageInput.files[0]);
    }
}

function downloadCard() {
    const link = document.createElement('a');
    link.download = 'id-card.png';
    link.href = canvas.toDataURL();
    link.click();
}