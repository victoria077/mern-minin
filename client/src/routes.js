import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage } from "./pages/AuthPage"
import { LinksPage } from "./pages/LinksPage"
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/links" element={<LinksPage />} exact>
                </Route>
                <Route path="/create" element={<CreatePage />} exact>
                </Route>
                <Route path="/detail/:id" element={<DetailPage />}>
                </Route>
                <Route
                path="*"
                element={<Navigate to="/create" replace />}
            />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} exact>
            </Route>
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    )
}