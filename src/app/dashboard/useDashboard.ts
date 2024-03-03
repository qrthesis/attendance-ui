'use client'

import { useAppSelector } from "@/utils/ducks/store"
import React, { useState } from "react"

const useDashboard = () => {
    const { user } = useAppSelector(state => state.authSlice)
    return {
        user
    }
}

export default useDashboard