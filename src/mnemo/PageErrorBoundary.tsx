import { Component, type ReactNode } from "react";
import SiteError from "../app/error";

type State = { error: Error | null };

/**
 * What the site's app/error.tsx is to Next: a page that breaks while drawing shows it, with
 * « Try again », instead of leaving the window blank. Keyed by route in main.tsx, so leaving
 * the page clears it.
 */
export default class PageErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    // SiteError logs the error itself
    if (this.state.error) return <SiteError error={this.state.error} reset={() => this.setState({ error: null })} />;
    return this.props.children;
  }
}
