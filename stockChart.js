async function fetchStockLevels() {
    try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT'); 
        const data = await response.json();
        
        updateChart(data);
        
        data.forEach(store => {
            if (store.stockLevel < 10) {
                alert(`Error: ${store.storeName} stock is below 10`);
            }
        });
    } catch (error) {
        console.error('Error fetching stock levels:', error);
    }
}

function updateChart(data) {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Store Stock Levels"
        },
        axisY: {
            title: "Stock Level"
        },
        data: [{        
            type: "column",  
            showInLegend: true, 
            legendMarkerColor: "grey",
            legendText: "Stores",
            dataPoints: data.map(store => ({ label: store.storeName, y: store.stockLevel }))
        }]
    });
    chart.render();
}

document.addEventListener('DOMContentLoaded', fetchStockLevels);
