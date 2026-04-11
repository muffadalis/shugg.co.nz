document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".calc-pill").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".calc-pill").forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  document.querySelectorAll(".shape-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".shape-btn").forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  document.querySelectorAll(".glazing-pill").forEach((label) => {
    const input = label.querySelector("input");
    input.addEventListener("change", function () {
      document.querySelectorAll(".glazing-pill").forEach((l) => l.classList.remove("active"));
      label.classList.add("active");
    });
  });

  const tabs = document.querySelectorAll(".calc-pill");
  const isMotorised = document.getElementById("motorisedToggle");
  const glazingInputs = document.querySelectorAll('input[name="glazing"]');
  const glassThickness = document.querySelectorAll('input[name="glass-thickness"]');

  const image = document.getElementById("windowImage");
  const base = image.dataset.base; 

  const heightSlider = document.getElementById("heightSlider");
  const widthSlider = document.getElementById("widthSlider");

  const heightValue = document.getElementById("heightValue");
  const widthValue = document.getElementById("widthValue");

  let currentType = "SH_TF";

  const configMap = {
    SH_TF: "SHTF",
    SH_BF: "SHBF",
    SH_BF_B: "SHBF-B",
    DH: "DH"
  };

  [glassThickness, glazingInputs].forEach((el) => {
    if (el)
      el.forEach((input) => input.addEventListener("change", refreshQuote));
  });

  function getGlazingCode() {
    const checked = document.querySelector('input[name="glazing"]:checked');
    return checked ? checked.value : "SG";
  }

  function getGlassThickness() {
    const checked = document.querySelector('input[name="glass-thickness"]:checked');
    return checked ? Number(checked.value) : 5;
  }

  function getConfigurationCode() {
    const baseConfig = configMap[currentType] || "SHTF";
    return motorisedToggle && motorisedToggle.checked ? `${baseConfig}-M` : baseConfig;
  }

  function updateImage() {
    const suffix = isMotorised.checked ? "_M" : "";
    image.src = `${base}/${currentType}${suffix}.png`;
  }
  
  
  function getInputModel() {
    var glassThickness = getGlassThickness();
    return {
      type: (glassThickness > 8) ? "Commercial" : "Residential",
      glazing: getGlazingCode(),
      configuration: getConfigurationCode(),
      thickness: glassThickness,
      widthM: (widthSlider ? Number(widthSlider.value) : 1200) / 1000,
      heightM: (heightSlider ? Number(heightSlider.value) : 1800) / 1000,
      quantity: 1,
      distanceKm: 0,
      marginTier: "standard"
    };
  }

  function refreshQuote() {
    
    const input = getInputModel();

    const result = window.PricingEngine.calculateQuote(input);
    const output = window.PricingEngine.buildQuoteOutput(result);

    if (quoteOutput) {
      quoteOutput.innerHTML = output.html;
    }
  }

  // Tab click
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      currentType = this.dataset.type;

      updateImage();
      refreshQuote();

    });
  });

  // Motorised toggle
  isMotorised.addEventListener("change", function () {
    updateImage();
    refreshQuote();
  });
  function updateHeight(val) {
    heightValue.textContent = `${val} mm`;
  }

  function updateWidth(val) {
    widthValue.textContent = `${val} mm`;
  }

  heightSlider.addEventListener("input", () => {
    updateHeight(heightSlider.value);
    refreshQuote();

  });

  widthSlider.addEventListener("input", () => {
    updateWidth(widthSlider.value);
    refreshQuote();
  });


  // init
  updateHeight(heightSlider.value);
  updateWidth(widthSlider.value);
  updateImage();
});

