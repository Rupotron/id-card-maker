async function generateID() {
    const name = document.getElementById('inName').value;
    const idNum = document.getElementById('inID').value;
    const photoInput = document.getElementById('inPhoto');

    if (!name || !idNum || !photoInput.files[0]) {
        alert("Please fill in all fields and upload a photo.");
        return;
    }

    // 1. Update Text
    document.getElementById('displayName').innerText = name;
    document.getElementById('displayRole').innerText = document.getElementById('inRole').value;
    document.getElementById('displayID').innerText = idNum;

    // 2. Generate QR Code
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text: `Employee: ${name} | ID: ${idNum}`,
        width: 130,
        height: 130,
        correctLevel: QRCode.CorrectLevel.H
    });

    // 3. Handle Photo and Trigger PDF
    const reader = new FileReader();
    reader.onload = function(e) {
        const photoImg = document.getElementById('displayPhoto');
        photoImg.src = e.target.result;

        // Wait for photo to load visually before capturing
        photoImg.onload = function() {
            const element = document.getElementById('id-template');
            element.classList.remove('hidden-print');

            const opt = {
                margin: 0,
                filename: `ID_Card_${name.replace(/\s+/g, '_')}.pdf`,
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { 
                    scale: 3, 
                    useCORS: true, // Crucial for loading images/logos
                    logging: true 
                },
                jsPDF: { unit: 'px', format: [400, 600], orientation: 'portrait' }
            };

            // Generate the PDF
            html2pdf().set(opt).from(element).save()
                .then(() => {
                    element.classList.add('hidden-print');
                    console.log("Download successful");
                })
                .catch(err => {
                    console.error("PDF Error:", err);
                    alert("Failed to generate PDF. Check console for details.");
                });
        };
    };
    reader.readAsDataURL(photoInput.files[0]);
}