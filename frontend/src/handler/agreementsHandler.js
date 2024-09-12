const agreements = [];

let totalRevenue = 0;
let pendingPayment = 0;
let totalProjects = agreements.length;
let activeProjects = 0;

agreements.forEach(agreement => {
  totalRevenue += agreement.amount;
  if (agreement.status != "dispted") {
    pendingPayment += agreement.amount;
  }
});