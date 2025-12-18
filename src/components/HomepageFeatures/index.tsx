import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Struct Tag Validation',
    image: '/img/struct-tag-validation.png',
    description: (
      <>
        Define validation rules using familiar Go struct tags.
        Just like <code>encoding/json</code>, but for validation.
        <br /><br />
        <code>pedantigo:"required,email,min=18"</code>
      </>
    ),
  },
  {
    title: 'JSON Schema Generation',
    image: '/img/schema-generation.png',
    description: (
      <>
        Auto-generate JSON schemas from your Go structs with built-in caching.
        First call ~10ms, subsequent calls &lt;100ns (240x faster).
      </>
    ),
  },
  {
    title: 'Streaming Validation',
    image: '/img/streaming-validation.png',
    description: (
      <>
        Validate partial JSON as it streams - perfect for LLM outputs.
        Catch malformed data before the response completes.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image} alt={title} className={styles.featureImg} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
