const chemistryUnits = import.meta.glob(
  "./syllabus/class12/chemistry/unit*.js"
);

export const unitLoader = {
  "12": {
    chemistry: (unitNumber) => {
      const path = `./syllabus/class12/chemistry/unit${unitNumber}.js`;
      return chemistryUnits[path]();
    },
  },
};
