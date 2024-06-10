import mysql.connector
from datetime import datetime
from dateutil.relativedelta import relativedelta

def update_rank(rank, service_type, group):
    if service_type == "JCOs/ORs including Honorary commissioned officers":
        if group in ["Group A", "Group X"]:
            if rank == "SEPOY":
                rank = "SEPOY_A_X"
            elif rank == "HONY_NAIK":
                rank = "HONY_NAIK_A_X"
            elif rank == "NAIK_NAIK_TS":
                rank = "NAIK_NAIK_TS_A_X"
            elif rank == "HONY_HAVILDAR":
                rank = "HONY_HAVILDAR_A_X"
            elif rank == "HAVILDAR":
                rank = "HAVILDAR_A_X"
            elif rank == "HONY_NAIB_SUBEDAR":
                rank = "HONY_NAIB_SUBEDAR_A_X"
            elif rank == "ARTIFICER_NAVY":
                rank = "ARTIFICER_NAVY_A_X"
            elif rank == "NAIB_SUBEDAR":
                rank = "NAIB_SUBEDAR_A_X"
            elif rank == "SUBEDAR":
                rank = "SUBEDAR_A_X"
            elif rank == "SUBEDAR_MAJOR":
                rank = "SUBEDAR_MAJOR_A_X"
            elif rank == "SUBEDAR_MAJOR_SUBEDAR_GRANTED_ACP":
                rank = "SUBEDAR_MAJOR_SUBEDAR_GRANTEDACP_AACP_B_A_X"
            elif rank == "HONY_LT":
                rank = "HONY_LIEUTENANT"
            elif rank == "HONY_CAPT":
                rank = "HONY_CAPTAIN"
            elif rank == "NCs_E":
                rank = "NCs_E"
        elif group == "Group Y":
            if rank == "SEPOY":
                rank = "SEPOY_B_TO_Z"
            elif rank == "HONY_NAIK":
                rank = "HONY_NAIK_B_TO_Z"
            elif rank == "NAIK_NAIK_TS":
                rank = "NAIK_NAIK_TS_B_TO_Z"
            elif rank == "HONY_HAVILDAR":
                rank = "HONY_HAVILDAR_B_TO_Z"
            elif rank == "HAVILDAR":
                rank = "HAVILDAR_B_TO_Z"
            elif rank == "HONY_NAIB_SUBEDAR":
                rank = "HONY_NAIB_SUBEDAR_B_TO_Z"
            elif rank == "NAIB_SUBEDAR":
                rank = "NAIB_SUBEDAR_B_TO_Z"
            elif rank == "SUBEDAR":
                rank = "SUBEDAR_B_TO_Z"
            elif rank == "SUBEDAR_MAJOR":
                rank = "SUBEDAR_MAJOR_B_TO_Z"
            elif rank == "SUBEDAR_MAJOR_SUBEDAR_GRANTED_ACP":
                rank = "SUBEDAR_MAJOR_SUBEDAR_GRANTEDACP_AACP_B_TO_Z"

    return rank

def convert_years_served(years_served_input, date_of_discharge):
    years_served = float(years_served_input.split(".")[0])
    months_served = int(years_served_input.split(".")[1])

    if datetime.strptime(date_of_discharge, "%d/%m/%Y") > datetime(1983, 6, 18):
        if 1 <= months_served <= 3:
            years_served += 0.0
        elif 4 <= months_served <= 8:
            years_served += 0.5
        elif 9 <= months_served <= 11:
            years_served += 1.0
    else:
        if 1 <= months_served <= 5:
            years_served += 0.0
        elif 6 <= months_served <= 11:
            years_served += 0.5

    if years_served >= 33.0:
        years_served = 33.0

    return years_served

