<?php
header('Content-Type: application/json');

function validate_form($data, $page)
{
    $errors = [];

    if ($page == 1) {
        if (empty($data['first_name']) || ctype_space($data['first_name'])) {
            $errors['first_name'] = "First Name is required.";
        }
        if (empty($data['middle_name']) || ctype_space($data['middle_name'])) {
            $errors['middle_name'] = "Middle Name is required.";
        }
        if (empty($data['last_name']) || ctype_space($data['last_name'])) {
            $errors['last_name'] = "Last Name is required.";
        }
    }

    if ($page == 2) {
        if (empty($data['dob'])) {
            $errors['dob'] = "Date of Birth is required.";
        }
        if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = "Valid Email is required.";
        }
    }

    if ($page == 3) {
        if (empty($data['tin']) || !ctype_digit($data['tin'])) {
            $errors['tin'] = "Valid Tax ID is required.";
        }
        if (empty($data['zip']) || !ctype_digit($data['zip'])) {
            $errors['zip'] = "Valid ZIP Code is required.";
        }
        if (empty($data['phone']) || !ctype_digit($data['phone'])) {
            $errors['phone'] = "Valid Phone Number is required.";
        }
    }

    echo json_encode($errors);
    exit;
}

$page = $_POST['page'] ?? 1;
validate_form($_POST, $page);
