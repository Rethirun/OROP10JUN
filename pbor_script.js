document.addEventListener("DOMContentLoaded", function() {
    const officerPborSelect = document.getElementById("officer_pbor");
    const categorySelect = document.getElementById("category");
    const pensionTypeSelect = document.getElementById("pension_type");
    const rankSelect = document.getElementById("rank");
    const rankLabel = document.querySelector("label[for='rank']");
    const serviceSelect = document.getElementById("service");
    const dobServicePensionerField = document.getElementById("dob_service_pensioner_field");
    const dobFamilyPensionerField = document.getElementById("dob_family_pensioner_field");
    const dobServicePensionerInput = document.getElementById("dob_service_pensioner");
    const dobFamilyPensionerInput = document.getElementById("dob_family_pensioner");
    const groupField = document.getElementById("groupField");
    const groupPayField = document.getElementById("groupPayField");
    const acpField = document.getElementById("acpField");
    const acpSelect = document.getElementById("acp");
    const groupSelect = document.getElementById("group");
    const lengthOfServiceYearsSelect = document.getElementById("length_of_service_years");
    const lengthOfServiceMonthsSelect = document.getElementById("length_of_service_months");

    officerPborSelect.addEventListener("change", updateCategoryAndPensionOptions);
    serviceSelect.addEventListener("change", updateCategoryAndPensionOptions); 
    categorySelect.addEventListener("change", updatePensionOptions);
    officerPborSelect.addEventListener("change", toggleDobFields);
    acpSelect.addEventListener("change", toggleACPFields);
    groupSelect.addEventListener("change", toggleGroupPayField);

    populateYearOptions();
    populateMonthOptions();

    // Display ACP field by default
    acpField.style.display = "block";

    // Call update functions to initialize options
    updateCategoryAndPensionOptions();
    toggleDobFields();

    function toggleDobFields() {
        if (officerPborSelect.value === "pbor") {
            dobServicePensionerField.style.display = "block";
            dobServicePensionerInput.required = true;
            dobFamilyPensionerField.style.display = "none";
            dobFamilyPensionerInput.required = false;
        } else if (officerPborSelect.value === "family_pbor") {
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

    function toggleGroupPayField() {
        if (groupSelect.value === "Group X") {
            groupPayField.style.display = "block";
        } else {
            groupPayField.style.display = "none";
        }
    }

    function toggleACPFields() {
        const acpValue = acpSelect.value;

        if (acpValue !== "No ACP") {
            rankLabel.textContent = "Enter the equivalent rank as per the selected ACP";
        } else {
            rankLabel.textContent = "Select the Rank as per PPO";
        }

        // Display the group field based on ACP selection
        groupField.style.display = "block";
        toggleGroupPayField();  // Ensure groupPayField visibility is correct

        // Make ACP field mandatory if displayed
        if (acpField.style.display === "block") {
            acpSelect.setAttribute("required", "required");
        } else {
            acpSelect.removeAttribute("required");
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
        const selectedCategoryText = categorySelect.options[categorySelect.selectedIndex]?.text || '';

        // Clear previous options
        categorySelect.innerHTML = "<option value='' disabled selected>Please select...</option>";

        switch (officerPborValue) {
            case "pbor":
                addOptions(categorySelect, [
                    { text: "JCOs/ORs including Honorary commissioned officers (including DSC as 1st Pension)", value: "JCOs/ORs including Honorary commissioned officers" },
                    { text: "JCOs/ORs Group X drawing Group Pay Rs.6200 - Applicable for post 01.01.2016 retirees (FOR SPARSH ONLY)", value: "JCOs/ORs Group X drawing Group Pay Rs.6200 - w.e.f 01.01.2016 applicable for post 01.01.2016 retirees (FOR SPARSH ONLY)" },
                    { text: "JCOs/ORs of DSC in receipt of 2nd Pension", value: "JCOs/ORs of DSC in receipt of 2nd pension" },
                    { text: "JCOs/ORs of Territorial Army", value: "JCOs/ORs of Territorial Army" }
                ]);
                break;
            case "family_pbor":
                addOptions(categorySelect, [
                    { text: "Widow of JCOs/ORs including Honorary commissioned officers (including DSC as 1st Pension)", value: "JCOs/ORs including Honorary commissioned officers" },
                    { text: "Widow of JCOs/ORs Group X drawing Group Pay Rs.6200 - Applicable for post 01.01.2016 retirees (FOR SPARSH ONLY)", value: "JCOs/ORs Group X drawing Group Pay Rs.6200 - w.e.f 01.01.2016 applicable for post 01.01.2016 retirees (FOR SPARSH ONLY)" },
                    { text: "Widow of JCOs/ORs of DSC in receipt of 2nd Pension", value: "JCOs/ORs of DSC in receipt of 2nd pension" },
                    { text: "Widow of JCOs/ORs of Territorial Army", value: "JCOs/ORs of Territorial Army" },
                    { text: "Children of JCOs/ORs including Honorary commissioned officers (including DSC as 1st Pension)", value: "JCOs/ORs including Honorary commissioned officers" },
                    { text: "Children of JCOs/ORs Group X drawing Group Pay Rs.6200 - Applicable for post 01.01.2016 retirees (FOR SPARSH ONLY)", value: "JCOs/ORs Group X drawing Group Pay Rs.6200 - w.e.f 01.01.2016 applicable for post 01.01.2016 retirees (FOR SPARSH ONLY)" },
                    { text: "Children of JCOs/ORs of DSC in receipt of 2nd Pension", value: "JCOs/ORs of DSC in receipt of 2nd pension" },
                    { text: "Children of JCOs/ORs of Territorial Army", value: "JCOs/ORs of Territorial Army" },
                    { text: "Parent of JCOs/ORs including Honorary commissioned officers (including DSC as 1st Pension)", value: "JCOs/ORs including Honorary commissioned officers" },
                    { text: "Parent of JCOs/ORs Group X drawing Group Pay Rs.6200 - Applicable for post 01.01.2016 retirees (FOR SPARSH ONLY)", value: "JCOs/ORs Group X drawing Group Pay Rs.6200 - w.e.f 01.01.2016 applicable for post 01.01.2016 retirees (FOR SPARSH ONLY)" },
                    { text: "Parent of JCOs/ORs of DSC in receipt of 2nd Pension", value: "JCOs/ORs of DSC in receipt of 2nd pension" },
                    { text: "Parent of JCOs/ORs of Territorial Army", value: "JCOs/ORs of Territorial Army" },
                    { text: "Sibling of JCOs/ORs including Honorary commissioned officers (including DSC as 1st Pension)", value: "JCOs/ORs including Honorary commissioned officers" },
                    { text: "Sibling of JCOs/ORs Group X drawing Group Pay Rs.6200 - Applicable for post 01.01.2016 retirees (FOR SPARSH ONLY)", value: "JCOs/ORs Group X drawing Group Pay Rs.6200 - w.e.f 01.01.2016 applicable for post 01.01.2016 retirees (FOR SPARSH ONLY)" },
                    { text: "Sibling of JCOs/ORs of DSC in receipt of 2nd Pension", value: "JCOs/ORs of DSC in receipt of 2nd pension" },
                    { text: "Sibling of JCOs/ORs of Territorial Army", value: "JCOs/ORs of Territorial Army" }
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

        if (officerPborValue === "pbor") {
            if (selectedCategoryText.includes("JCOs/ORs")) {
                addOptions(pensionTypeSelect, [
                    { text: "Service Pension", value: "Retiring Pension/Service Pension" },
                    { text: "Service Pension with Disability Element", value: "Disability Pension" },
                    { text: "Service Pension with War Injury Element( On  Completion of terms of engagement for JCOS/ORS)", value: "War Injury Pension" },
                    { text: "Service Pension with Liberalized Disability Element", value: "Disability Pension" },
                    { text: "Disability Pension", value: "Disability Pension" },
                    { text: "Liberalized Disability Pension", value: "Disability Pension" },
                    { text: "War Injury Pension", value: "War Injury Pension(Invalided Out)" },
                    { text: "Invalid Pension", value: "Retiring Pension/Service Pension" }
                ]);
            }
        } else if (officerPborValue === "family_pbor") {
            if (selectedCategoryText.includes("Widow") || selectedCategoryText.includes("Children")) {
                addOptions(pensionTypeSelect, [
                    { text: "Enhanced rate of Ordinary Family Pension", value: "Enhanced Rate of Ordinary Family Pension" },
                    { text: "Normal rate of Ordinary Family Pension", value: "Normal Rate of Ordinary Family Pension" },
                    { text: "Special Family Pension", value: "Special Family Pension" },
                    { text: "Liberalised Family Pension(Widow)", value: "Liberalised Family Pension" },
                    { text: "Liberalised Family Pension(Child/Children)", value: "Liberalised Family Pension to child/children" }
                ]);
            } else if (selectedCategoryText.includes("Parent") || selectedCategoryText.includes("Sibling")) {
                addOptions(pensionTypeSelect, [
                    { text: "Normal rate of Ordinary Family Pension", value: "Normal Rate of Ordinary Family Pension" },
                    { text: "2nd Life Award of Special Family Pension", value: "Special Dependent/2nd Life Award Family Pension" },
                    { text: "2nd Life Award of Liberalised Family Pension", value: "Liberalised Dependent/2nd Life Award of Liberalised Family Pension (Single Parents)" }
                ]);
            }
        }
    }

    function updateRankOptions() {
        const officerPborValue = officerPborSelect.value;
        const serviceValue = serviceSelect.value;

        rankSelect.innerHTML = "<option value='' disabled selected>Please select...</option>";

        if ((serviceValue === "army" || serviceValue === "territorial_army" || serviceValue === "dsc_1st_service" || serviceValue === "dsc_2nd_service") && (officerPborValue === "pbor" || officerPborValue === "family_pbor")) {
            addOptions(rankSelect, [
                { text: "Sepoy", value: "SEPOY" },
                { text: "Honorary Naik", value: "HONY_NAIK" },
                { text: "Naik/Naik(TS)", value: "NAIK_NAIK_TS" },
                { text: "Honorary Havildar", value: "HONY_HAVILDAR" },
                { text: "Havildar", value: "HAVILDAR" },
                { text: "Honorary Naib Subedar", value: "HONY_NAIB_SUBEDAR" },
                { text: "Naib Subedar", value: "NAIB_SUBEDAR" },
                { text: "Subedar", value: "SUBEDAR" },
                { text: "Subedar Major", value: "SUBEDAR_MAJOR" },
                { text: "Subedar Major/Subedar granted ACP 'A'/ACP 'B'", value: "SUBEDAR_MAJOR_SUBEDAR_GRANTED_ACP" },
                { text: "Hony Lieutenant", value: "HONY_LT" },
                { text: "Hony Captain", value: "HONY_CAPT" },
                { text: "NCs(E)", value: "NCs_E" }
            ]);
        } else if (serviceValue === "navy" && (officerPborValue === "pbor" || officerPborValue === "family_pbor")) {
            addOptions(rankSelect, [
                { text: "Seaman- I & II and equivalent", value: "SEPOY" },
                { text: "Leading Seaman & equivalent", value: "NAIK_NAIK_TS" },
                { text: "Petty Officer/Mech-IV/Artificer-IV", value: "HAVILDAR" },
                { text: "CPO/Mech I,II & III/Artificer I, II & III,Chief Artificer / Chief Mech- I & II", value: "NAIB_SUBEDAR" },
                { text: "Artificier-III-I(Navy only)", value: "ARTIFICER_NAVY" },
                { text: "Master Chief Petty Officer- II/Master Chief Mech- II/Master Chief Art- II", value: "SUBEDAR" },
                { text: "Master Chief Petty Officer – I/Master Chief Mech- I/Master Chief Art- I", value: "SUBEDAR_MAJOR" },
                { text: "MCPO II, MCM II, MCA II/MCPO I, MCM I,MCA I granted ACP 'A'/ACP 'B'", value: "SUBEDAR_MAJOR_SUBEDAR_GRANTED_ACP" },
                { text: "Sub Lt", value: "HONY_LT" },
                { text: "Hony Lt", value: "HONY_CAPT" }
            ]);
        } else if (serviceValue === "air_force" && (officerPborValue === "pbor" || officerPborValue === "family_pbor")) {
            addOptions(rankSelect, [
                { text: "Air Craftsman/Leading Air Craftsman", value: "SEPOY" },
                { text: "Corporal", value: "NAIK_NAIK_TS" },
                { text: "Sergeant", value: "HAVILDAR" },
                { text: "Junior Warrant Officer", value: "NAIB_SUBEDAR" },
                { text: "Warrant Officer", value: "SUBEDAR" },
                { text: "Master Warrant Officer", value: "SUBEDAR_MAJOR" },
                { text: "WO/MWO granted ACP 'A'/ACP 'B'", value: "SUBEDAR_MAJOR_SUBEDAR_GRANTED_ACP" },
                { text: "Hony Fly. Officer", value: "HONY_LT" },
                { text: "Hony Flt. Lt.", value: "HONY_CAPT" },
                { text: "NCs(E)", value: "NCs_E" }
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
