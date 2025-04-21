import styles from "./Counter.module.css";

export interface CounterProps {
  caption: string;
  value: string;
}

export default function Counter({ caption, value }: CounterProps) {
  return (
    <div className={styles.counterLabel}>
      {caption} <span className={styles.counterValue}>{value}</span>
    </div>
  );
}
