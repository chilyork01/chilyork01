function generarQRCode() {
    const alumnoID = document.getElementById('alumnoID').value;
    if (alumnoID) {
        const qrcodeContainer = document.getElementById('qrcode-container');
        qrcodeContainer.innerHTML = ''; // Limpiar contenedor

        QRCode.toCanvas(document.createElement('canvas'), alumnoID, function (error, canvas) {
            if (error) {
                console.error(error);
                return;
            }
            qrcodeContainer.appendChild(canvas);

            // Añadir código QR a la lista de alumnos
            const alumnoList = document.getElementById('alumno-list');
            const listItem = document.createElement('li');
            listItem.textContent = `Alumno ID: ${alumnoID}`;
            listItem.appendChild(canvas);
            alumnoList.appendChild(listItem);
        });
    } else {
        alert('Por favor, introduce el ID del alumno.');
    }
}
