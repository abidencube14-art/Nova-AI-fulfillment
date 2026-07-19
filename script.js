// ===============================
// Nova Fulfillment v1.0
// ===============================

// Dashboard statistics
let dashboard = {
    orders: 0,
    pending: 0,
    revenue: 0,
    profit: 0
};

// Sample orders (for testing)
let recentOrders = [
    {
        customer: "Waiting for Shopify...",
        product: "No orders yet",
        total: "$0.00",
        status: "Pending"
    }
];

// Update statistics on screen
function updateDashboard(){

    document.getElementById("orders").textContent = dashboard.orders;
    document.getElementById("pending").textContent = dashboard.pending;
    document.getElementById("revenue").textContent = "$" + dashboard.revenue.toFixed(2);
    document.getElementById("profit").textContent = "$" + dashboard.profit.toFixed(2);

}

// Show recent orders
function loadRecentOrders(){

    const container = document.getElementById("ordersList");

    container.innerHTML = "";

    recentOrders.forEach(order=>{

        container.innerHTML += `
            <div class="order-card">
                <h3>${order.customer}</h3>

                <p>${order.product}</p>

                <strong>${order.total}</strong>

                <div class="status">${order.status}</div>
            </div>
        `;

    });

}

// Start dashboard
document.addEventListener("DOMContentLoaded",()=>{

    updateDashboard();

    loadRecentOrders();

});
