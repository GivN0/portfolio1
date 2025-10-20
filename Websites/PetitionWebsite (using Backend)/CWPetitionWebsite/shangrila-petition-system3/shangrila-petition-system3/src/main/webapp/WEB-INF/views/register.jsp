<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shangri-La Petition Platform - Register</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-image: url('/images/shangrilaregister.jpg'); 
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: #333;
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
            text-align: center;
            color: #fff;
        }

        .card {
            background-color: rgba(255, 255, 255, 0.9); 
            padding: 40px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            width: 100%;
            max-width: 500px;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #2c3e50;
        }

        label {
            font-size: 1.1rem;
            margin: 10px 0 5px;
            display: block;
            text-align: left;
        }

        input[type="email"], input[type="text"], input[type="password"], input[type="date"], input[type="file"] {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 1rem;
        }

        button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.2rem;
            width: 100%;
            margin-top: 15px;
        }

        button:hover {
            background-color: #45a049;
        }

        .error {
            color: #e74c3c;
            margin-top: 10px;
        }

        .link {
            color: #4CAF50;
            text-decoration: none;
        }

        /* Responsive design */
        @media (max-width: 600px) {
            .container {
                padding: 20px;
            }
            .highlight {
            color: #4CAF50; 
            font-weight: bold;
        }

            .card {
                width: 100%;
                max-width: 90%;
            }
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="card">
            <h1>Register for SLPP</h1>

            <form action="/petitioners/save" method="post" enctype="multipart/form-data">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />

                <label for="fullName">Full Name:</label>
                <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required />

                <label for="dateOfBirth">Date of Birth:</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" required />

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />

                <label for="bioId">BioID (Optional):</label>
                <input type="text" id="bioId" name="bioId" placeholder="Enter your BioID" />

                <label for="qrCode">Upload QR Code (Optional):</label>
                <input type="file" id="qrCode" name="file" accept="image/png, image/jpeg" />

                <button type="submit">Register</button>
            </form>

            <div>
                <p class="error">
                    
                    <strong>${error != null ? error : ""}</strong>
                </p>
                
                <p>Have an account already?<a class="link" href="/petitioners/login">Click here!</a></p>
            </div>

        </div>
    </div>

</body>
</html>
