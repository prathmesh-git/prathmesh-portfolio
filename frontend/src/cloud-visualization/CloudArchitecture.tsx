import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const nodes = [
  {
    id: 'user',
    label: 'User',
    sub: 'CSV upload',
    icon: '◎',
    title: 'The flow begins with a CSV upload',
    copy: 'A user sends a CSV file to the Node.js web application. The application accepts the upload and places it in the input/ prefix of the S3 bucket.',
  },
  {
    id: 'igw',
    label: 'Internet Gateway',
    sub: 'public subnet route',
    icon: '⇧',
    title: 'The Internet Gateway connects the public tier',
    copy: 'The VPC Internet Gateway provides internet connectivity for resources and routes in the public subnets, including the load balancer.',
  },
  {
    id: 'nat',
    label: 'NAT Gateway',
    sub: 'private egress',
    icon: '⇩',
    title: 'The NAT Gateway provides private outbound access',
    copy: 'The NAT Gateway lets resources in private subnets initiate outbound connections while keeping those resources unreachable from unsolicited internet traffic.',
  },
  {
    id: 'alb',
    label: 'Application\nLoad Balancer',
    sub: 'HTTPS · routing',
    icon: '⇄',
    title: 'The load balancer receives the web request',
    copy: 'The Application Load Balancer routes incoming application traffic to healthy EC2 targets across Availability Zones.',
  },
  {
    id: 'ec2',
    label: 'EC2 Auto Scaling',
    sub: 'Node.js · 2 AZs',
    icon: '▣',
    title: 'The web tier runs on EC2',
    copy: 'Node.js instances in an Auto Scaling Group host the web application. The project README describes two instances distributed across Availability Zones.',
  },
  {
    id: 's3',
    label: 'Amazon S3',
    sub: 'input / processed',
    icon: '◈',
    title: 'S3 stores input and processed files',
    copy: 'An ObjectCreated event on input/*.csv invokes Lambda. The function writes the processed CSV under processed/ so its output does not retrigger the same event.',
  },
  {
    id: 'lambda',
    label: 'AWS Lambda',
    sub: 'Python · CSV transform',
    icon: 'λ',
    title: 'Lambda turns the upload into a data event',
    copy: 'A Python Lambda function reads the uploaded CSV, adds a calculated field, inserts records into MySQL, and writes a processed CSV back to S3.',
  },
  {
    id: 'rds',
    label: 'RDS MySQL',
    sub: 'private database',
    icon: '▤',
    title: 'Processed records go to private MySQL',
    copy: 'Amazon RDS for MySQL stores the structured rows in a private subnet. Security groups control which services can connect.',
  },
  {
    id: 'url',
    label: 'Presigned URL',
    sub: 'temporary download',
    icon: '↗',
    title: 'The application returns a temporary link',
    copy: 'The web application detects the processed S3 object and creates a presigned URL. The bucket stays private while the user downloads the output.',
  },
];

export function CloudArchitecture() {
  const [selected, setSelected] = useState('user');
  const [replay, setReplay] = useState(false);
  const node = nodes.find((item) => item.id === selected) ?? nodes[0];
  const replayFlow = () => {
    setReplay(false);
    requestAnimationFrame(() => setReplay(true));
    window.setTimeout(() => setReplay(false), 2800);
  };

  return (
    <section className="systems-section section-pad" id="systems">
      <div className="shell">
        <Reveal>
          <div className="section-kicker">
            <span>03</span>
            <span>FOLLOW THE DATA</span>
            <span className="kicker-note">INTERACTIVE AWS ARCHITECTURE</span>
          </div>
          <div className="section-heading">
            <h2>
              One upload.
              <br />
              <em>A chain of services.</em>
            </h2>
            <p>
              CloudDataFlow turns a CSV upload into a processed file and structured records. Select
              a component to see its role.
            </p>
          </div>
          <div className="arch-wrap">
            <div className="arch-toolbar">
              <span>
                <i className="live-dot" /> CLOUDDATAFLOW / AP-SOUTH-1
              </span>
              <span>SELECT A NODE TO INSPECT</span>
              <button onClick={replayFlow} type="button" aria-label="Replay data flow">
                <RefreshCw size={11} /> <span>Replay flow</span>
              </button>
            </div>
            <div
              className={`arch-canvas ${replay ? 'replaying' : ''}`}
              aria-label="CloudDataFlow architecture"
            >
              <svg
                className="arch-lines"
                viewBox="0 0 1000 430"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <marker
                    id="arrow"
                    markerWidth="7"
                    markerHeight="7"
                    refX="6"
                    refY="3.5"
                    orient="auto"
                  >
                    <path d="M0 0L7 3.5L0 7z" fill="#8cdaa5" />
                  </marker>
                </defs>
                <path d="M95 215 C125 190 125 105 160 105 M235 145 V168 M260 215 H325 M425 215 H490 M600 215 H670 M755 215 H825" />
                <path d="M895 260 C895 365 130 390 95 260" className="return-line" />
                <path
                  d="M735 265 V370 H550 V265 M550 265 V340 H825 M485 115 C545 115 610 130 660 180"
                  className="branch-line"
                />
                <path
                  d="M95 215 C125 190 125 105 160 105 M235 145 V168 M260 215 H325 M425 215 H490 M600 215 H670"
                  className="flow-line"
                  markerEnd="url(#arrow)"
                />
              </svg>
              <div className="arch-zone zone-public">
                <span>PUBLIC SUBNETS · AZ-a / AZ-b</span>
              </div>
              <div className="arch-zone zone-private">
                <span>PRIVATE SUBNETS · AZ-a / AZ-b</span>
              </div>
              {nodes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`arch-node node-${item.id} ${selected === item.id ? 'active' : ''}`}
                  aria-pressed={selected === item.id}
                  onMouseEnter={() => setSelected(item.id)}
                  onFocus={() => setSelected(item.id)}
                  onClick={() => setSelected(item.id)}
                >
                  <span className="node-icon">{item.icon}</span>
                  <b>
                    {item.label.split('\n').map((word) => (
                      <span key={word}>
                        {word}
                        <br />
                      </span>
                    ))}
                  </b>
                  <small>{item.sub}</small>
                </button>
              ))}
              <div className="arch-side-note">
                <span className="note-line" />
                <span>
                  IAM roles
                  <br />
                  scope service access
                </span>
              </div>
            </div>
            <div className="arch-detail" aria-live="polite">
              <span className="detail-signal">
                {String(nodes.findIndex((item) => item.id === selected) + 1).padStart(2, '0')}
              </span>
              <div>
                <b>{node.title}</b>
                <p>{node.copy}</p>
              </div>
              <span className="detail-hint">CLICK NODES TO EXPLORE</span>
            </div>
            <div className="arch-legend">
              <span>
                <i className="legend-request" /> APPLICATION REQUEST
              </span>
              <span>
                <i className="legend-event" /> S3 EVENT / DATA WRITE
              </span>
              <span>
                <i className="legend-return" /> RESULT TO USER
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
