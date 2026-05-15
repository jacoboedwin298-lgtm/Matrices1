// ===== CONVERTIR A FRACCIONES =====

function gcd(a, b){
    return b ? gcd(b, a % b) : a;
}

function toFraction(decimal){

    if(Number.isInteger(decimal)){
        return decimal.toString();
    }

    let sign = decimal < 0 ? -1 : 1;

    decimal = Math.abs(decimal);

    let denominator = 1000;

    let numerator = Math.round(decimal * denominator);

    let divisor = gcd(numerator, denominator);

    numerator /= divisor;
    denominator /= divisor;

    numerator *= sign;

    return `${numerator}/${denominator}`;
}

// ===== CREAR INPUTS =====

const matrixContainer = document.getElementById("matrixInputs");

for(let i = 0; i < 12; i++){

    const input = document.createElement("input");

    input.type = "number";

    matrixContainer.appendChild(input);
}

// ===== OBTENER MATRIZ =====

function getMatrix(){

    const inputs = document.querySelectorAll(".matrix input");

    let values = [];

    inputs.forEach(input => {

        values.push(parseFloat(input.value) || 0);

    });

    return [

        [values[0], values[1], values[2], values[3]],

        [values[4], values[5], values[6], values[7]],

        [values[8], values[9], values[10], values[11]]

    ];
}

// ===== MOSTRAR MATRIZ =====

function displayStep(title, matrix){

    const steps = document.getElementById("steps");

    let html = `
    
    <div class="step">

        <h2>${title}</h2>

        <div class="matrix-display">

            <table>
    `;

    matrix.forEach(row => {

        html += "<tr>";

        row.forEach(value => {

            html += `<td>${toFraction(value)}</td>`;

        });

        html += "</tr>";

    });

    html += `
            </table>

        </div>

    </div>
    `;

    steps.innerHTML += html;
}

// ===== RESOLVER MATRIZ =====

function solveMatrix(){

    const steps = document.getElementById("steps");

    steps.innerHTML = "";

    let m = getMatrix();

    displayStep("Matriz Inicial", m);

    // ===== R1 =====

    let pivot = m[0][0];

    if(pivot !== 0){

        for(let j = 0; j < 4; j++){

            m[0][j] = m[0][j] / pivot;

        }

        displayStep("R1 = R1 / pivote", m);
    }

    // ===== ELIMINAR DEBAJO DE R1 =====

    for(let i = 1; i < 3; i++){

        let factor = m[i][0];

        for(let j = 0; j < 4; j++){

            m[i][j] = m[i][j] - factor * m[0][j];

        }
    }

    displayStep("Eliminar columna 1", m);

    // ===== R2 =====

    pivot = m[1][1];

    if(pivot !== 0){

        for(let j = 0; j < 4; j++){

            m[1][j] = m[1][j] / pivot;

        }

        displayStep("R2 = R2 / pivote", m);
    }

    // ===== ELIMINAR ARRIBA Y ABAJO DE R2 =====

    for(let i = 0; i < 3; i++){

        if(i !== 1){

            let factor = m[i][1];

            for(let j = 0; j < 4; j++){

                m[i][j] = m[i][j] - factor * m[1][j];

            }
        }
    }

    displayStep("Eliminar columna 2", m);

    // ===== R3 =====

    pivot = m[2][2];

    if(pivot !== 0){

        for(let j = 0; j < 4; j++){

            m[2][j] = m[2][j] / pivot;

        }

        displayStep("R3 = R3 / pivote", m);
    }

    // ===== ELIMINAR ARRIBA DE R3 =====

    for(let i = 0; i < 2; i++){

        let factor = m[i][2];

        for(let j = 0; j < 4; j++){

            m[i][j] = m[i][j] - factor * m[2][j];

        }
    }

    displayStep("Matriz Reducida Final", m);

    // ===== RESULTADOS =====

    const a = m[0][3];
    const b = m[1][3];
    const c = m[2][3];

    steps.innerHTML += `
    
    <div class="result">

        a = ${toFraction(a)} <br>
        b = ${toFraction(b)} <br>
        c = ${toFraction(c)}

    </div>
    `;
}

// ===== LIMPIAR =====

function clearMatrix(){

    document.querySelectorAll(".matrix input").forEach(input => {

        input.value = "";

    });

    document.getElementById("steps").innerHTML = "";
}