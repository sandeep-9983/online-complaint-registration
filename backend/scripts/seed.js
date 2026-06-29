const apiBase = process.env.API_BASE || 'http://localhost:4000';

const samples = [
  {
    name: 'Amit Sharma',
    email: 'amit@example.com',
    category: 'Service quality',
    priority: 'Urgent',
    details: 'Water supply issue reported; no response from the operations team.'
  },
  {
    name: 'Neha Patil',
    email: 'neha@example.com',
    category: 'Billing issue',
    priority: 'Normal',
    details: 'Incorrect bill amount charged for last month.'
  }
];

const run = async () => {
  for (const item of samples) {
    try {
      const res = await fetch(`${apiBase}/api/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      const json = await res.json();
      console.log('Created:', json.reference || json._id || json.id);
    } catch (err) {
      console.error('Seed error:', err.message || err);
    }
  }
};

run();
