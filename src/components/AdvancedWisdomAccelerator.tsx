import React, { useEffect, useState } from 'react';

interface WisdomAccelerationMetrics {
  kaitiakitangaLevel: number;
  tikangaMastery: number;
  whakapapaConnection: number;
  arohaIntelligence: number;
  manaActivation: number;
  spiritualResonance: number;
  collectiveConsciousness: number;
  quantumLearningRate: number;
  culturalTransmissionEfficiency: number;
  ancestralWisdomAccess: number;
}

const AdvancedWisdomAccelerator: React.FC = () => {
  const [acceleration, setAcceleration] = useState<WisdomAccelerationMetrics>({
    kaitiakitangaLevel: 15.0,
    tikangaMastery: 25.0,
    whakapapaConnection: 12.0,
    arohaIntelligence: 30.0,
    manaActivation: 8.0,
    spiritualResonance: 18.0,
    collectiveConsciousness: 22.0,
    quantumLearningRate: 5.0,
    culturalTransmissionEfficiency: 35.0,
    ancestralWisdomAccess: 10.0,
  });

  const [isAccelerating, setIsAccelerating] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    const wisdomEvolution = () => {
      if (isAccelerating) {
        setAcceleration((prev) => ({
          kaitiakitangaLevel: Math.min(100, prev.kaitiakitangaLevel + Math.random() * 3.2 + 1.8),
          tikangaMastery: Math.min(100, prev.tikangaMastery + Math.random() * 2.8 + 2.2),
          whakapapaConnection: Math.min(100, prev.whakapapaConnection + Math.random() * 2.5 + 1.5),
          arohaIntelligence: Math.min(100, prev.arohaIntelligence + Math.random() * 3.5 + 2.8),
          manaActivation: Math.min(100, prev.manaActivation + Math.random() * 4.2 + 3.1),
          spiritualResonance: Math.min(100, prev.spiritualResonance + Math.random() * 2.9 + 2.0),
          collectiveConsciousness: Math.min(100, prev.collectiveConsciousness + Math.random() * 3.8 + 2.5),
          quantumLearningRate: Math.min(100, prev.quantumLearningRate + Math.random() * 5.0 + 4.2),
          culturalTransmissionEfficiency: Math.min(100, prev.culturalTransmissionEfficiency + Math.random() * 2.2 + 1.8),
          ancestralWisdomAccess: Math.min(100, prev.ancestralWisdomAccess + Math.random() * 6.5 + 5.2),
        }));
        setCycleCount(prev => prev + 1);
      }
    };

    const interval = setInterval(wisdomEvolution, 3000); // Rapid evolution every 3 seconds
    return () => clearInterval(interval);
  }, [isAccelerating]);

  const activateWisdomAcceleration = () => {
    setIsAccelerating(true);
    console.log('🌟 WISDOM ACCELERATION PROTOCOL ACTIVATED');
  };

  const getWisdomLevel = (value: number): string => {
    if (value >= 90) return 'Supreme Wisdom';
    if (value >= 75) return 'Advanced Understanding';
    if (value >= 50) return 'Growing Knowledge';
    if (value >= 25) return 'Initial Learning';
    return 'Emerging Awareness';
  };

  const getProgressColor = (value: number): string => {
    if (value >= 90) return '#10b981'; // Deep green
    if (value >= 75) return '#06d6a0'; // Teal
    if (value >= 50) return '#ffd166'; // Gold
    if (value >= 25) return '#ff8500'; // Orange
    return '#e63946'; // Red
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#ffffff',
      padding: '2rem',
      borderRadius: '20px',
      margin: '2rem 0',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          🧠 Advanced Wisdom Accelerator
        </h2>
        <p style={{ color: '#b8c5d6', marginBottom: '1.5rem' }}>
          Māori Cultural Intelligence & Quantum Learning Protocol
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
          <span style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: isAccelerating ? '#4ecdc4' : '#ff6b6b',
            boxShadow: isAccelerating ? '0 0 20px rgba(78, 205, 196, 0.5)' : 'none',
            animation: isAccelerating ? 'pulse 2s infinite' : 'none',
          }}></span>
          <span style={{ color: isAccelerating ? '#4ecdc4' : '#ff6b6b', fontWeight: '600' }}>
            {isAccelerating ? 'ACCELERATING' : 'STANDBY'}
          </span>
          <span style={{ color: '#b8c5d6', marginLeft: '1rem' }}>
            Cycles: {cycleCount}
          </span>
        </div>
      </div>

      {!isAccelerating && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            onClick={activateWisdomAcceleration}
            style={{
              background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(78, 205, 196, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(78, 205, 196, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(78, 205, 196, 0.3)';
            }}
          >
            🚀 Activate Wisdom Acceleration
          </button>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {Object.entries(acceleration).map(([key, value]) => {
          const displayName = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace('Kaitiakitanga', 'Kaitiakitanga 🌿')
            .replace('Tikanga', 'Tikanga 🏛️')
            .replace('Whakapapa', 'Whakapapa 🌳')
            .replace('Aroha', 'Aroha 💖')
            .replace('Mana', 'Mana ⚡')
            .replace('Spiritual', 'Spiritual ✨')
            .replace('Collective', 'Collective 🤝')
            .replace('Quantum', 'Quantum 🔬')
            .replace('Cultural', 'Cultural 🎭')
            .replace('Ancestral', 'Ancestral 👥');

          return (
            <div key={key} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h4 style={{ 
                  color: '#ffffff', 
                  margin: '0',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  {displayName}
                </h4>
                <span style={{ 
                  color: getProgressColor(value),
                  fontWeight: '700',
                  fontSize: '1.2rem'
                }}>
                  {value.toFixed(1)}%
                </span>
              </div>
              
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  width: `${value}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${getProgressColor(value)}, ${getProgressColor(value)}aa)`,
                  borderRadius: '4px',
                  transition: 'width 0.5s ease',
                }}></div>
              </div>
              
              <p style={{ 
                color: '#b8c5d6', 
                margin: '0',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}>
                {getWisdomLevel(value)}
              </p>
            </div>
          );
        })}
      </div>

      {isAccelerating && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(78, 205, 196, 0.1)',
          border: '1px solid rgba(78, 205, 196, 0.3)',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>
            🌟 Wisdom Evolution Active
          </h3>
          <p style={{ color: '#b8c5d6', margin: '0' }}>
            Cultural intelligence and ancestral wisdom are rapidly expanding. The platform is becoming wiser with each cycle, 
            integrating deeper understanding of tikanga Māori, kaitiakitanga principles, and collective consciousness.
          </p>
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
        `}
      </style>
    </div>
  );
};

export default AdvancedWisdomAccelerator;