const DATA_TEST = [
    {
        "date": "2021-04-06",
        "total_clicks": "1"
    },
    {
        "date": "2021-06-10",
        "total_clicks": "1"
    },
    {
        "date": "2021-08-12",
        "total_clicks": "1"
    },
    {
        "date": "2021-12-10",
        "total_clicks": "3"
    }
]

function dataToArrayExcel(data = undefined) {
    // Recibe un array de Objetos y retorna un array de arrays [[columns],[values],[values]...]
    if (Array.isArray(data)) {
        let columns = [Object.keys(data[0])],
            dataColumns = [...columns];
        Object.keys(data).forEach(register => {
            dataColumns.push(...[Object.values(data[register])]);
        });
        return dataColumns;
    } else {
        console.error('Data NO es Array');
    }

}


function exportoExcel(data = undefined) {
    // Comprobamos que sea un array de array [[]...]
    if (Array.isArray(data) && Array.isArray(data[0])) {
        const { COLUMNS, DATA } = data;
        // Crear un nuevo libro de Excel
        let workBook = XLSX.utils.book_new();
        // Crear una hoja de cálculo
        let newSheet = XLSX.utils.aoa_to_sheet(data);
        // Agregar la hoja al libro
        XLSX.utils.book_append_sheet(workBook, newSheet, "Reporte");
        // Guardar el archivo
        XLSX.writeFile(workBook, "Reporte.xlsx");
    } else {
        console.error('Error en estructura de datos. Debe ser { COLUMNS:[], DATA: [] }');
    }
}


const $BTN_DOWNLOAD = document.getElementById('btnDownload');
$BTN_DOWNLOAD.addEventListener('click', () => {
    const RE_FORMAT_DATA = dataToArrayExcel(DATA_TEST);
    exportoExcel(RE_FORMAT_DATA);
});