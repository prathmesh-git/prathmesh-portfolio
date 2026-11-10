export const scriptExamples = [
  {
    id: 'disk',
    title: 'Disk usage check',
    filename: 'disk-usage-check.sh',
    description: 'Warn when the root filesystem crosses a chosen usage threshold.',
    code: `#!/usr/bin/env bash\nset -euo pipefail\nthreshold=80\nusage=$(df -P / | awk 'NR==2 {gsub(/%/, "", $5); print $5}')\nif (( usage >= threshold )); then\n  printf 'Warning: root disk is %s%% full\\n' "$usage"\nfi`,
  },
  {
    id: 'service',
    title: 'Service health check',
    filename: 'service-health.sh',
    description: 'Check a systemd service and return a useful exit code for automation.',
    code: `#!/usr/bin/env bash\nset -euo pipefail\nservice="${'${1:-nginx}'}"\nif systemctl is-active --quiet "$service"; then\n  echo "$service is active"\nelse\n  echo "$service is not active" >&2\n  exit 1\nfi`,
  },
  {
    id: 'backup',
    title: 'Timestamped backup',
    filename: 'backup-directory.sh',
    description: 'Create a compressed timestamped archive and append the result to a log.',
    code: `#!/usr/bin/env bash\nset -euo pipefail\nsource_dir="${'${1:?usage: backup-directory.sh DIR}'}"\nbackup_dir="${'${BACKUP_DIR:-/var/backups}'}"\nmkdir -p "$backup_dir"\narchive="$backup_dir/backup-$(date +%Y%m%d-%H%M%S).tar.gz"\nif tar -czf "$archive" -C "$(dirname "$source_dir")" "$(basename "$source_dir")"; then\n  printf '%s created\\n' "$archive" | tee -a "$backup_dir/backup.log"\nfi`,
  },
];
