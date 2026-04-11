window.PricingData = {
  labourRates: {
    manufacturePerHour: 40,
    installPerHour: 40,
    travelPerHour: 40
  },

  windowCosts: [
    { type: "Residential", glazing: "SG", configuration: "SHTF", manufactureHours: 16.0, installHours: 3.5, componentCost: 200.0, key: "Residential|SG|SHTF" },
    { type: "Residential", glazing: "SG", configuration: "SHBF", manufactureHours: 16.0, installHours: 3.5, componentCost: 200.0, key: "Residential|SG|SHBF" },
    { type: "Residential", glazing: "SG", configuration: "SHBF-B", manufactureHours: 16.0, installHours: 3.5, componentCost: 200.0, key: "Residential|SG|SHBF-B" },
    { type: "Residential", glazing: "SG", configuration: "DH", manufactureHours: 16.0, installHours: 2.5, componentCost: 200.0, key: "Residential|SG|DH" },
    { type: "Residential", glazing: "SG", configuration: "SHBF-M", manufactureHours: 28.0, installHours: 5.5, componentCost: 2000.0, key: "Residential|SG|SHBF-M" },
    { type: "Residential", glazing: "SG", configuration: "SHTF-M", manufactureHours: 28.0, installHours: 5.5, componentCost: 2000.0, key: "Residential|SG|SHTF-M" },
    { type: "Residential", glazing: "SG", configuration: "DH-M", manufactureHours: 28.0, installHours: 5.5, componentCost: 2000.0, key: "Residential|SG|DH-M" },
    { type: "Residential", glazing: "SG", configuration: "SHBF-B-M", manufactureHours: 28.0, installHours: 4.5, componentCost: 2000.0, key: "Residential|SG|SHBF-B-M" },

    { type: "Commercial", glazing: "SG", configuration: "SHTF", manufactureHours: 32.0, installHours: 7.0, componentCost: 200.0, key: "Commercial|SG|SHTF" },
    { type: "Commercial", glazing: "SG", configuration: "SHBF", manufactureHours: 32.0, installHours: 7.0, componentCost: 200.0, key: "Commercial|SG|SHBF" },
    { type: "Commercial", glazing: "SG", configuration: "SHBF-B", manufactureHours: 32.0, installHours: 7.0, componentCost: 200.0, key: "Commercial|SG|SHBF-B" },
    { type: "Commercial", glazing: "SG", configuration: "DH", manufactureHours: 32.0, installHours: 7.0, componentCost: 200.0, key: "Commercial|SG|DH" },
    { type: "Commercial", glazing: "SG", configuration: "SHBF-M", manufactureHours: 44.0, installHours: 9.0, componentCost: 2000.0, key: "Commercial|SG|SHBF-M" },
    { type: "Commercial", glazing: "SG", configuration: "SHTF-M", manufactureHours: 44.0, installHours: 9.0, componentCost: 2000.0, key: "Commercial|SG|SHTF-M" },
    { type: "Commercial", glazing: "SG", configuration: "DH-M", manufactureHours: 44.0, installHours: 9.0, componentCost: 2000.0, key: "Commercial|SG|DH-M" },
    { type: "Commercial", glazing: "SG", configuration: "SHBF-B-M", manufactureHours: 44.0, installHours: 9.0, componentCost: 2000.0, key: "Commercial|SG|SHBF-B-M" },

    { type: "Residential", glazing: "DG", configuration: "SHTF", manufactureHours: 32.0, installHours: 5.5, componentCost: 300.0, key: "Residential|DG|SHTF" },
    { type: "Residential", glazing: "DG", configuration: "SHBF", manufactureHours: 32.0, installHours: 5.5, componentCost: 300.0, key: "Residential|DG|SHBF" },
    { type: "Residential", glazing: "DG", configuration: "SHBF-B", manufactureHours: 32.0, installHours: 5.5, componentCost: 300.0, key: "Residential|DG|SHBF-B" },
    { type: "Residential", glazing: "DG", configuration: "DH", manufactureHours: 32.0, installHours: 5.0, componentCost: 300.0, key: "Residential|DG|DH" },
    { type: "Residential", glazing: "DG", configuration: "SHBF-M", manufactureHours: 44.0, installHours: 7.5, componentCost: 2000.0, key: "Residential|DG|SHBF-M" },
    { type: "Residential", glazing: "DG", configuration: "SHTF-M", manufactureHours: 44.0, installHours: 7.5, componentCost: 2000.0, key: "Residential|DG|SHTF-M" },
    { type: "Residential", glazing: "DG", configuration: "DH-M", manufactureHours: 44.0, installHours: 7.5, componentCost: 2000.0, key: "Residential|DG|DH-M" },
    { type: "Residential", glazing: "DG", configuration: "SHBF-B-M", manufactureHours: 44.0, installHours: 7.0, componentCost: 2000.0, key: "Residential|DG|SHBF-B-M" },

    { type: "Commercial", glazing: "DG", configuration: "SHTF", manufactureHours: 40.0, installHours: 6.5, componentCost: 400.0, key: "Commercial|DG|SHTF" },
    { type: "Commercial", glazing: "DG", configuration: "SHBF", manufactureHours: 40.0, installHours: 6.5, componentCost: 400.0, key: "Commercial|DG|SHBF" },
    { type: "Commercial", glazing: "DG", configuration: "SHBF-B", manufactureHours: 40.0, installHours: 6.5, componentCost: 400.0, key: "Commercial|DG|SHBF-B" },
    { type: "Commercial", glazing: "DG", configuration: "DH", manufactureHours: 40.0, installHours: 6.0, componentCost: 400.0, key: "Commercial|DG|DH" },
    { type: "Commercial", glazing: "DG", configuration: "SHBF-M", manufactureHours: 52.0, installHours: 8.5, componentCost: 2000.0, key: "Commercial|DG|SHBF-M" },
    { type: "Commercial", glazing: "DG", configuration: "SHTF-M", manufactureHours: 52.0, installHours: 8.5, componentCost: 2000.0, key: "Commercial|DG|SHTF-M" },
    { type: "Commercial", glazing: "DG", configuration: "DH-M", manufactureHours: 52.0, installHours: 8.5, componentCost: 2000.0, key: "Commercial|DG|DH-M" },
    { type: "Commercial", glazing: "DG", configuration: "SHBF-B-M", manufactureHours: 52.0, installHours: 8.0, componentCost: 2000.0, key: "Commercial|DG|SHBF-B-M" }
  ],

  glass: [
    { type: "Residential", glazing: "SG", thickness: 5, costPerM2: 132 },
    { type: "Residential", glazing: "SG", thickness: 8, costPerM2: 179 },
    { type: "Commercial", glazing: "SG", thickness: 12, costPerM2: 224 },
    { type: "Commercial", glazing: "SG", thickness: 15, costPerM2: 332 },
    { type: "Residential", glazing: "DG", thickness: 8, costPerM2: 284 },
    { type: "Commercial", glazing: "DG", thickness: 12, costPerM2: 337 },
  ],
  polishing: [
    { thickness: 5, costPerM: 10 },
    { thickness: 8, costPerM: 21 },
    { thickness: 12, costPerM: 38 },
    { thickness: 15, costPerM: 82 },
  ],

  stockTypes: [
    { SKU: "01209", Length: 5000, Description: "01209", Cost: 18.92 },
    { SKU: "01216", Length: 5000, Description: "01216", Cost: 5.35 },
    { SKU: "01229", Length: 5000, Description: "01229", Cost: 7.31 },
    { SKU: "01230", Length: 5000, Description: "01230", Cost: 9.48 },
    { SKU: "01249", Length: 5000, Description: "01249", Cost: 9.90 },
    { SKU: "01282", Length: 5000, Description: "01282", Cost: 29.79 },
    { SKU: "01284", Length: 5000, Description: "01284", Cost: 66.64 },
    { SKU: "01311", Length: 5000, Description: "01311", Cost: 22.10 },

    { SKU: "01382", Length: 4500, Description: "01382", Cost: 23.42 },
    { SKU: "01383", Length: 4500, Description: "01383", Cost: 24.16 },
    { SKU: "01384", Length: 4500, Description: "01384", Cost: 22.33 },
    { SKU: "01385", Length: 4500, Description: "01385", Cost: 20.52 },

    { SKU: "08261", Length: 5000, Description: "08261", Cost: 5.02 },
    { SKU: "08638", Length: 5000, Description: "08638", Cost: 7.25 },
    { SKU: "08645", Length: 5000, Description: "08645", Cost: 29.00 },
    { SKU: "08747", Length: 5000, Description: "08747", Cost: 32.23 },
    { SKU: "08753", Length: 5000, Description: "08753", Cost: 10.30 },
    { SKU: "08773", Length: 5000, Description: "08773", Cost: 33.48 },
    { SKU: "08900", Length: 5000, Description: "08900", Cost: 32.43 },

    { SKU: "30231", Length: 5000, Description: "30231", Cost: 0 },

    { SKU: "60025", Length: 5000, Description: "60025", Cost: 30.00 },

    { SKU: "N1320", Length: 5600, Description: "N1320", Cost: 9.30 },
    { SKU: "N1382", Length: 5600, Description: "N1382", Cost: 9.53 },
    { SKU: "N1383", Length: 5600, Description: "N1383", Cost: 13.07 },
    { SKU: "N1384-1", Length: 1000, Description: "N1384-1", Cost: 11.23 },
    { SKU: "N1385-5", Length: 5000, Description: "N1385-5", Cost: 11.07 },
    { SKU: "N1388", Length: 5600, Description: "N1388", Cost: 10.07 },
    { SKU: "N1389", Length: 5600, Description: "N1389", Cost: 11.03 }
  ],
  stockUsageRows: [
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01209", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01209", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01209", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "01209", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "01209", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "01209", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "01209", Position: "Sill", Qty: 1, Location: "W" },

    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "01216", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "01216", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01216", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01216", Position: "Jamb", Qty: 4, Location: "H" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01216", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01216", Position: "Jamb", Qty: 4, Location: "H" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "01216", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "01216", Position: "Jamb", Qty: 4, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "01216", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "01216", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "01216", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "01216", Position: "Jamb", Qty: 4, Location: "H" },

    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "01229", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "01229", Position: "Jamb", Qty: 2, Location: "H" },

    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01230", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01230", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01230", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "01230", Position: "Sill", Qty: 2, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "01230", Position: "Jamb", Qty: 1, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "01230", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "01230", Position: "Sill", Qty: 2, Location: "W" },

    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01249", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01249", Position: "Jamb", Qty: 1, Location: "H" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01249", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01249", Position: "Jamb", Qty: 1, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "01249", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "01249", Position: "Jamb", Qty: 2, Location: "H" },

    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "01282", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01282", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01282", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01282", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "01282", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "01282", Position: "Head", Qty: 2, Location: "W" },

    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "01284", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "01284", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "01284", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "01284", Position: "Jamb", Qty: 2, Location: "H" },

    { Glazing: "SG", Type: "Residential", Configuration: "SH", SKU: "01311", Position: "Jamb", Qty: 2, Location: "H" },

    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01382", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01382", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "01382", Position: "Jamb", Qty: 4, Location: "H" },

    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01383", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01383", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "01383", Position: "Head", Qty: 1, Location: "W" },

    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01384", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01384", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "01384", Position: "Jamb", Qty: 2, Location: "H" },

    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01385", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "01385", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01385", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "01385", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "01385", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "01385", Position: "Jamb", Qty: 2, Location: "H" },

    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "08261", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "08261", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "08261", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "08261", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "08261", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "08261", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "08261", Position: "Head", Qty: 1, Location: "W" },

    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "08638", Position: "Head", Qty: 4, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "08638", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "08638", Position: "Head", Qty: 4, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "08638", Position: "Jamb", Qty: 2, Location: "H" },

    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "08645", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "08645", Position: "Jamb", Qty: 2, Location: "H" },

    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "08747", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "08747", Position: "Head", Qty: 1, Location: "W" },

    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "08753", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "08753", Position: "Jamb", Qty: 1, Location: "H" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "08753", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "08753", Position: "Jamb", Qty: 1, Location: "H" },

    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "08773", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "08773", Position: "Head", Qty: 1, Location: "W" },

    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "08900", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "08900", Position: "Head", Qty: 2, Location: "W" },

    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "30231", Position: "Jamb", Qty: 2, Location: "H" },

    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "60025", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "60025", Position: "Sill", Qty: 1, Location: "W" },

    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "N1320", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "N1320", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "N1320", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "N1320", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "N1320", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "N1320", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "N1320", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "N1320", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "N1320", Position: "Jamb", Qty: 1, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "N1320", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "N1320", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "N1320", Position: "Jamb", Qty: 2, Location: "H" },

    { Glazing: "SG", Type: "Residential", Configuration: "SH", SKU: "N1382", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Residential", Configuration: "DH", SKU: "N1383", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "SG", Type: "Residential", Configuration: "DH", SKU: "N1384-1", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Residential", Configuration: "SH", SKU: "N1384-1", Position: "Head", Qty: 1, Location: "W" },

    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "N1385-5", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "N1385-5", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "N1385-5", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "N1385-5", Position: "Jamb", Qty: 4, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "DH", SKU: "N1385-5", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "N1385-5", Position: "Sill", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Residential", Configuration: "DH", SKU: "N1385-5", Position: "Head", Qty: 1, Location: "W" },

    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "N1388", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "N1388", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "N1388", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "SH", SKU: "N1388", Position: "Jamb", Qty: 4, Location: "H" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "N1388", Position: "Head", Qty: 1, Location: "W" },
    { Glazing: "SG", Type: "Commercial", Configuration: "SH", SKU: "N1388", Position: "Jamb", Qty: 2, Location: "H" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "N1388", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Residential", Configuration: "DH", SKU: "N1388", Position: "Jamb", Qty: 4, Location: "H" },
    { Glazing: "DG", Type: "Residential", Configuration: "SH", SKU: "N1388", Position: "Jamb", Qty: 4, Location: "H" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "N1388", Position: "Head", Qty: 2, Location: "W" },
    { Glazing: "DG", Type: "Commercial", Configuration: "DH", SKU: "N1388", Position: "Jamb", Qty: 4, Location: "H" },

    { Glazing: "SG", Type: "Residential", Configuration: "DH", SKU: "N1389", Position: "Jamb", Qty: 2, Location: "H" }
  ],
  polishingPerM: 12,
  leadPerKg: 15,

  travelBase: 20,
  travelPerKm: 1.2,

  marginTiers: {
    economy: 0.2,
    standard: 0.35,
    luxury: 0.5
  },

  gstRate: 0.15
};