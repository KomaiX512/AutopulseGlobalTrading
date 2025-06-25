<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reply to Your Query</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
        }

        .header img {
            max-width: 150px;
        }

        .content {
            margin: 20px 0;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        .table th,
        .table td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }

        .footer {
            text-align: center;
            padding: 10px 0;
            border-top: 1px solid #ddd;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('path/to/logo.png') }}" alt="AutoPulse Logo">
        </div>
        <div class="content">
            <h2>Reply to Your Query</h2>
            <p>Dear {{ $query->user_name }},</p>
            <p>Thank you for reaching out to us. Below is the detail of your query along with our response:</p>
            <table class="table">
                <tr>
                    <th>User Name:</th>
                    <td>{{$query->user_name }}</td>
                </tr>
                <tr>
                    <th>User Email:</th>
                    <td>{{$query->user_email }}</td>
                </tr>
                <tr>
                    <th>Subject:</th>
                    <td>{{ $query->subject }}</td>
                </tr>
                <tr>
                    <th>Date:</th>
                    <td>{{ $query->created_at  }}</td>
                </tr>
                <tr>
                    <th>Query Message:</th>
                    <td>{{ $query->message }}</td>
                </tr>
                <tr>
                    <th>Reply Message:</th>
                    <td>{{ $query->reply }}</td>
                </tr>
            </table>
            <p>If you have any further questions, feel free to reply to this email or contact our support team.</p>
            <p>Best Regards,</p>
            <p>The AutoPulse Team</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} AutoPulse. All rights reserved.</p>
            <p>AutoPulse, 1234 Street Name, City, State, 56789</p>
        </div>
    </div>
</body>

</html>