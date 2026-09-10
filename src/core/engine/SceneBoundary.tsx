import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface SceneBoundaryProps {
  children: ReactNode
}

interface SceneBoundaryState {
  hasError: boolean
}

/**
 * Error boundary that lives INSIDE the R3F canvas root.
 *
 * The DOM ErrorBoundary can't be used here (React Three Fiber renders
 * three.js objects, not DOM), and it must not swallow the whole app —
 * a failing location/scene should just stop rendering its own subtree
 * while loading, HUD and transitions keep working.
 */
export class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  state: SceneBoundaryState = { hasError: false }

  static getDerivedStateFromError(): SceneBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[Heaven Society] Scene error:', error, info.componentStack)
  }

  render(): ReactNode {
    return this.state.hasError ? null : this.props.children
  }
}