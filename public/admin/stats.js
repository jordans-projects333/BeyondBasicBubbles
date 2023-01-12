

// Chart.defaults.global.defaultFontFamily
let fontSize = 16
console.log(window.innerWidth)
if(window.innerWidth < 875){
    fontSize = 9
}

// Chart.defaults.global.defaultFontSize
Chart.defaults.font.size = fontSize;


let overallGraph = new Chart(document.querySelector('#overall__graph'), {
    type: 'line', //bar, horizontalBar, pie, line, doughnut, radar, polar area
    data: {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        datasets: [{
            label: 'Views',
            data: [1,2,6,3,8,2,1,2,6,3,8,2,1,2,6,3,8,2,1,2,6,3,8,2,1,2,6,3,8,2,1,2,6,3,8,2,1,2,6,3,8,2,1,2,6,3,8,2,1,2,6,3,8,2,1,2,6,3,2,2],
            // backgroundColor: []
        },
        {
            label: 'Created accounts',
            data: [2,5,5,5,5,5,5,5,5,5,3,2,1],
            // backgroundColor: []
        },
        {
            label: 'Purchases',
            data: [1,1,2,3,4,5,6,7,8,9,10,10,10,9,9,9,9,9,11,15,12,12,12,15,16,18,17,18],
            // backgroundColor: []
        }]
    },
    options: {
        elements: {
            point: {
                radius: 0,
                // pointStyle: 'rectRot'
            },
            line: {
                borderWidth: 1
            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                align: 'center',
                display: true,
                labels: {
                    padding: 32,
                    usePointStyle: true,
                    pointStyle: 'rect',
                    pointStyleWidth: 5,
                    boxHeight: 5,
                }
            }
         },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                },
                // min: 0,
                // max: 100,
                // ticks: {
                //     stepSize: 50
                // },
            },
            y: {
                min: 0,
                grid: {
                    display: false,
                }
            }
          }
    }
})

// let productsGraph = new Chart(document.querySelector('#products__graph'), {
//     type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polar area
//     data: {
//         labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
//         datasets: [{
//             label: 'View',
//             data: [21,28,23,29,35,33,27,22,23,24,21,28,20,34,32,28,27,25,28,29,0,0,44,21],
//             // backgroundColor: []
//         },
//         {
//             label: 'Purchase',
//             data: [12,15,19,14,15,12,16,17,17,18,17,12,11,12,14,15,18,11,19,12,0,16,17,0,17],
//             // backgroundColor: []
//         },
//         {
//             label: 'Repeated Purchase',
//             data: [1,4,2,7,4,9,6,4,7,3,8,3,2,7,3,6,8,5,3,6,2,8,2,6,0,0,0,5,2],
//             // backgroundColor: []
//         }]
//     },
//     options: {
//         elements: {
//             point: {
//                 radius: 0,
//                 // pointStyle: 'rectRot'
//             },
//             line: {
//                 borderWidth: 1
//             }
//         },
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 align: 'center',
//                 display: true,
//                 labels: {
//                     padding: 32,
//                     usePointStyle: true,
//                     pointStyle: 'rect',
//                     pointStyleWidth: 5,
//                     boxHeight: 5,
//                 }
//             }
//          },
//         scales: {
//             x: {
//                 stacked: true,
//                 grid: {
//                     display: false
//                 },
//                 // min: 0,
//                 // max: 100,
//                 ticks: {
//                     display: false
//                 },
//             },
//             y: {
//                 min: 0,
//                 grid: {
//                     display: false,
//                 }
//             }
//           }
//     }
// })