<?php
session_start();
require_once 'validate.php';
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // The page number will now be passed with the POST request
    $page = isset($_POST['page']) ? $_POST['page'] : 1;
    $errors = validate_form($_POST, $page);

    if (empty($errors)) {
        $_SESSION['success'] = "Form submitted successfully!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Form</title>
</head>

<body>
    <section class="main">
        <h1 class="label1"> Personal Data </h1>

        <form method="POST" action="">
            <section class="wrapper">
                <div class="page1">
                    <p class="sublabel1"> Personal Information </p>
                    <div class="row1">
                        <div>
                            <label for="lastname">Last Name</label>
                            <input type="text" name="last_name" value="<?php echo $_POST['last_name'] ?? ''; ?>" class="<?php echo isset($errors['last_name']) ? 'error' : ''; ?>">
                            <span class="error"><?php echo $errors['last_name'] ?? ''; ?></span>
                        </div>
                        <div>
                            <label for="firstname">First Name</label>
                            <input type="text" name="first_name" value="<?php echo $_POST['first_name'] ?? ''; ?>" class="<?php echo isset($errors['first_name']) ? 'error' : ''; ?>">
                            <span class="error"><?php echo $errors['first_name'] ?? ''; ?></span>
                        </div>
                        <div>
                            <label for="middle">Middle Initial</label>
                            <input type="text" name="middle_name" value="<?php echo $_POST['middle_name'] ?? ''; ?>" class="<?php echo isset($errors['middle_name']) ? 'error' : ''; ?>">
                            <span class="error"><?php echo $errors['middle_name'] ?? ''; ?></span>
                        </div>
                    </div>
                    <div class="details-grid">
                        <div>
                            <label>Date of Birth</label>
                            <input type="date" name="dob" value="<?php echo $_POST['dob'] ?? ''; ?>" class="<?php echo isset($errors['dob']) ? 'error' : ''; ?>">
                            <span class="error"><?php echo $errors['dob'] ?? ''; ?></span>
                        </div>
                        <div>
                            <label>Sex</label>
                            <div class="sex-options">
                                <label><input type="radio" name="gender" value="Male" <?php echo (isset($_POST['gender']) && $_POST['gender'] == 'Male') ? 'checked' : ''; ?>> Male</label>
                                <label><input type="radio" name="gender" value="Female" <?php echo (isset($_POST['gender']) && $_POST['gender'] == 'Female') ? 'checked' : ''; ?>> Female</label>
                            </div>
                            <span class="error"><?php echo $errors['gender'] ?? ''; ?></span>
                        </div>
                        <div>
                            <label>Civil Status</label>
                            <select name="civil_status" id="civil_status">
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Legally Separated">Legally Separated</option>
                                <option value="Others">Others</option>
                            </select>
                            <input type="text" name="others" id="others" style="display:none;" value="<?php echo $_POST['others'] ?? ''; ?>">
                            <span class="error"><?php echo $errors['others'] ?? ''; ?></span>
                        </div>
                        <div>
                            <label for="tax">Tax Identification No.</label>
                            <input type="text" name="tin" value="<?php echo $_POST['tin'] ?? ''; ?>" class="<?php echo isset($errors['tin']) ? 'error' : ''; ?>">
                            <span class="error"><?php echo $errors['tin'] ?? ''; ?></span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Hidden field to pass the current page number -->
            <input type="hidden" name="page" value="1">
            <button type="submit" class="done">Submit</button>
        </form>
    </section>

    <script>
        document.getElementById("civil_status").addEventListener("change", function() {
            document.getElementById("others").style.display = this.value === "Others" ? "block" : "none";
        });
    </script>
</body>

</html>
