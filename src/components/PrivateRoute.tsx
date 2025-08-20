import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {useAuth} from '../services/useAuth'

type Props = {,
children: React.ReactNode
}

export default function PrivateRoute(__{ children }: Props) {const { currentUser} = useAuth()
  const location = useLocation()

if (!currentUser) {
return <Navigate to="/login" replace state={{ from: location }} />
  }
return <>{children}</>
}

