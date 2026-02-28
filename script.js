async function generateID() {
    const name = document.getElementById('inName').value;
    const role = document.getElementById('inRole').value;
    const idNum = document.getElementById('inID').value;
    const photoInput = document.getElementById('inPhoto');

    if (!name || !photoInput.files[0]) {
        alert("Please provide a name and photo.");
        return;
    }

    // 1. Update text content
    document.getElementById('displayName').innerText = name;
    document.getElementById('displayRole').innerText = role || "Designation";
    document.getElementById('displayID').innerText = idNum || "AGC-0000-00";

    // 2. Generate QR Code
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text: `ID:${idNum} | Name:${name}`,
        width: 120,
        height: 120
    });

    // 3. Process Photo and Download
    const reader = new FileReader();
    reader.onload = function(e) {
        const displayPhoto = document.getElementById('displayPhoto');
        displayPhoto.src = e.target.result;

        // Ensure image is loaded before PDF capture
        displayPhoto.onload = function() {
            const element = document.getElementById('id-template');
            element.classList.remove('hidden-print');

            const opt = {
                margin: 0,
                filename: `ID_Card_${name.replace(/\s+/g, '_')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 3, 
                    useCORS: true,
                    logging: false 
                },
                jsPDF: { unit: 'px', format: [400, 600], orientation: 'portrait' }
            };

            // Use the promise-based save to ensure completion
            html2pdf().set(opt).from(element).save().then(() => {
                element.classList.add('hidden-print');
            });
        };
    };
    reader.readAsDataURL(photoInput.files[0]);
}