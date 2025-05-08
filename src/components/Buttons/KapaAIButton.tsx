import Stars from '@site/static/images/stars.svg';
import styles from './styles.module.css';

const KapaAIButton = () => {
  return (
    <button
      // @ts-expect-error Kapa doesn't have typescript support
      onClick={() => window.Kapa('open')}
      className={[styles.kapaAIButton, styles.button].join(' ')}>
      <Stars aria-hidden="true" />
      Ask AI
    </button>
  );
};

export default KapaAIButton;
