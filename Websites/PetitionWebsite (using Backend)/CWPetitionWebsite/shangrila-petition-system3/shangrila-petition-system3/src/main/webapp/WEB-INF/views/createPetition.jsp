<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Petition - Shangri-La Petition Platform</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-image: url('/images/writing-on-paper-stockcake.png'); 
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
            text-align: center;
            padding: 20px;
        }

        .card {
            background-color: white;
            padding: 40px;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            width: 100%;
            max-width: 700px;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #2c3e50;
        }

        label {
            font-size: 1.2rem;
            margin: 10px 0 5px;
            display: block;
            text-align: left;
            color: #333;
        }

        input[type="text"], textarea {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 1rem;
        }

        textarea {
            resize: vertical; 
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

        .action-buttons {
            margin-top: 20px;
        }

        .action-buttons a {
            text-decoration: none;
            color: white;
        }

        .action-buttons button {
            background-color: #2980b9;
            margin-right: 10px;
        }

        .action-buttons button.logout {
            background-color: #e74c3c;
        }

        .action-buttons button:hover {
            background-color: #3498db;
        }

        @media (max-width: 600px) {
            .card {
                width: 100%;
                max-width: 90%;
            }

            h1 {
                font-size: 2rem;
            }

            button {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="card">
            <h1>Create a New Petition</h1>
            
            <form action="/dashboard/create" method="post">
                <label for="title">Petition Title:</label>
                <input type="text" id="title" name="title" placeholder="Enter the title of the petition" required />
                
                <label for="content">Petition Content:</label>
                <textarea id="content" name="content" rows="5" placeholder="Describe the petition here..." required></textarea>

                <button type="submit">Create Petition</button>
            </form>

            <div class="error">
                <p><strong></strong></p>
            </div>

            <div class="action-buttons">
                <a href="/dashboard">
                    <button type="button">Go to Dashboard</button>
                </a>
                <a href="/logout">
                    <button class="logout" type="button">Logout</button>
                </a>
            </div>
        </div>
    </div>

</body>
</html>
