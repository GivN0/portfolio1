<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Petitioner Dashboard</title>
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

        h2 {
            text-align: center;
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 30px;
        }

        h3 {
            font-size: 1.8rem;
            margin-bottom: 20px;
            color: #2c3e50;
        }

        a {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin-bottom: 30px;
            font-size: 1.2rem;
        }

        a:hover {
            background-color: #45a049;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #4CAF50;
            color: white;
            font-size: 1.1rem;
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

        .actions {
            text-align: center;
        }

        .logout-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #e74c3c;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        }

        .logout-btn:hover {
            background-color: #c0392b;
        }

        @media (max-width: 768px) {
            table {
                font-size: 0.9rem;
            }

            th, td {
                padding: 10px;
            }

            a {
                font-size: 1rem;
                padding: 10px 20px;
            }
        }
    </style>
</head>
<body>

    <form action="/logout" method="post" style="display: inline;">
        <button class="logout-btn" type="submit">Logout</button>
    </form>

    <div class="container">
        <h2>Petitioner Dashboard</h2>
        <a href="${pageContext.request.contextPath}/dashboard/create">Create New Petition</a>

        <h3>All Petitions</h3>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Response</th>
                    <th>Signature Count</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="petition" items="${petitions}">
                    <tr>
                        <td>${petition.title}</td>
                        <td>${petition.status}</td>
                        <td>${petition.response}</td>
                        <td>${petition.signatureCount}</td> 
                        <td class="actions">
                            <c:if test="${petition.status == 'open'}">
                                <form action="${pageContext.request.contextPath}/dashboard/sign/${petition.id}" method="post">
                                    <button type="submit">Sign Petition</button>
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