def calculate_pbor_pension(name, service_type, pension_type_from_user, rank, group, group_pay, years_served_input, date_of_birth, date_of_discharge, disability_percentage):
    db = mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password="Apple#2013",
        database="orop_db"
    )

    rank = update_rank(rank, service_type, group)
    years_served = convert_years_served(years_served_input, date_of_discharge)
    date_of_birth = datetime.strptime(date_of_birth, '%d/%m/%Y')
    
    date_of_birth_80 = (date_of_birth + relativedelta(years=80)).date()
    date_of_birth_85 = (date_of_birth + relativedelta(years=85)).date()
    date_of_birth_90 = (date_of_birth + relativedelta(years=90)).date()
    date_of_birth_95 = (date_of_birth + relativedelta(years=95)).date()
    date_of_birth_100 = (date_of_birth + relativedelta(years=100)).date()
    
    cursor = db.cursor()

    table_name = None
    if service_type == "JCOs/ORs Group X drawing Group Pay Rs.6200 - w.e.f 01.01.2016 applicable for post 01.01.2016 retirees (FOR SPARSH ONLY)":
        table_name = "jcos_groupx"
    elif service_type == "JCOs/ORs including Honorary commissioned officers":
        table_name = "jcos_ors_hco"
    elif service_type == "JCOs/ORs of DSC in receipt of 2nd pension":
        table_name = "jcos_dsc"
    elif service_type == "JCOs/ORs of Territorial Army":
        table_name = "jcos_ta"

    service_pension_amount = None
    disability_pension_amount = None
    additional_pension_amount = None

    print(f"Category of Pensioner: {service_type}")
    print(f"Rank of Pensioner: {rank}")
    print(f"Type of Pension: {pension_type_from_user}")
    print(f"Years Served: {years_served}")

    if table_name:
        query = f"""
            SELECT DISTINCT rco.*
            FROM {table_name} rco
            JOIN PensionType pt ON rco.pension_type_id = pt.pension_type_id
            JOIN ServiceType st ON rco.service_type_id = st.service_type_id
            WHERE rco.no_of_years_served = %s
            AND pt.pension_type = "Retiring Pension/Service Pension"
            AND st.service_type = %s
        """
        cursor.execute(query, (years_served, service_type))
        result = cursor.fetchone()

        if result:
            column_names = [desc[0] for desc in cursor.description]
            for i in range(len(column_names)):
                if column_names[i] == rank:
                    service_pension_amount = float(result[i])
                    break

    current_date = datetime.now().date()
    age = current_date.year - date_of_birth.year - ((current_date.month, current_date.day) < (date_of_birth.month, date_of_birth.day))

    if service_pension_amount is not None:
        print(f"Pension amount: {service_pension_amount}")

        if pension_type_from_user == "Retiring Pension/Service Pension":
            service_pension_amount = service_pension_amount
        elif pension_type_from_user == "Enhanced Rate of Ordinary Family Pension":
            service_pension_amount = service_pension_amount
        elif pension_type_from_user == "Normal Rate of Ordinary Family Pension":
            service_pension_amount *= 0.6
        elif pension_type_from_user == "Special Family Pension":
            service_pension_amount *= 1.2
        elif pension_type_from_user == "Special Dependent/2nd Life Award Family Pension":
            service_pension_amount *= 0.6
        elif pension_type_from_user == "Liberalised Family Pension":
            service_pension_amount *= 2.0
        elif pension_type_from_user == "Liberalised Family Pension to child/children":
            service_pension_amount *= 1.2
        elif pension_type_from_user == "Liberalised Dependent/2nd Life Award of Liberalised Family Pension (Both Parents)":
            service_pension_amount *= 1.5
        elif pension_type_from_user == "Liberalised Dependent/2nd Life Award of Liberalised Family Pension (Single Parents)":
            service_pension_amount *= 1.2
        elif pension_type_from_user == "Disability Pension":
            if disability_percentage == "50":
                disability_pension_amount = (service_pension_amount * 0.6) / 2
            elif disability_percentage == "75":
                disability_pension_amount = (service_pension_amount * 0.6) * (3 / 4)
            elif disability_percentage == "100":
                disability_pension_amount = (service_pension_amount * 0.6)
            else:
                disability_pension_amount = 0
        elif pension_type_from_user == "War Injury Pension":
            if disability_percentage == "50":
                disability_pension_amount = (service_pension_amount * 1.2) / 2
            elif disability_percentage == "75":
                disability_pension_amount = (service_pension_amount * 1.2) * (3 / 4)
            elif disability_percentage == "100":
                disability_pension_amount = (service_pension_amount * 1.2)
            else:
                disability_pension_amount = 0
        elif pension_type_from_user == "War Injury Pension(Invalided Out)":
            if disability_percentage == "50":
                disability_pension_amount = (service_pension_amount * 2) / 2
            elif disability_percentage == "75":
                disability_pension_amount = (service_pension_amount * 2) * (3 / 4)
            elif disability_percentage == "100":
                disability_pension_amount = (service_pension_amount * 2)
            else:
                disability_pension_amount = 0
        else:
            print("Invalid pension type provided.")
            return None

        print(f"Adjusted pension amount based on pension type: {service_pension_amount}")

        if date_of_birth_80 <= current_date < date_of_birth_85:
            additional_pension_amount = service_pension_amount * 0.2
        elif date_of_birth_85 <= current_date < date_of_birth_90:
            additional_pension_amount = service_pension_amount * 0.3
        elif date_of_birth_90 <= current_date < date_of_birth_95:
            additional_pension_amount = service_pension_amount * 0.4
        elif date_of_birth_95 <= current_date < date_of_birth_100:
            additional_pension_amount = service_pension_amount * 0.5
        elif current_date >= date_of_birth_100:
            additional_pension_amount = service_pension_amount
        else:
            print("No additional pension at the moment.")
            additional_pension_amount = 0

        print(f"Additional pension amount: {additional_pension_amount}")
        print(f"Disability pension amount: {disability_pension_amount}")

        disability_pension_amount = disability_pension_amount or 0
        additional_pension_amount = additional_pension_amount or 0

        return round(service_pension_amount, 2), round(disability_pension_amount, 2), round(additional_pension_amount, 2), age
    else:
        print("No service pension amount found.")
        return None

    db.close()
