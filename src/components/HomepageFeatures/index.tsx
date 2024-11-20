import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  to: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Get started',
    Svg: require('@site/static/images/icons/home/rocket.svg').default,
    to: '/docs/get-started',
    description: <>Your first steps to set up your account, for free.</>,
  },
  {
    title: 'Managed services',
    Svg: require('@site/static/images/icons/home/database.svg').default,
    to: '/docs/products/services',
    description: <>Discover our managed services and how to set them up.</>,
  },
  {
    title: 'Bring your own cloud',
    Svg: require('@site/static/images/icons/home/cloud.svg').default,
    to: '/docs/platform/concepts/byoc',
    description: (
      <>
        Connect your Aiven organization with your own cloud account by creating
        custom clouds.
      </>
    ),
  },
  {
    title: 'Aiven dev tools',
    Svg: require('@site/static/images/icons/home/tool.svg').default,
    to: '/docs/tools',
    description: (
      <>
        Manage your Aiven infrastructure with the Aiven API, Terraform Provider,
        Kubernetes Operator, or CLI.
      </>
    ),
  },
  {
    title: 'Integrations',
    Svg: require('@site/static/images/icons/home/integrations.svg').default,
    to: '/docs/platform/concepts/service-integration',
    description: (
      <>
        Explore the integrations offered by Aiven to connect your services with
        other systems and tools. Unlock new possibilities and improve
        interoperability.
      </>
    ),
  },
  {
    title: 'API documentation',
    Svg: require('@site/static/images/icons/home/tool.svg').default,
    to: '/docs/tools/api',
    description: (
      <>
        Interact programmatically with the Aiven platform. Automate your
        workflows, integrate with your existing tools, and extend the
        functionality.
      </>
    ),
  },
];

function Feature({title, Svg, description, to}: FeatureItem) {
  return (
    <div className={clsx('col', styles.feature)}>
      <Link to={to}>
        <div className={styles.titleContainer}>
          <Heading as="h3">{title}</Heading>
        </div>
        <div className={styles.bodyContainer}>
          <div className={styles.logo}>
            <Svg className={styles.featureSvg} role="img" />
          </div>
          <div className={styles.body}>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section>
      <div className={styles.features}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
