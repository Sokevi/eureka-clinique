// src/modules/patients/services/patientService.js

const mockPatients = [
  { id: 1, name: "Sophie Martin", patientId: "PAT-2024-001", email: "sophie.m@email.com", phone: "+33 6 12 34 56 78", address: "12 rue de Paris, 75001 Paris", disease: "Hypertension", weight: 70, height: "170 cm", bmi: 24, bloodPressure: { systolic: 120, diastolic: 80 }, avatar: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Thomas Dubois", patientId: "PAT-2024-002", email: "thomas.d@email.com", phone: "+33 6 23 45 67 89", address: "8 avenue de Lyon, 69000 Lyon", disease: "Diabète Type 2", weight: 82, height: "175 cm", bmi: 26, bloodPressure: { systolic: 130, diastolic: 85 }, avatar: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Marie Lefebvre", patientId: "PAT-2024-003", email: "marie.l@email.com", phone: "+33 6 34 56 78 90", address: "5 rue du Vieux Port, 13000 Marseille", disease: "Asthme", weight: 60, height: "165 cm", bmi: 22, bloodPressure: { systolic: 110, diastolic: 70 }, avatar: "https://i.pravatar.cc/100?img=3" }
  // 🔥 ajoute les autres patients si besoin
];

const patientService = {
  getAll: async () => {
    return mockPatients;
  },

  getPatientById: async (id) => {
    return mockPatients.find((p) => p.id === parseInt(id)) || null;
  }
};

export default patientService;
