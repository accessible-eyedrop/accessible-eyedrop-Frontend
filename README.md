# SmartDrop: Accessible Eye Drop Administration System

## Introduction

SmartDrop is a smart device companion application designed to help users administer eye drops more effectively. This web application provides features for tracking eye drop administration, monitoring usage schedules, and providing guidance on proper application techniques.

The application is built with a modern web stack:
- Next.js 15 as the React framework
- Firebase for authentication and real-time data storage
- Material UI for the user interface components
- Tailwind CSS for styling

Key features include:
- Real-time device status and connection monitoring
- Eye drop usage tracking and history
- Step-by-step administration process with angle detection
- Eye-specific (left/right) medication tracking
- Medication management and scheduling

## Setup Instructions

### Prerequisites
- Node.js 18.18.0 or higher
- npm or yarn package manager
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/accessible-eyedrop.git
cd accessible-eyedrop
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Environment Setup

The repository contains the Firebase configuration in `.env.local`. Normally, you would need to create this file yourself, but it seems to be included in the repository. In a production environment, you would want to keep these keys secure.

### Step 4: Start the Development Server

```bash
npm run dev
# or
yarn dev
```

This will start the development server with Turbopack (as configured in the package.json script). Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Project Structure

- `/src/app`: Next.js application pages
- `/src/components`: React components including the UI elements for the application
- `/src/context`: React context providers for state management
- `/src/firebase`: Firebase configuration and API utilities
- `/public`: Static assets like images and SVGs

### Firebase Configuration

The application is already configured to use Firebase for authentication and Firestore for data storage. The Firebase configuration is in `/src/firebase/config.ts`.

### Key Components

- `HomeContent.tsx`: Main dashboard showing device connection and medication status
- `AdministrationProcess.tsx`: Guides the user through the eye drop administration process
- `UsageHistory.tsx`: Shows the history of medication usage
- `MedicationCard.tsx` and `MedicationDetail.tsx`: Displays medication information and details

### Authentication

The application uses Firebase Authentication, but you will need to set up users in the Firebase Console or implement a registration flow in the application.

## Next Steps

After setting up the local development environment, you can:

1. Explore the application features by navigating through the different screens
2. Check the Firebase connection by monitoring the console logs
3. Make modifications to components to suit your specific needs
4. Add additional features or customize the existing ones

The application is designed to work with a physical smart eye drop device, but you can simulate device interactions by making appropriate changes to the Firebase database directly.
