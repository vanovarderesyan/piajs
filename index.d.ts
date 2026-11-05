/**
 * Node.js wrapper around the installed Private Internet Access Desktop CLI.
 * All operations are asynchronous and require the PIA desktop application.
 */
declare class PiaVpn {
  constructor();

  /** List available PIA region IDs. */
  regions(): Promise<string[]>;

  /** Get the currently selected region ID. */
  region(): Promise<string>;

  /**
   * Select a region by ID, "auto", or "random".
   * Passing null or omitting the argument selects "auto".
   * Throws if an explicit region is not available.
   */
  setRegion(server?: string | null): Promise<string>;

  /** Get the current PIA connection state returned by piactl. */
  status(): Promise<string>;

  /** Get the VPN IP address if reported by piactl. */
  ip(): Promise<string>;

  /**
   * Issue a connect command and return piactl's output.
   * @deprecated The optional timeout and verbose arguments are currently
   * accepted for compatibility but are not implemented.
   * Use connect() without arguments until connection waiting is added.
   */
  connect(timeout?: number, verbose?: boolean): Promise<string>;

  /** Issue a disconnect command and return piactl's output. */
  disconnect(): Promise<string>;

  /** Reset daemon settings to the PIA defaults. */
  reset_settings(): Promise<string>;

  /** Run the current CLI debug-logging command. */
  set_debug_logging(): Promise<string>;

  /** Enable the PIA background service. */
  backgroundEnable(): Promise<string>;
}

export = PiaVpn;
