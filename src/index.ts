import '../global.scss'
const Chart = require('../node_modules/chart.js/dist/chart');
const ANGLE = 180;
const CHART_POINT = 180 + 1;
Chart.defaults.font.size = 12;
Chart.defaults.font.weight = 'lighter';

function Theta(degree: number): number {
    return (degree * Math.PI / 180);
}

function createAlphaData(harmonic: number): number[] {
    const alpha_k: number[] = new Array(CHART_POINT);
    if (harmonic === 0) {
        for (let i = 0; i < CHART_POINT; i += 1) {
            alpha_k[i] = ((Math.sin(Theta(i)) - Theta(i) * Math.cos(Theta(i))) / (Math.PI * (1 - Math.cos(Theta(i)))));
            if (isNaN(alpha_k[i])) {
                alpha_k[i] = 0;
            }
        }
    }

    if (harmonic === 1) {
        for (let i = 0; i < CHART_POINT; i += 1) {
            alpha_k[i] = (Theta(i) - Math.sin(Theta(i)) * Math.cos(Theta(i))) / (Math.PI * (1 - Math.cos(Theta(i))));
            if (isNaN(alpha_k[i])) {
                alpha_k[i] = 0;
            }
        }
    }

    if (harmonic > 1) {
        for (let i = 0; i < CHART_POINT; i += 1) {
            alpha_k[i] = 2 * ((Math.sin(harmonic * Theta(i)) * Math.cos(Theta(i)) - harmonic * Math.cos(harmonic * Theta(i)) * Math.sin(Theta(i))) / (harmonic * Math.PI * (harmonic ** 2 - 1) * (1 - Math.cos(Theta(i)))));
            if (isNaN(alpha_k[i])) {
                alpha_k[i] = 0;
            }
        }
    }
    return alpha_k;
}

const labels = [];
for (let i = 0; i < CHART_POINT; ++i) {
    labels.push(`${i.toString()}°`);
}

const tableStyle = function (
    alphaNumber: number,
    borderColor: string,
    borderWidth: number,
    pointRadius: number,
    pointHoverRadius: number,
    tension: number,
) {
    let label = '';
    if (alphaNumber === 0) {
        label = 'α₀';
    } else if (alphaNumber === 1) {
        label = 'α₁';
    } else if (alphaNumber === 2) {
        label = 'α₂';
    } else if (alphaNumber === 3) {
        label = 'α₃';
    } else if (alphaNumber === 4) {
        label = 'α₄';
    } else if (alphaNumber === 5) {
        label = 'α₅';
    }

    return {
        label: `${label}`,
        data: createAlphaData(alphaNumber),
        borderColor: `${borderColor}`,
        backgroundColor: `${borderColor}`,
        borderWidth: borderWidth,
        pointRadius: pointRadius,
        pointHoverRadius: pointHoverRadius,
        pointStyle: 'rectRot',
        tension: tension,

    }
}
const data = {
    labels: labels,
    datasets: [
        tableStyle(0, '#000000', 1, 0, 10, 0.4),
        tableStyle(1, '#34568B', 1, 0, 10, 0.4),
        tableStyle(2, '#FF6F61', 1, 0, 10, 0.4),
        tableStyle(3, '#009B77', 1, 0, 10, 0.4),
        tableStyle(4, '#EFC050', 1, 0, 10, 0.4),
        tableStyle(5, '#92A8D1', 1, 0, 10, 0.4),
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: false,
        plugins: {
            title: {
                display: true,
                text: 'Berger Coefficient'
            },
            legend: {
                labels: {
                    font: {
                        size: 25
                    }
                }
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Θ',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'α (Θ)'
                },
                suggestedMin: 0,
                suggestedMax: 0.6
            }
        }
    },
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);