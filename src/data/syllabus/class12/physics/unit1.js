const unit1 = {
  id: "1",
  unit: 1,
  title: "Electric Charges and Fields",

  overview:
    "This unit introduces the basic concepts of electric charge, Coulomb’s law, electric field, and electric flux.",

  topics: [
    {
      id: "1.1",
      title: "Introduction to Electric Charge",
      content: `
Electric charge is a fundamental property of matter.
There are two types of charges:
• Positive charge
• Negative charge

Like charges repel each other, and unlike charges attract each other.
Charge is conserved in an isolated system.
      `,
    },

    {
      id: "1.2",
      title: "Coulomb’s Law",
      content: `
Coulomb’s law states that the force between two point charges is:
• Directly proportional to the product of the charges
• Inversely proportional to the square of the distance between them

F = k (q1 q2) / r²
      `,
    },

    {
      id: "1.3",
      title: "Electric Field",
      content: `
Electric field is the region around a charge where its influence can be felt.

Electric field intensity:
E = F / q
      `,
    },
  ],

  formulas: [
    "F = k q1 q2 / r²",
    "E = F / q",
    "q = ne",
  ],

  mcqs: [
    {
      question: "What is the SI unit of electric charge?",
      options: ["Ampere", "Volt", "Coulomb", "Ohm"],
      correctAnswer: "Coulomb",
    },
    {
      question: "Like charges always?",
      options: ["Attract", "Repel", "Neutralize", "Disappear"],
      correctAnswer: "Repel",
    },
  ],
};

export default unit1;
