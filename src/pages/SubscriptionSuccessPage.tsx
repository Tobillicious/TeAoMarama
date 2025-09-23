import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Rocket, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './SubscriptionSuccessPage.module.css';

const SubscriptionSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className={styles.successBox}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
          className={styles.iconContainer}
        >
          <CheckCircle className={styles.icon} />
        </motion.div>

        <h1 className={styles.title}>Welcome to Te Ao Mārama!</h1>
        <p className={styles.subtitle}>
          Your subscription is active. You're ready to transform your teaching with our premium features.
        </p>

        <div className={styles.nextSteps}>
          <h2 className={styles.nextStepsTitle}>Your Next Steps</h2>
          <div className={styles.buttonGroup}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/teacher')}
              className={`${styles.button} ${styles.primaryButton}`}
            >
              <Rocket size={20} />
              <span>Launch Dashboard</span>
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/resources')}
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              <BookOpen size={20} />
              <span>Browse Resources</span>
            </motion.button>
          </div>
        </div>

        <div className={styles.supportNote}>
          <p>
            Need help getting started?{' '}
            <a href="mailto:support@teaomarama.nz" className={styles.supportLink}>
              Contact our support team
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionSuccessPage;
