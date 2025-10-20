<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shangri-La Petition Platform - Login</title>
    <style>
        /* Global styles */
        body {
            font-family: Arial, sans-serif;
            background-image: url('/images/shangrilabg.jpg'); 
            background-size: cover; 
            background-position: center; 
            background-attachment: fixed; 
        }
        
        /* Container for centering content */
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
        }

        /* Card style for form */
        .card {
            background-color: white;
            padding: 30px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            width: 100%;
            max-width: 400px;
            text-align: center;
        }

        h1 {
            font-size: 2rem;
            color: #333;
        }

        /* Styling for the form fields */
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 1rem;
        }

        /* Button styling */
        button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            width: 100%;
            margin-top: 15px;
        }

        button:hover {
            background-color: #45a049;
        }

        .error {
            color: #ff6347;
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
            <h1>Login to SLPP</h1>

            <form action="/petitioners/saved" method="post">
                <label for="username">Email:</label>
                <input type="text" id="username" name="username" placeholder="Enter your email" required />

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />

                <button type="submit">Login</button>
            </form>

            <p class="error">${error != null ? "Invalid username or password" : ""}</p>

            <p>Don't have an account? <a class="link" href="/petitioners/register">Register here</a></p>
        </div>
    </div>

</body>
</html>
