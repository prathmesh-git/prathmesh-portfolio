export type CommandResult = { output: string; explanation: string; error?: boolean };

export const commandRegistry: Record<string, CommandResult> = {
  whoami: {
    output: 'prathmesh',
    explanation:
      'whoami returns the current user account — a simple first check before inspecting permissions or ownership.',
  },
  pwd: {
    output: '/home/prathmesh',
    explanation:
      'pwd prints the current working directory. It helps confirm where a script or command will operate.',
  },
  ls: {
    output: 'projects/   scripts/   notes/   README.md',
    explanation:
      'ls lists directory contents. Use flags such as -la to include hidden files and permissions.',
  },
  'uname -a': {
    output: 'Linux lab-host 6.8.0-generic #1 SMP x86_64 GNU/Linux',
    explanation:
      'uname -a reports kernel and system details, useful when checking a host or debugging compatibility.',
  },
  uptime: {
    output: '14:32:10 up 8 days, 04:17,  1 user,  load average: 0.12, 0.18, 0.21',
    explanation:
      'uptime shows how long a system has run and its recent load averages — a quick health signal.',
  },
  'df -h': {
    output:
      'Filesystem      Size  Used Avail Use% Mounted on\n/dev/root        30G   18G   12G  60% /\n/dev/nvme0n1p1   80G   42G   38G  53% /data',
    explanation:
      'df -h shows filesystem capacity in readable units. It helps spot a disk that is approaching full.',
  },
  'free -h': {
    output:
      '               total        used        free      shared  buff/cache   available\nMem:           7.7Gi       2.4Gi       3.1Gi        68Mi       2.2Gi       5.0Gi\nSwap:          2.0Gi          0B       2.0Gi',
    explanation:
      'free -h summarizes memory and swap use. The available column helps estimate what a process can still use.',
  },
  'ps aux': {
    output:
      'USER       PID %CPU %MEM COMMAND\nroot         1  0.0  0.1 /sbin/init\nroot       614  0.1  0.8 /usr/sbin/sshd -D\nwww-data   902  0.2  1.4 nginx: worker process',
    explanation:
      'ps aux snapshots running processes and their resource use. Pair it with top when investigating a service.',
  },
  'systemctl status nginx': {
    output:
      '● nginx.service - A high performance web server\n     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled)\n     Active: active (running)\n   Main PID: 902 (nginx)',
    explanation:
      'systemctl status checks a systemd service, its current state, and recent logs. Useful after a deploy or failed health check.',
  },
  'docker ps': {
    output:
      'CONTAINER ID   IMAGE             STATUS         PORTS\na42f31d9c8ef   portfolio:latest  Up 3 hours     0.0.0.0:8080->80/tcp',
    explanation:
      'docker ps lists running containers. Add -a to include stopped containers when investigating a workload.',
  },
  'ip addr': {
    output:
      '2: eth0: <UP,LOWER_UP> mtu 1500\n    inet 10.0.2.24/24 brd 10.0.2.255 scope global eth0\n    inet6 fe80::42:acff:fe11:2/64 scope link',
    explanation:
      'ip addr shows network interfaces and assigned addresses — a starting point for checking host networking.',
  },
  'ss -tulnp': {
    output:
      'Netid State  Recv-Q Send-Q Local Address:Port  Process\ntcp   LISTEN 0      128    0.0.0.0:22        users:("sshd",pid=614)\ntcp   LISTEN 0      511    0.0.0.0:80        users:("nginx",pid=902)',
    explanation:
      'ss inspects sockets. This view shows listening TCP/UDP ports and the owning process.',
  },
};

export const commandNames = Object.keys(commandRegistry);
export function evaluateCommand(input: string): CommandResult {
  const command = input.trim().replace(/\s+/g, ' ');
  if (command === 'help')
    return {
      output: `Safe demo commands:\n${commandNames.join('  ')}\nhelp  history  clear`,
      explanation: 'These outputs are samples for learning; commands never run on a server.',
    };
  if (command === 'history')
    return {
      output: 'Command history is shown above in this session.',
      explanation: 'A shell history helps you review what you typed during the current session.',
    };
  return (
    commandRegistry[command] ?? {
      output: `Command not in this safe demo: ${command}\nTry help to see available commands.`,
      explanation: 'Only predefined commands are simulated here. No shell command is executed.',
      error: true,
    }
  );
}
