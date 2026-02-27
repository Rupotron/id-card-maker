function generateID() {
    // Populate Data
    document.getElementById('displayName').innerText = document.getElementById('inName').value;
    document.getElementById('displayRole').innerText = document.getElementById('inRole').value;
    document.getElementById('displayID').innerText = document.getElementById('inID').value;

    // Generate QR Code containing Employee Name and ID
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text: "Emp: " + document.getElementById('inName').value + " ID: " + document.getElementById('inID').value,
        width: 130,
        height: 130
    });

    // Handle Photo Upload
    const photoInput = document.getElementById('inPhoto');
    const reader = new FileReader();
    
    reader.onload = function(e) {
        document.getElementById('displayPhoto').src = e.target.result;
        
        // Finalize PDF
        const element = document.getElementById('id-template');
        element.classList.remove('hidden-print');
        
        const opt = {
            margin: 0,
            filename: 'Astavinayak_ID_Card.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: 'px', format: [400, 600], orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            element.classList.add('hidden-print');
        });
    };

    if (photoInput.files[0]) {
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        alert("Please upload a photo first!");
    }
}