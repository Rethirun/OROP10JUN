document.addEventListener("DOMContentLoaded", function() {
    const officerPborSelect = document.getElementById("officer_pbor");
    const categorySelect = document.getElementById("category");
    const pensionTypeSelect = document.getElementById("pension_type");
    const rankSelect = document.getElementById("rank");
    const serviceSelect = document.getElementById("service");
    const dobServicePensionerField = document.getElementById("dob_service_pensioner_field");
    const dobFamilyPensionerField = document.getElementById("dob_family_pensioner_field");
    const dobServicePensionerInput = document.getElementById("dob_service_pensioner");
    const dobFamilyPensionerInput = document.getElementById("dob_family_pensioner");
    const lengthOfServiceYearsSelect = document.getElementById("length_of_service_years");
    const lengthOfServiceMonthsSelect = document.getElementById("length_of_service_months");

    officerPborSelect.addEventListener("change", updateCategoryAndPensionOptions);
    serviceSelect.addEventListener("change", updateCategoryAndPensionOptions); 
    categorySelect.addEventListener("change", updatePensionOptions);
    officerPborSelect.addEventListener("change", toggleDobFields);

    populateYearOptions();
    populateMonthOptions();

    // Call update functions to initialize options
    updateCategoryAndPensionOptions();
    toggleDobFields();

    function toggleDobFields() {
        if (officerPborSelect.value === "commissioned_officer") {
            dobServicePensionerField.style.display = "block";
            dobServicePensionerInput.required = true;
            dobFamilyPensionerField.style.display = "none";
            dobFamilyPensionerInput.required = false;
        } else if (officerPborSelect.value === "family_commissioned_officer") {
            dobServicePensionerField.style.display = "none";
            dobServicePensionerInput.required = false;
            dobFamilyPensionerField.style.display = "block";
            dobFamilyPensionerInput.required = true;
        } else {
            dobServicePensionerField.style.display = "none";
            dobServicePensionerInput.required = false;
            dobFamilyPensionerField.style.display = "none";
            dobFamilyPensionerInput.required = false;
        }
    }

    function populateYearOptions() {
        for (let i = 1; i <= 50; i++) {
            let option = document.createElement("option");
            option.value = i.toString().padStart(2, '0');
            option.textContent = i.toString().padStart(2, '0');
            lengthOfServiceYearsSelect.appendChild(option);
        }
    }

    function populateMonthOptions() {
        for (let i = 0; i < 12; i++) {
            let option = document.createElement("option");
            option.value = i.toString().padStart(2, '0');
            option.textContent = i.toString().padStart(2, '0');
            lengthOfServiceMonthsSelect.appendChild(option);
        }
    }

    function updateCategoryAndPensionOptions() {
        updateCategoryOptions();
        updatePensionOptions();
        updateRankOptions();
    }

    function updateCategoryOptions() {
        const officerPborValue = officerPborSelect.value;
        const selectedCategory = categorySelect.value;

        // Clear previous options
        categorySelect.innerHTML = "<option value='' disabled selected>Please select...</option>";

        switch (officerPborValue) {
            case "commissioned_officer":
                addOptions(categorySelect, [
                    { text: "Regular Commissioned Officers (Excluding Officers of AMC/ADC/RVC/MNS/TA/EC/SSC)", value: "Regular Commissioned Officers Excluding AMC/ADC/RVC/MNS/TA/EC/SSC" },
                    { text: "Commissioned Officers of AMC/ADC/RVC", value: "Commissioned Officers of AMC/ADC/RVC" },
                    { text: "Commissioned Officers of Territorial Army", value: "Commissioned Officers of Territorial Army" },
                    { text: "Commissioned Officers of Military Nursing Services", value: "Commissioned Officers of Military Nursing Services" },
                    { text: "Regular EC/SSC Officers (Other than AMC/ADC/RVC)", value: "Regular EC/SSC Officers Other than AMC/ADC/RVC" },
                    { text: "EC/SSC Officers of AMC/ADC/RVC Doctors", value: "EC/SSC Officers AMC/ADC/RVC doctors" }
                ]);
                break;
            case "family_commissioned_officer":
                addOptions(categorySelect, [
                    { text: "Widow of Regular Commissioned Officers (Excluding Officers of AMC/ADC/RVC/MNS/TA/EC/SSC)", value: "Regular Commissioned Officers Excluding AMC/ADC/RVC/MNS/TA/EC/SSC" },
                    { text: "Widow of Commissioned Officers of AMC/ADC/RVC", value: "Commissioned Officers of AMC/ADC/RVC" },
                    { text: "Widow of Commissioned Officers of Territorial Army", value: "Commissioned Officers of Territorial Army" },
                    { text: "Widow of Commissioned Officers of Military Nursing Services", value: "Commissioned Officers of Military Nursing Services" },
                    { text: "Widow of Regular EC/SSC Officers (Other than AMC/ADC/RVC)", value: "Regular EC/SSC Officers Other than AMC/ADC/RVC" },
                    { text: "Widow of EC/SSC Officers of AMC/ADC/RVC Doctors", value: "EC/SSC Officers AMC/ADC/RVC doctors" },
                    { text: "Children of Regular Commissioned Officers (Excluding Officers of AMC/ADC/RVC/MNS/TA/EC/SSC)", value: "Regular Commissioned Officers Excluding AMC/ADC/RVC/MNS/TA/EC/SSC" },
                    { text: "Children of Commissioned Officers of AMC/ADC/RVC", value: "Commissioned Officers of AMC/ADC/RVC" },
                    { text: "Children of Commissioned Officers of Territorial Army", value: "Commissioned Officers of Territorial Army" },
                    { text: "Children of Commissioned Officers of Military Nursing Services", value: "Commissioned Officers of Military Nursing Services" },
                    { text: "Children of Regular EC/SSC Officers (Other than AMC/ADC/RVC)", value: "Regular EC/SSC Officers Other than AMC/ADC/RVC" },
                    { text: "Children of EC/SSC Officers of AMC/ADC/RVC Doctors", value: "EC/SSC Officers AMC/ADC/RVC doctors" },
                    { text: "Both Parent of Regular Commissioned Officers (Excluding Officers of AMC/ADC/RVC/MNS/TA/EC/SSC)", value: "Regular Commissioned Officers Excluding AMC/ADC/RVC/MNS/TA/EC/SSC" },
                    { text: "Both Parent of Commissioned Officers of AMC/ADC/RVC", value: "Commissioned Officers of AMC/ADC/RVC" },
                    { text: "Both Parent of Commissioned Officers of Territorial Army", value: "Commissioned Officers of Territorial Army" },
                    { text: "Both Parent of Commissioned Officers of Military Nursing Services", value: "Commissioned Officers of Military Nursing Services" },
                    { text: "Both Parent of Regular EC/SSC Officers (Other than AMC/ADC/RVC)", value: "Regular EC/SSC Officers Other than AMC/ADC/RVC" },
                    { text: "Both Parent of EC/SSC Officers of AMC/ADC/RVC Doctors", value: "EC/SSC Officers AMC/ADC/RVC doctors" },
                    { text: "Single Parent of Regular Commissioned Officers (Excluding Officers of AMC/ADC/RVC/MNS/TA/EC/SSC)", value: "Regular Commissioned Officers Excluding AMC/ADC/RVC/MNS/TA/EC/SSC" },
                    { text: "Single Parent of Commissioned Officers of AMC/ADC/RVC", value: "Commissioned Officers of AMC/ADC/RVC" },
                    { text: "Single Parent of Commissioned Officers of Territorial Army", value: "Commissioned Officers of Territorial Army" },
                    { text: "Single Parent of Commissioned Officers of Military Nursing Services", value: "Commissioned Officers of Military Nursing Services" },
                    { text: "Single Parent of Regular EC/SSC Officers (Other than AMC/ADC/RVC)", value: "Regular EC/SSC Officers Other than AMC/ADC/RVC" },
                    { text: "Single Parent of EC/SSC Officers of AMC/ADC/RVC Doctors", value: "EC/SSC Officers AMC/ADC/RVC doctors" },
                    { text: "Sibling of Regular Commissioned Officers (Excluding Officers of AMC/ADC/RVC/MNS/TA/EC/SSC)", value: "Regular Commissioned Officers Excluding AMC/ADC/RVC/MNS/TA/EC/SSC" },
                    { text: "Sibling of Commissioned Officers of AMC/ADC/RVC", value: "Commissioned Officers of AMC/ADC/RVC" },
                    { text: "Sibling of Commissioned Officers of Territorial Army", value: "Commissioned Officers of Territorial Army" },
                    { text: "Sibling of Commissioned Officers of Military Nursing Services", value: "Commissioned Officers of Military Nursing Services" },
                    { text: "Sibling of Regular EC/SSC Officers (Other than AMC/ADC/RVC)", value: "Regular EC/SSC Officers Other than AMC/ADC/RVC" },
                    { text: "Sibling of EC/SSC Officers of AMC/ADC/RVC Doctors", value: "EC/SSC Officers AMC/ADC/RVC doctors" }
                ]);
                break;
            default:
                break;
        }

        // Restore previous selection if applicable
        categorySelect.value = selectedCategory;
    }

    function updatePensionOptions() {
        const officerPborValue = officerPborSelect.value;
        const selectedCategoryText = categorySelect.options[categorySelect.selectedIndex]?.text || '';

        // Clear previous options
        pensionTypeSelect.innerHTML = "<option value='' disabled selected>Please select...</option>";

        if (officerPborValue === "commissioned_officer") {
            if (selectedCategoryText.includes("Commissioned Officers") || selectedCategoryText.includes("EC/SSC Officers")) {
                addOptions(pensionTypeSelect, [
                    { text: "Retiring Pension", value: "Retiring Pension/Service Pension" },
                    { text: "Retiring Pension with Disability Element", value: "Disability Pension" },
                    { text: "Retiring Pension with War Injury Element( Discharge on attending prescribed age of retirement)", value: "War Injury Pension" },
                    { text: "Retiring Pension with Liberalized Disability Element", value: "Disability Pension" },
                    { text: "Disability Pension", value: "Disability Pension" },
                    { text: "Liberalized Disability Pension", value: "Disability Pension" },
                    { text: "War Injury Pension", value: "War Injury Pension(Invalided Out)" },
                    { text: "Invalid Pension", value: "Retiring Pension/Service Pension" }
                ]);
            }
        } else if (officerPborValue === "family_commissioned_officer") {
            if (selectedCategoryText.includes("Widow") || selectedCategoryText.includes("Children")) {
                addOptions(pensionTypeSelect, [
                    { text: "Enhanced rate of Ordinary Family Pension", value: "Enhanced Rate of Ordinary Family Pension" },
                    { text: "Normal rate of Ordinary Family Pension", value: "Normal Rate of Ordinary Family Pension" },
                    { text: "Special Family Pension", value: "Special Family Pension" },
                    { text: "Liberalised Family Pension(Widow)", value: "Liberalised Family Pension" },
                    { text: "Liberalised Family Pension(Children)", value: "Liberalised Family Pension to child/children" }
                ]);
            } else if (selectedCategoryText.includes("Parent") || selectedCategoryText.includes("Sibling")) {
                addOptions(pensionTypeSelect, [
                    { text: "Normal rate of Ordinary Family Pension", value: "Normal Rate of Ordinary Family Pension" },
                    { text: "Special Dependent Family Pension", value: "Special Dependent/2nd Life Award Family Pension" },
                    { text: "Liberalised Dependent Pension(Both Parents)", value: "Liberalised Dependent/2nd Life Award of Liberalised Family Pension (Both Parents)" },
                    { text: "Liberalised Dependent Pension(Single Parents)", value: "Liberalised Dependent/2nd Life Award of Liberalised Family Pension (Single Parents)" }
                ]);
            }
        }
    }

    function updateRankOptions() {
        const officerPborValue = officerPborSelect.value;
        const serviceValue = serviceSelect.value;

        rankSelect.innerHTML = "<option value='' disabled selected>Please select...</option>";

        if ((serviceValue === "army" || serviceValue === "territorial_army") && (officerPborValue === "commissioned_officer" || officerPborValue === "family_commissioned_officer")) {
            addOptions(rankSelect, [
                { text: "2nd LT/Lieutenant", value: "2nd_LT_LT" },
                { text: "Captain", value: "CAPT" },
                { text: "Major", value: "MAJOR" },
                { text: "Lt Col(TS)/LT Col", value: "LT_COL_TS_LT_COL" },
                { text: "Colonel(TS)", value: "COL_TS" },
                { text: "Colonel", value: "COL" },
                { text: "Brigadier", value: "BRIG" },
                { text: "Major General", value: "MAJOR_GEN" },
                { text: "Lieutenant General", value: "LT_GEN" },
                { text: "Lieutenant General (Higher Administrative Grade)", value: "LT_GEN_HAG" },
                { text: "Lieutenant General (Army Commander)", value: "ARMY_CDR" },
                { text: "Director General Armed Forces Medical Services", value: "DGFAMS" },
                { text: "Vice Chief of Army Staff", value: "VCOAS" },
                { text: "Chief of Army Staff", value: "COAS" }
            ]);
        } else if (serviceValue === "navy" && (officerPborValue === "commissioned_officer" || officerPborValue === "family_commissioned_officer")) {
            addOptions(rankSelect, [
                { text: "Sub Lieutenant", value: "2nd_LT_LT" },
                { text: "Lieutenant", value: "CAPT" },
                { text: "Lieutenant Commander", value: "MAJOR" },
                { text: "Cdr. (TS)/Cdr", value: "LT_COL_TS_LT_COL" },
                { text: "Capt.(TS)", value: "COL_TS" },
                { text: "Capt.", value: "COL" },
                { text: "Commodore", value: "BRIG" },
                { text: "Rear Admiral", value: "MAJOR_GEN" },
                { text: "Vice Admiral", value: "LT_GEN" },
                { text: "Vice Admiral (HAG+)", value: "LT_GEN_HAG" },
                { text: "Vice Admiral (FOC-in-C)", value: "ARMY_CDR" },
                { text: "Vice Chief of Naval Staff", value: "VCOAS" },
                { text: "Chief of Naval Staff", value: "COAS" }
            ]);
        } else if (serviceValue === "air_force" && (officerPborValue === "commissioned_officer" || officerPborValue === "family_commissioned_officer")) {
            addOptions(rankSelect, [
                { text: "Flying Officer", value: "2nd_LT_LT" },
                { text: "Flight Lieutenant", value: "CAPT" },
                { text: "Squadron Leader", value: "MAJOR" },
                { text: "Wg Cdr(TS)/Wg Cdr", value: "LT_COL_TS_LT_COL" },
                { text: "Wg Cdr(S)", value: "COL_TS" },
                { text: "Gp Capt(TS)", value: "COL" },
                { text: "Air Commodore", value: "BRIG" },
                { text: "Air Vice Marshal", value: "MAJOR_GEN" },
                { text: "Air Marshal", value: "LT_GEN" },
                { text: "Air Marshal (HAG+)", value: "LT_GEN_HAG" },
                { text: "Air Marshal(AOC-in-C)", value: "ARMY_CDR" },
                { text: "Vice Chief of Air Staff", value: "VCOAS" },
                { text: "Chief of Air Staff", value: "COAS" }
            ]);
        }
    }

    function addOptions(selectElement, options) {
        options.forEach(option => {
            let opt = document.createElement("option");
            opt.value = option.value;
            opt.textContent = option.text;
            selectElement.appendChild(opt);
        });
    }
});
