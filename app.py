from flask import Flask, render_template, request, redirect, url_for
from pension_new import calculate_pbor_pension
from officer_pension import calculate_officer_pension
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def officer_or_pbor():
    return render_template('officer_or_pbor.html')

@app.route('/pbor', methods=['POST'])
def pbor():
    officerType = request.form['officerType']
    if officerType == "commissioned_officer":
        return render_template('officer.html', officerType=officerType)
    elif officerType == "pbor":
        return render_template('pbor.html', officerType=officerType)
    else:
        return render_template('error_page.html', message="Invalid officerType")

@app.route('/output', methods=['POST'])
def output():
    name = request.form['name']
    service_of_pensioner = request.form['service']
    officer_pbor = request.form['officer_pbor']
    service_type = request.form['category']
    pension_type_from_user = request.form['pension_type']
    acp = request.form.get('acp', None)
    rank = request.form['rank']
    group = request.form.get('group', None)
    group_pay = request.form.get('group_pay', None)
    dob_service_pensioner = request.form['dob_service_pensioner']
    dob_family_pensioner = request.form['dob_family_pensioner']
    date_of_appointment = request.form['date_of_appointment']
    date_of_retirement = request.form['date_of_retirement']
    non_qualifying_service = request.form['non_qualifying_service']
    years_served_input = request.form['length_of_service_years'] + '.' + request.form['length_of_service_months']
    disability_percentage = request.form['disability_percentage']

    print(f"Name: {name}")
    print(f"Service: {service_of_pensioner}")
    print(f"Officer/PBOR: {officer_pbor}")
    print(f"Category of Pensioner: {service_type}")
    print(f"Pension Type: {pension_type_from_user}")
    print(f"ACP: {acp}")
    print(f"Rank: {rank}")
    print(f"Group: {group}")
    print(f"Group Pay: {group_pay}")
    print(f"DOB Service Pensioner: {dob_service_pensioner}")
    print(f"DOB Family Pensioner: {dob_family_pensioner}")
    print(f"Date of Appointment: {date_of_appointment}")
    print(f"Date of Retirement: {date_of_retirement}")
    print(f"Non Qualifying Service: {non_qualifying_service}")
    print(f"Years Served Input: {years_served_input}")
    print(f"Disability Percentage: {disability_percentage}")

    if dob_service_pensioner:
        date_of_birth = dob_service_pensioner
    elif dob_family_pensioner:
        date_of_birth = dob_family_pensioner
    else:
        return render_template('error_page.html', message="Please provide either DOB of service pensioner or family pensioner.")

    date_of_birth = datetime.strptime(date_of_birth, '%Y-%m-%d')
    formatted_date_of_birth_str = date_of_birth.strftime('%d/%m/%Y')
    date_of_discharge = datetime.strptime(date_of_retirement, '%Y-%m-%d')
    formatted_date_of_discharge_str = date_of_discharge.strftime('%d/%m/%Y')

    result = calculate_pbor_pension(
        name, service_type, pension_type_from_user, rank, group, group_pay, years_served_input, 
        formatted_date_of_birth_str, formatted_date_of_discharge_str, disability_percentage
    )

    if result:
        service_pension_amount, disability_pension_amount, additional_pension_amount, age = result
        return render_template('output.html', 
            name=name, 
            rank=rank, 
            type_of_pension=pension_type_from_user, 
            orop_rate=service_pension_amount, 
            disability_rate=disability_pension_amount, 
            additional_pension_rate=additional_pension_amount, 
            total_amount=service_pension_amount + disability_pension_amount + additional_pension_amount
        )
    else:
        return render_template('error_page.html', message="Error in pension calculation.")

@app.route('/officer_output', methods=['POST'])
def officer_output():
    name = request.form['name']
    service_of_pensioner = request.form['service']
    officer_pbor = request.form['officer_pbor']
    service_type = request.form['category']
    pension_type_from_user = request.form['pension_type']
    rank = request.form['rank']
    dob_service_pensioner = request.form['dob_service_pensioner']
    dob_family_pensioner = request.form['dob_family_pensioner']
    date_of_appointment = request.form['date_of_appointment']
    date_of_retirement = request.form['date_of_retirement']
    non_qualifying_service = request.form['non_qualifying_service']
    years_served_input = request.form['length_of_service_years'] + '.' + request.form['length_of_service_months']
    disability_percentage = request.form['disability_percentage']

    print(f"Name: {name}")
    print(f"Service: {service_of_pensioner}")
    print(f"Officer/PBOR: {officer_pbor}")
    print(f"Category of Pensioner: {service_type}")
    print(f"Pension Type: {pension_type_from_user}")
    print(f"Rank: {rank}")
    print(f"DOB Service Pensioner: {dob_service_pensioner}")
    print(f"DOB Family Pensioner: {dob_family_pensioner}")
    print(f"Date of Appointment: {date_of_appointment}")
    print(f"Date of Retirement: {date_of_retirement}")
    print(f"Non Qualifying Service: {non_qualifying_service}")
    print(f"Years Served Input: {years_served_input}")
    print(f"Disability Percentage: {disability_percentage}")

    if dob_service_pensioner:
        date_of_birth = dob_service_pensioner
    elif dob_family_pensioner:
        date_of_birth = dob_family_pensioner
    else:
        return render_template('error_page.html', message="Please provide either DOB of service pensioner or family pensioner.")

    date_of_birth = datetime.strptime(date_of_birth, '%Y-%m-%d')
    formatted_date_of_birth_str = date_of_birth.strftime('%d/%m/%Y')
    date_of_discharge = datetime.strptime(date_of_retirement, '%Y-%m-%d')
    formatted_date_of_discharge_str = date_of_discharge.strftime('%d/%m/%Y')

    result = calculate_officer_pension(
        name, service_type, pension_type_from_user, rank, years_served_input, 
        formatted_date_of_birth_str, formatted_date_of_discharge_str, disability_percentage
    )

    if result:
        service_pension_amount, disability_pension_amount, additional_pension_amount, age = result
        return render_template('officer_output.html', 
            name=name, 
            rank=rank, 
            type_of_pension=pension_type_from_user, 
            orop_rate=service_pension_amount, 
            disability_rate=disability_pension_amount, 
            additional_pension_rate=additional_pension_amount, 
            total_amount=service_pension_amount + disability_pension_amount + additional_pension_amount
        )
    else:
        return render_template('error_page.html', message="Error in pension calculation.")

if __name__ == '__main__':
    app.run(debug=True)
