import React from 'react';
import Image from 'next/image';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      {/* Animated clouds in background */}
      <div className={styles.cloud1} />
      <div className={styles.cloud2} />
      <div className={styles.cloud3} />
      
      {/* Main loading content */}
      <div className={styles.loadingContent}>
        <div className={styles.characterContainer}>
          <Image
            src="/gif/peepoHey.gif"
            alt="Loading character"
            className={styles.character}
            width={120}
            height={120}
            priority
          />
        </div>
        
        <div className={styles.loadingText}>
          <div className={styles.loadingTitle}>
            Loading your experience...
          </div>
          <div className={styles.loadingSubtitle}>
            Preparing something awesome
          </div>
        </div>
        
        <div className={styles.loadingDots}>
          <div className={styles.loadingDot} />
          <div className={styles.loadingDot} style={{ animationDelay: '0.2s' }} />
          <div className={styles.loadingDot} style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
} 