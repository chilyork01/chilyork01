const registros = [];

function registrarEntrada(codigo) {
    const horaEntrada = new Date().toLocaleTimeString();
    registros.push({ codigo, horaEntrada, horaSalida: '' });
    actualizarTabla();
}

function registrarSalida(codigo) {
    const horaSalida = new Date().toLocaleTimeString();
    const registro = registros.find(r => r.codigo === codigo && r.horaSalida === '');
    if (registro) {
        registro.horaSalida = horaSalida;
        actualizarTabla();
    } else {
        alert('No se encontró una entrada sin salida para este código.');
    }
}

function actualizarTabla() {
    const tbody = document.getElementById('registroTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    registros.forEach(registro => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = registro.codigo;
        row.insertCell(1).textContent = registro.horaEntrada;
        row.insertCell(2).textContent = registro.horaSalida;
    });
}

function procesarCodigo(codigo) {
    const registro = registros.find(r => r.codigo === codigo);
    if (!registro || registro.horaSalida) {
        registrarEntrada(codigo);
    } else {
        registrarSalida(codigo);
    }
}

function onScanSuccess(decodedText, decodedResult) {
    document.getElementById('status').textContent = `Código escaneado: ${decodedText}`;
    procesarCodigo(decodedText);
}

function onScanError(errorMessage) {
    console.error(`Error de escaneo: ${errorMessage}`);
}

const html5QrCode = new Html5Qrcode("reader");
html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    onScanSuccess,
    onScanError
).catch(err => {
    console.error(`Error al iniciar el escáner: ${err}`);
});
