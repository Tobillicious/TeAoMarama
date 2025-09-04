import { useCulturalContext } from '../hooks/useCulturalContext';

export function CulturalGuidancePanel() {
  const { getCulturalGuidance } = useCulturalContext();
  const guidance = getCulturalGuidance();

  if (guidance.length === 0) return null;

  return (
    <div className="cultural-guidance-panel" role="complementary">
      <h4>🌿 Cultural Guidance</h4>
      <ul>
        {guidance.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
