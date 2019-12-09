const log = console.log;
// parsing data

async function getData() {
    const ylabel = [];
    const xlabel = [];

    const response = await fetch("GLB.Ts+dSSt.csv");
    const table = await response.text();
    const datatable = table.split('\n').slice(2);
    datatable.forEach(elt => {
        const rows = elt.split(",");
        const year = rows[0];
        xlabel.push(year);
        const temp = rows[1];
        ylabel.push(temp);

    });
    return { ylabel, xlabel }
};

//graphing with chart.js

async function init() {
    const { ylabel, xlabel } = await getData();
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabel,
            datasets: [{
                fill: false,
                label: 'average temperature',
                data: ylabel,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,

            }, ]
        },
        options: {
            chart: {
                backgroundColor: "gray"
            },
            title: {
                display: true,
                text: 'Average temperature',
                position: "top",
                fontSize: 20,
            },
            legend: {
                position: "right",
                labels: {
                    fontColor: "black"
                }
            },
            scales: {


                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return value + '°';
                        }


                    },
                }]
            },
        }

    });

};

init();

{}