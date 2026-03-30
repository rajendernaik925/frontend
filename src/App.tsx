// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Dashboard from "./pages/Dashboard";
// import PublicRoute from "./routes/PublicRoute";

// function App() {

//   return (

//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />

//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />
//         <Route path="/register"
//           element={
//             <PublicRoute>
//               <Register />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>

//     </BrowserRouter>

//   );

// }

// export default App;











// src/App.tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicRoute    from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

// ── Lazy imports ──────────────────────────────────────────────────────────────
const Login      = lazy(() => import("./pages/Login"));
const Register   = lazy(() => import("./pages/Register"));
const BaseLayout = lazy(() => import("./layouts/BaseLayout"));
const Dashboard  = lazy(() => import("./pages/Dashboard"));
const Profile    = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>

          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* Protected shell */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <BaseLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard"            element={<Dashboard />} />
            <Route path="profile"   element={<Profile />} />
            <Route path="*"         element={<Navigate to="/dashboard" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;