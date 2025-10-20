<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        h1 {
            text-align: center;
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 30px;
        }

        form {
            margin-bottom: 30px;
            text-align: center;
            background-color: white;
            padding: 20px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        form label {
            font-size: 1.2rem;
            margin-right: 10px;
        }

        input[type="number"], input[type="text"] {
            padding: 10px;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-right: 10px;
            width: 200px;
        }

        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        }

        button:hover {
            background-color: #45a049;
        }

        h2 {
            font-size: 2rem;
            margin-bottom: 20px;
            color: #2c3e50;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            background-color: white;
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #4CAF50;
            color: white;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #ddd;
        }

        td button {
            background-color: #4CAF50;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        td button:hover {
            background-color: #45a049;
        }

        .form-container {
            margin-bottom: 20px;
        }

        .form-container input[type="text"] {
            width: 300px;
        }

        .form-container button {
            margin-top: 10px;
        }

        @media (max-width: 768px) {
            table {
                font-size: 0.9rem;
            }

            th, td {
                padding: 10px;
            }

            button {
                font-size: 1rem;
                padding: 10px 20px;
            }

            form input[type="number"], form input[type="text"] {
                width: 100%;
            }
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Petitions Committee Dashboard</h1>

        <div class="form-container">
            <form action="/admin/setThreshold" method="post">
                <label for="threshold">Set Signature Threshold:</label>
                <input type="number" id="threshold" name="threshold" required />
                <button type="submit">Update Threshold</button>
            </form>
        </div>

        <h2>All Petitions</h2>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Signatures</th>
                    <th>Status</th>
                    <th>Response</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="petition" items="${petitions}">
                    <tr>
                        <td>${petition.title}</td>
                        <td>${petition.content}</td>
                        <td>${petition.signatureCount}</td>
                        <td>${petition.closed ? 'Closed' : 'Open'}</td>
                        <td>${petition.response != null ? petition.response : 'Pending'}</td>
                        <td>
                            <c:if test="${!petition.closed}">
                                <form action="/admin/respond" method="post">
                                    <input type="hidden" name="petitionId" value="${petition.id}" />
                                    <input type="text" name="response" placeholder="Enter response" required />
                                    <button type="submit">Respond</button>
                                </form>
                            </c:if>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>

</body>
</html>
