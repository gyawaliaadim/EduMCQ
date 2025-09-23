<img width="1366" height="768" alt="Screenshot (5)" src="https://github.com/user-attachments/assets/9384bbbb-8b27-4b09-a41f-a63c453cbf3d" />

# EduMCQ - A Modern MCQ Platform for Education

EduMCQ is a web-based application designed for teachers and students to create, manage, and practice multiple-choice questions (MCQs) efficiently. It offers a seamless experience with intuitive dashboards and secure access.

## Key Features
- ✅ **Teacher & Student Dashboards**: Tailored interfaces for managing and practicing MCQs.
- ✅ **Class & Chapter Management**: Organize classes and chapters effortlessly.
- ✅ **Create, Edit & Practice MCQs**: Build and solve MCQs with ease.
- ✅ **Unique Class Codes**: Secure access to classes using unique codes.
- ✅ **Progress Tracking**: Monitor performance with detailed analytics.
- ✅ **Demo Mode**: Explore the app without signing in.
- ✅ **Intuitive Interface**: User-friendly design for smooth navigation.

## Prerequisites
To run EduMCQ locally, ensure you have the following installed:
- **Node.js**: Download and install from [nodejs.org](https://nodejs.org).
- **MongoDB**: Install MongoDB and MongoDB Compass from [mongodb.com](https://www.mongodb.com).
- **Git**: Required to clone the repository.

## Setup Instructions

Follow these steps to set up and run EduMCQ on your local machine:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd edu-mcq
   ```

2. **Install Dependencies**
   Run the following command to install required packages:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env.local` file in the root directory.
   - Add the following environment variables, replacing `PORT` with the port number (default: `3000`) and MongoDB port (default: `27017`):
     ```env
     NEXT_PUBLIC_HOST=http://localhost:3000
     NEXT_PUBLIC_API_URL=http://localhost:3000/api
     GITHUB_ID=<Your-GitHub-Client-ID>
     GITHUB_SECRET=<Your-GitHub-Client-Secret>
     MONGO_URI=mongodb://localhost:27017
     ```

4. **Set Up MongoDB**
   - Ensure MongoDB is running locally.
   - Use MongoDB Compass to connect to `mongodb://localhost:27017`.

5. **Configure GitHub OAuth**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers).
   - Create a new OAuth App:
     - **Homepage URL**: `http://localhost:3000`
     - **Authorization Callback URL**: `http://localhost:3000/api/auth/callback/github`
   - Save the app to obtain `Client ID` and generate a `Client Secret`.
   - Update the `.env.local` file with these values:
     ```env
     GITHUB_ID=<Your-GitHub-Client-ID>
     GITHUB_SECRET=<Your-GitHub-Client-Secret>
     ```

6. **Run the Application**
   - Start the development server:
     ```bash
     npm run dev
     ```
   - The app will run at `http://localhost:3000` (or the port specified in `.env.local`).
   - Example output:
     ```bash
     > edu-mcq@0.1.0 dev
     > next dev --turbopack

     ▲ Next.js 15.3.1 (Turbopack)
     - Local:        http://localhost:3000
     - Network:      http://192.168.1.73:3000
     - Environments: .env.local
     ```
   - Click the `http://localhost:3000` link to open the app in your browser.

7. **Troubleshooting**
   - If the server is already running, stop it with `Ctrl+C` before restarting.
   - Ensure MongoDB is connected and the ports in `.env.local` match your setup.

## Screenshots

### Landing Pages
| ![Landing Page 1](https://github.com/user-attachments/assets/f2efd90c-ed30-44c7-b7e1-eba192816c6c) | ![Landing Page 2](https://github.com/user-attachments/assets/63d16420-004c-4e6d-9547-6b0ad7f02e15) |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| ![Landing Page 3](https://github.com/user-attachments/assets/c4682baa-708a-4610-9855-b58f4f752421) | ![Landing Page 4](https://github.com/user-attachments/assets/4dca7d8b-db65-4bbb-bc84-f4e1a45a0d83) |

### Student Pages
| ![Student Page 1](https://github.com/user-attachments/assets/e0b90ed4-3724-48d4-a56d-a60c3a7ccab9) | ![Student Page 2](https://github.com/user-attachments/assets/963dff4c-2bcf-4e62-a843-d5b066750a40) |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| ![Student Page 3](https://github.com/user-attachments/assets/dfa09bb6-341c-474a-a974-7a47ebcaa63e) | ![Student Page 4](https://github.com/user-attachments/assets/716e74ca-53f4-41d8-b0e8-0145847e0872) |

### Teacher Pages
| ![Teacher Page 1](https://github.com/user-attachments/assets/8eadd05a-9c15-493c-a1b3-c1e478de412e) | ![Teacher Page 2](https://github.com/user-attachments/assets/f79f7a86-76e4-44d2-b6a9-c1350c644736) |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| ![Teacher Page 3](https://github.com/user-attachments/assets/d8826d5b-6915-44aa-a4ff-849bd39a3477) | ![Teacher Page 4](https://github.com/user-attachments/assets/c3154177-4ff2-408d-bdac-dfd7027ad5f6) |
| ![Teacher Page 5](https://github.com/user-attachments/assets/6dfed319-647b-4789-88a4-addea6d973df) |                                                                                               |

### Demo Pages
| ![Demo Page 1](https://github.com/user-attachments/assets/804481dc-b19a-4137-874e-29b6a3bed69a) | ![Demo Page 2](https://github.com/user-attachments/assets/419c5cf7-ff4c-423b-b97f-79e00ea9f3c6) |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| ![Demo Page 3](https://github.com/user-attachments/assets/76dcf7ba-9dbe-4abf-90c3-0f5d068bccf5) |                                                                                               |

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests to improve EduMCQ.

## Credits
Developed by **Aadim Gyawali**.
