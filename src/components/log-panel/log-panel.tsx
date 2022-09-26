import { useGameLog } from "contexts";
import c from "classnames";

import "./log-panel.scss";

function LogPanel(): JSX.Element {
  const { actions } = useGameLog();
  return (
    <div className="log-panel">
      {actions.map((action, i) => (
        <LogEntry key={`log-entry-${i}`} action={action} />
      ))}
    </div>
  );
}

interface LogEntryProps {
  action: ActionLog;
}

function LogEntry({ action }: LogEntryProps): JSX.Element {
  return (
    <div
      className={c("log-panel__entry", `log-panel__entry--${action.player}`)}
    >
      <code>{action.msg}</code>
    </div>
  );
}

export default LogPanel;
