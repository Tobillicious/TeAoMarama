import React from 'react';
import './WhakataukiWisdom.css';

interface WhakataukiItem {
  maori: string;
  english: string;
  context: string;
  source?: string;
}

interface WhakataukiWisdomProps {
  className?: string;
  variant?: 'hero' | 'card' | 'inline';
}

const educationalWhakataukī: WhakataukiItem[] = [
  {
    maori: "Whaowhia te kete mātauranga",
    english: "Fill the basket of knowledge",
    context: "Learning is a continuous journey of filling our minds with wisdom and understanding.",
    source: "Traditional Māori whakatauki"
  },
  {
    maori: "He aha te mea nui o te ao? He tangata, he tangata, he tangata",
    english: "What is the most important thing in the world? It is people, it is people, it is people",
    context: "Education exists to serve people and communities, placing relationships at the center.",
    source: "Traditional Māori whakatauki"
  },
  {
    maori: "Mā te rongo, ka mōhio; mā te mōhio, ka mārama; mā te mārama, ka mātau; mā te mātau, ka ora",
    english: "Through listening comes knowledge; through knowledge comes understanding; through understanding comes wisdom; through wisdom comes wellbeing",
    context: "The progressive stages of learning that lead to true educational transformation.",
    source: "Traditional Māori whakatauki"
  },
  {
    maori: "Kia ūpoko pakaru ki a koe, kia kōrero Māori ai koe",
    english: "May you have a broken head that you might speak Māori",
    context: "Encouraging deep immersion in cultural learning and linguistic competence.",
    source: "Traditional Māori whakatauki"
  },
  {
    maori: "Ko te tamaiti, he taonga",
    english: "The child is a treasure",
    context: "Every learner is precious and deserving of our very best educational efforts.",
    source: "Traditional Māori whakatauki"
  }
];

export const WhakataukiWisdom: React.FC<WhakataukiWisdomProps> = ({ 
  className = '', 
  variant = 'card' 
}) => {
  // For demo, we'll rotate through different whakataukī
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentWhakataukī = educationalWhakataukī[currentIndex];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % educationalWhakataukī.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const baseClasses = `whakataukī-wisdom whakataukī-${variant}`;
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <div className={classes}>
      <div className="whakataukī-container">
        <div className="whakataukī-header">
          <div className="whakataukī-icon">🌿</div>
          <h3 className="whakataukī-title">He Whakatauki - Our Guiding Wisdom</h3>
        </div>
        
        <div className="whakataukī-content">
          <blockquote className="whakataukī-quote">
            <p className="whakataukī-maori">{currentWhakataukī.maori}</p>
            <p className="whakataukī-english">{currentWhakataukī.english}</p>
          </blockquote>
          
          <div className="whakataukī-context">
            <p>{currentWhakataukī.context}</p>
            {currentWhakataukī.source && (
              <cite className="whakataukī-source">— {currentWhakataukī.source}</cite>
            )}
          </div>
        </div>

        <div className="whakataukī-navigation">
          {educationalWhakataukī.map((_, index) => (
            <button
              key={index}
              className={`whakataukī-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View wisdom ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhakataukiWisdom;