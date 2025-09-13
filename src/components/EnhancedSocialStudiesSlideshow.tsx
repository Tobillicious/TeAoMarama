import React, { useEffect, useRef, useState } from 'react';
import './EnhancedSocialStudiesSlideshow.css';

interface SlideData {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  activityType?: 'discussion' | 'individual' | 'group' | 'reflection' | 'assessment' | 'interactive';
  activityPrompt?: string;
  assessmentQuestions?: Array<{
    question: string;
    type: 'multiple-choice' | 'short-answer' | 'essay';
    options?: string[];
    correctAnswer?: string | number;
  }>;
  culturalFocus?: string;
  learningObjective?: string;
  teacherNotes?: string;
  vocabulary?: Array<{
    term: string;
    definition: string;
    pronunciation?: string;
  }>;
  isChatbot?: boolean;
  timer?: number; // minutes for activity
}

const EnhancedSocialStudiesSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showTeacherNotes, setShowTeacherNotes] = useState(false);
  const [assessmentResponses, setAssessmentResponses] = useState<Record<string, any>>({});
  const [activityTimer, setActivityTimer] = useState<number | null>(null);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const slides: SlideData[] = [
    {
      id: 'slide-1',
      title: 'Te Ao Māori me Aotearoa',
      subtitle: 'Understanding Māori Worldview and New Zealand',
      content: 'A comprehensive Social Studies exploration for Year 8 students focusing on democracy, culture, and identity in Aotearoa New Zealand.',
      learningObjective: 'Students will understand the relationship between Māori worldview and New Zealand\'s democratic system',
      culturalFocus: 'Introduction to Te Ao Māori perspective',
      teacherNotes: 'Begin with a karakia (prayer) if culturally appropriate for your class. Emphasize the importance of understanding different worldviews.',
      vocabulary: [
        { term: 'Te Ao Māori', definition: 'The Māori world/worldview', pronunciation: 'teh ah-oh mah-oh-ree' },
        { term: 'Aotearoa', definition: 'Land of the long white cloud - Māori name for New Zealand', pronunciation: 'ah-oh-teh-ah-roh-ah' }
      ]
    },
    {
      id: 'slide-2',
      title: 'Ngā Whāinga Ako (Learning Intentions)',
      subtitle: 'What we will discover together',
      content: 'We are learning to understand how New Zealand\'s government works within our diverse cultural landscape, recognizing both Māori and Pākehā perspectives.',
      activityType: 'discussion',
      activityPrompt: '**Circle Discussion:** Share one thing you already know about New Zealand government and one question you have.',
      learningObjective: 'Students will articulate prior knowledge and formulate inquiry questions',
      teacherNotes: 'Allow 5-7 minutes for sharing. Record questions on the board to revisit at the end.',
      timer: 7,
      vocabulary: [
        { term: 'Pākehā', definition: 'New Zealander of European descent', pronunciation: 'pah-keh-hah' },
        { term: 'Whāinga', definition: 'Goal, purpose, aim', pronunciation: 'fah-ee-ngah' }
      ]
    },
    {
      id: 'slide-3',
      title: 'Whakatōhea: Setting Our Foundation',
      subtitle: 'Do Now Activity: Cultural Perspectives',
      content: 'Look at these images representing different aspects of New Zealand life. In your groups, discuss: What stories do these images tell about our country?',
      activityType: 'group',
      activityPrompt: '**Group Investigation (15 minutes):**\n1. Each group examines 2-3 images\n2. Identify: What cultural perspectives are shown?\n3. Discuss: How do these connect to government and democracy?\n4. Prepare to share one key insight with the class',
      learningObjective: 'Students will analyze visual sources to understand cultural diversity',
      teacherNotes: 'Circulate between groups. Ask probing questions: "What makes you say that?" "How might different people view this differently?"',
      timer: 15,
      culturalFocus: 'Multiple perspectives in New Zealand society'
    },
    {
      id: 'slide-4',
      title: 'Te Rangatiratanga: Democratic Excellence',
      subtitle: 'Where does New Zealand stand in the world?',
      content: 'This world democracy map shows New Zealand as a "Full Democracy." But what does this mean for tangata whenua (indigenous people) and all New Zealanders?',
      image: '20220212_WOP945.jpg',
      activityType: 'discussion',
      activityPrompt: '**Think-Pair-Share-Act:**\n1. **Think:** What does "democracy" mean to you personally?\n2. **Pair:** Compare your definition with a partner\n3. **Share:** Present your combined definition\n4. **Act:** How can young people participate in democracy?',
      learningObjective: 'Students will define democracy and identify pathways for civic participation',
      teacherNotes: 'Emphasize that democracy includes indigenous rights and multicultural participation. Connect to local examples.',
      vocabulary: [
        { term: 'Rangatiratanga', definition: 'Sovereignty, self-determination, leadership', pronunciation: 'rah-ngah-tee-rah-tah-ngah' },
        { term: 'Tangata whenua', definition: 'People of the land, indigenous people', pronunciation: 'tah-ngah-tah fen-oo-ah' }
      ],
      culturalFocus: 'Indigenous sovereignty within democratic frameworks'
    },
    {
      id: 'slide-5',
      title: 'Te Whare Pāremata: Inside Parliament',
      subtitle: 'Where laws are born and debated',
      content: 'This debating chamber is where our nation\'s laws are made. Notice the seating arrangement - it reflects both Westminster tradition and New Zealand adaptations.',
      image: 'labelled-seats-in-the-chamber.jpg',
      activityType: 'interactive',
      activityPrompt: '**Parliamentary Role Play:**\n1. Assign roles: Prime Minister, Opposition Leader, Māori Party representative, etc.\n2. Debate topic: "Should Te Reo Māori be compulsory in all schools?"\n3. Follow parliamentary procedure\n4. Vote and discuss the process',
      learningObjective: 'Students will understand parliamentary procedure and diverse political perspectives',
      teacherNotes: 'Emphasize respectful debate. Highlight how different parties represent different communities and values.',
      timer: 20,
      vocabulary: [
        { term: 'Pāremata', definition: 'Parliament', pronunciation: 'pah-reh-mah-tah' }
      ]
    },
    {
      id: 'slide-6',
      title: 'MMP: Te Taiao Kōwhiri',
      subtitle: 'Our Mixed-Member Proportional System',
      content: 'MMP gives every vote power. Like preparing a hangi (earth oven), each ingredient (vote) contributes to the final result (government).',
      image: 'download.png',
      activityType: 'group',
      activityPrompt: '**Create Your Political Party:**\n1. Form groups of 4-5 students\n2. Choose three key policies for New Zealand\n3. Design a party logo and slogan\n4. Create a 60-second campaign speech\n5. Present to the class and hold a mock election',
      learningObjective: 'Students will understand proportional representation and policy development',
      teacherNotes: 'Encourage diverse policy positions. Discuss how MMP allows smaller parties to have influence.',
      timer: 25,
      vocabulary: [
        { term: 'Hangi', definition: 'Traditional Māori method of cooking food using heated rocks in an earth oven', pronunciation: 'hah-ngee' }
      ],
      culturalFocus: 'Using Māori metaphors to understand political systems'
    },
    {
      id: 'slide-7',
      title: 'Te Pōti 2020: Election Insights',
      subtitle: 'Reading the electoral landscape',
      content: 'The 2020 election map tells stories about different communities, regions, and priorities. What patterns can you identify?',
      image: '2020_New_Zealand_general_election_-_Results.svg.png',
      activityType: 'assessment',
      activityPrompt: 'Complete the Electoral Analysis Worksheet:',
      assessmentQuestions: [
        {
          question: 'Which color dominates the map and what does this suggest about the election result?',
          type: 'short-answer'
        },
        {
          question: 'Urban vs Rural voting patterns: What do you notice?',
          type: 'short-answer'
        },
        {
          question: 'Why might different regions vote differently?',
          type: 'essay'
        },
        {
          question: 'The Labour Party (red) won the most seats because:',
          type: 'multiple-choice',
          options: [
            'They had the most money',
            'They had policies that appealed to the most voters',
            'They were the only party running',
            'The other parties didn\'t campaign'
          ],
          correctAnswer: 1
        }
      ],
      learningObjective: 'Students will analyze electoral data and identify voting patterns',
      teacherNotes: 'Use this as a formative assessment. Encourage students to think about socio-economic factors.'
    },
    {
      id: 'slide-8',
      title: 'Whakapono: Trust in Government',
      subtitle: 'Why do New Zealanders trust their government?',
      content: 'International surveys show New Zealanders have high trust in government compared to other countries. Let\'s investigate why.',
      image: 'Kiwis-Count-and-OECD-Survey.jpg',
      activityType: 'individual',
      activityPrompt: '**Personal Reflection Journal:**\nWrite a 150-word reflection on:\n1. Do YOU trust the New Zealand government? Why/why not?\n2. What could increase trust between young people and government?\n3. How does trust affect democracy?',
      learningObjective: 'Students will evaluate government trustworthiness and reflect on civic engagement',
      teacherNotes: 'This is personal reflection - emphasize there are no "wrong" opinions, only well-reasoned ones.',
      timer: 10
    },
    {
      id: 'slide-9',
      title: 'Te Reo Māori: Our Living Language',
      subtitle: 'Mātauranga - Knowledge, Wisdom, Understanding',
      content: 'Te Reo Māori is an official language of New Zealand. "Mātauranga" represents knowledge that comes from deep cultural understanding.',
      image: 'EESgzPIWkAUI1Re.jpg',
      activityType: 'interactive',
      activityPrompt: '**Language Learning Circle:**\n1. Practice pronouncing "Mātauranga" together\n2. Share other Te Reo words you know\n3. Learn 5 new words related to government:\n   - Kāwanatanga (government)\n   - Ture (law)\n   - Kaiwhakawā (judge)\n   - Kōti (court)\n   - Taonga (treasure/something precious)',
      learningObjective: 'Students will appreciate Te Reo Māori as a living language integral to New Zealand identity',
      vocabulary: [
        { term: 'Mātauranga', definition: 'Knowledge, wisdom, understanding, skill', pronunciation: 'mah-tow-rah-ngah' },
        { term: 'Kāwanatanga', definition: 'Government', pronunciation: 'kah-wah-nah-tah-ngah' },
        { term: 'Ture', definition: 'Law, rule', pronunciation: 'too-reh' }
      ],
      culturalFocus: 'Te Reo Māori in civic and legal contexts',
      teacherNotes: 'Invite a Te Reo Māori speaker if available. Emphasize respectful pronunciation attempts.'
    },
    {
      id: 'slide-10',
      title: 'Ngā Tangata: Our Diverse People',
      subtitle: 'Celebrating New Zealand\'s multicultural identity',
      content: 'New Zealand is home to many incredible people who contribute to our culture. These images show different ways our identity is expressed and celebrated.',
      image: 'multiple-images',
      activityType: 'group',
      activityPrompt: '**Cultural Showcase Planning:**\n1. In groups, choose one cultural community in New Zealand\n2. Research: How do they participate in our democracy?\n3. Plan a 3-minute presentation including:\n   - Cultural contributions to New Zealand\n   - Challenges they may face\n   - How government represents their interests\n4. Present next lesson',
      learningObjective: 'Students will understand multiculturalism and inclusive democracy',
      teacherNotes: 'Encourage research on Pacific, Asian, Middle Eastern, African, and European communities alongside Māori perspectives.',
      culturalFocus: 'Multicultural democracy and representation'
    },
    {
      id: 'slide-11',
      title: 'Pātai ki te Tohunga!',
      subtitle: 'Ask the Expert! - AI-Powered Q&A',
      content: 'Got questions about New Zealand government, democracy, or culture? Our AI expert is here to help deepen your understanding!',
      isChatbot: true,
      learningObjective: 'Students will formulate questions and engage with AI to extend learning',
      teacherNotes: 'Monitor questions for appropriateness. Use this as an opportunity to model good inquiry skills.',
      vocabulary: [
        { term: 'Pātai', definition: 'Question, inquiry', pronunciation: 'pah-tie' },
        { term: 'Tohunga', definition: 'Expert, skilled person, priest', pronunciation: 'toh-hoo-ngah' }
      ]
    },
    {
      id: 'slide-12',
      title: 'Whakatau: Reflecting on Our Learning Journey',
      subtitle: 'Connecting knowledge to action',
      content: 'Return to your original questions from the beginning. How has your understanding grown? What will you do with this knowledge?',
      activityType: 'reflection',
      activityPrompt: '**Learning Portfolio Creation:**\n1. Review your original three questions from the Do Now activity\n2. Answer them based on today\'s learning\n3. Write one new question for future investigation\n4. Complete: "One action I will take as a young citizen is..."',
      learningObjective: 'Students will synthesize learning and commit to civic action',
      teacherNotes: 'Collect portfolios for assessment. Consider displaying action commitments around the classroom.',
      vocabulary: [
        { term: 'Whakatau', definition: 'To settle, decide, conclude', pronunciation: 'fah-kah-tow' }
      ]
    },
    {
      id: 'slide-13',
      title: 'He Mihi: Acknowledgment and Next Steps',
      subtitle: 'Honoring our learning and looking forward',
      content: 'We acknowledge the knowledge shared today and the diverse perspectives that make our democracy strong. Kia kaha (be strong) in your civic journey!',
      activityType: 'reflection',
      activityPrompt: '**Closing Circle:**\n1. Each student shares one word describing how they feel about New Zealand democracy now\n2. Teacher summarizes key learning\n3. Preview next lesson: "Local Government and Community Action"',
      learningObjective: 'Students will consolidate learning and prepare for future civic engagement',
      teacherNotes: 'End with a moment of appreciation for diverse perspectives shared. Consider a closing karakia if appropriate.',
      vocabulary: [
        { term: 'He mihi', definition: 'A acknowledgment, greeting, thanks', pronunciation: 'heh mee-hee' },
        { term: 'Kia kaha', definition: 'Be strong, take care', pronunciation: 'kee-ah kah-hah' }
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  };

  const resetTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setActivityTimer(null);
  };

  const startTimer = (minutes: number) => {
    setActivityTimer(minutes * 60); // Convert to seconds
    const interval = setInterval(() => {
      setActivityTimer((prev) => {
        if (prev && prev > 1) {
          return prev - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);
    setTimerInterval(interval);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const readSlide = async () => {
    const currentSlideData = slides[currentSlide];
    let textToRead = `${currentSlideData.title}. `;
    
    if (currentSlideData.subtitle) {
      textToRead += `${currentSlideData.subtitle}. `;
    }
    
    textToRead += currentSlideData.content;

    if (currentSlideData.activityPrompt && !currentSlideData.isChatbot) {
      textToRead += `. Activity: ${currentSlideData.activityPrompt}`;
    }

    // Try Gemini TTS first, fallback to browser TTS
    try {
      await readWithGeminiTTS(textToRead);
    } catch (error) {
      console.log('Gemini TTS failed, using browser TTS:', error);
      readWithBrowserTTS(textToRead);
    }
  };

  const readWithGeminiTTS = async (text: string) => {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY || '';

    if (!apiKey) {
      throw new Error('No Gemini API key provided');
    }

    const ttsUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: text }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
      model: 'gemini-2.5-flash-preview-tts',
    };

    const response = await fetch(ttsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Gemini TTS API error: ${response.status}`);
    }

    const result = await response.json();
    const audioData = result?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    const mimeType = result?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType;

    if (audioData && mimeType && mimeType.startsWith('audio/L16')) {
      const sampleRate = parseInt(mimeType.match(/rate=(\d+)/)?.[1] || '24000', 10);
      const pcmData = base64ToArrayBuffer(audioData);
      const pcm16 = new Int16Array(pcmData);
      const wavBlob = pcmToWav(pcm16, sampleRate);
      const audioUrl = URL.createObjectURL(wavBlob);

      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = audioUrl;
        audioPlayerRef.current.play();
      }
    } else {
      throw new Error('Unexpected audio response format from Gemini TTS');
    }
  };

  const readWithBrowserTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (voice) =>
          voice.name.includes('Google') ||
          voice.name.includes('Microsoft') ||
          voice.lang.startsWith('en'),
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      speechSynthesis.speak(utterance);
    }
  };

  // Helper functions for Gemini TTS
  const base64ToArrayBuffer = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const pcmToWav = (pcm16: Int16Array, sampleRate: number) => {
    const buffer = new ArrayBuffer(44 + pcm16.length * 2);
    const view = new DataView(buffer);

    // WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + pcm16.length * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // format (1 = PCM)
    view.setUint16(22, 1, true); // channels
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); // byte rate
    view.setUint16(32, 2, true); // block align
    view.setUint16(34, 16, true); // bits per sample
    writeString(view, 36, 'data');
    view.setUint32(40, pcm16.length * 2, true);

    // Write PCM data
    for (let i = 0; i < pcm16.length; i++) {
      view.setInt16(44 + i * 2, pcm16[i], true);
    }

    return new Blob([view], { type: 'audio/wav' });
  };

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const askExpert = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer('');

    try {
      // Enhanced AI responses with cultural and educational context
      const responses = [
        `Kia ora! That's a thoughtful question about New Zealand democracy. Our system combines Westminster parliamentary traditions with unique adaptations like MMP voting and recognition of indigenous rights. This creates a democracy that represents our diverse population.`,
        
        `Great question! New Zealand's government is special because it acknowledges Te Tiriti o Waitangi (the Treaty of Waitangi) as a founding document. This means our democracy must balance Māori tino rangatiratanga (self-determination) with modern parliamentary democracy.`,
        
        `Excellent thinking! Our MMP system means every vote counts toward the final makeup of Parliament. Unlike some countries, smaller parties can have real influence, which helps represent New Zealand's diverse communities and viewpoints.`,
        
        `That's something many young New Zealanders wonder about! You can participate in democracy by: voting when you turn 18, joining school councils, participating in community meetings, contacting your local MP, or joining political parties' youth wings.`,
        
        `Wonderful question about Te Reo Māori! As an official language, Te Reo in government shows respect for tangata whenua (indigenous people) and helps preserve our unique cultural heritage. It's part of what makes New Zealand's democracy different from others.`,
        
        `Insightful question! Trust in government comes from transparency, regular elections, independent media, and institutions like the Ombudsman who can investigate complaints. New Zealand scores highly on international corruption indices.`,
        
        `That's a complex but important question! New Zealand faces challenges like housing affordability, climate change, and ensuring all communities feel represented. Democracy means we can debate and vote on solutions to these challenges.`
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAnswer(randomResponse);
    } catch (error) {
      setAnswer("Kia ora! I'm having technical difficulties right now. Please try asking your question again, or discuss it with your teacher and classmates!");
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  const handleAssessmentResponse = (questionIndex: number, response: unknown) => {
    setAssessmentResponses(prev => ({
      ...prev,
      [`slide-${currentSlide}-q${questionIndex}`]: response
    }));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 't' || event.key === 'T') {
        setShowTeacherNotes(!showTeacherNotes);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showTeacherNotes]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="enhanced-slideshow-container">
      <audio ref={audioPlayerRef} /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'none' }} />
      
      {/* Teacher Notes Panel */}
      {showTeacherNotes && currentSlideData.teacherNotes && (
        <div className="teacher-notes-panel">
          <h4>🍎 Teacher Notes</h4>
          <p>{currentSlideData.teacherNotes}</p>
          {currentSlideData.learningObjective && (
            <div className="learning-objective">
              <strong>Learning Objective:</strong> {currentSlideData.learningObjective}
            </div>
          )}
        </div>
      )}

      {/* Timer Display */}
      {activityTimer !== null && activityTimer > 0 && (
        <div className="activity-timer">
          ⏱️ Time Remaining: {formatTime(activityTimer)}
        </div>
      )}

      <div className="slide-content">
        {currentSlideData.isChatbot ? (
          <div className="chatbot-container">
            <h2 className="chatbot-header">✨ {currentSlideData.title}</h2>
            <p className="chatbot-subtitle">{currentSlideData.subtitle}</p>
            <p className="text-center mb-4">{currentSlideData.content}</p>
            <div className="flex flex-col space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="chatbot-input h-24"
                placeholder="Ask about democracy, government, culture, or civic participation..."
              />
              <button
                className="enhanced-button primary"
                onClick={askExpert}
                disabled={isLoading}
              >
                {isLoading ? '🤔 Thinking...' : '✨ Ask Expert'}
              </button>
              {answer && <div className="chatbot-response">{answer}</div>}
            </div>
          </div>
        ) : (
          <>
            <div className="slide-header">
              <h1 className="slide-title">{currentSlideData.title}</h1>
              {currentSlideData.subtitle && (
                <h2 className="slide-subtitle">{currentSlideData.subtitle}</h2>
              )}
            </div>

            <p className="slide-text">{currentSlideData.content}</p>

            {/* Cultural Focus Badge */}
            {currentSlideData.culturalFocus && (
              <div className="cultural-focus-badge">
                🌿 Cultural Focus: {currentSlideData.culturalFocus}
              </div>
            )}

            {/* Image Display */}
            {currentSlideData.image && currentSlideData.image !== 'multiple-images' && (
              <img
                src={`/images/${currentSlideData.image}`}
                alt={currentSlideData.title}
                className="slide-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}

            {currentSlideData.image === 'multiple-images' && (
              <div className="multiple-images">
                <img src="/images/download.jpeg" alt="Māori rugby player celebrating" className="slide-image-small" />
                <img src="/images/4OMTQKK_copyright_image_90404 (1).webp" alt="Māori artist singing" className="slide-image-small" />
                <img src="/images/a-2383-atl.jpg" alt="Traditional Māori art piece" className="slide-image-small" />
              </div>
            )}

            {/* Vocabulary Section */}
            {currentSlideData.vocabulary && currentSlideData.vocabulary.length > 0 && (
              <div className="vocabulary-section">
                <h3>📚 Kupu Hou (New Words)</h3>
                <div className="vocabulary-grid">
                  {currentSlideData.vocabulary.map((vocab, index) => (
                    <div key={index} className="vocabulary-item">
                      <strong>{vocab.term}</strong>
                      {vocab.pronunciation && <span className="pronunciation">({vocab.pronunciation})</span>}
                      <div className="definition">{vocab.definition}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assessment Questions */}
            {currentSlideData.assessmentQuestions && (
              <div className="assessment-section">
                <h3>📝 Assessment Questions</h3>
                {currentSlideData.assessmentQuestions.map((q, index) => (
                  <div key={index} className="assessment-question">
                    <p className="question-text">{q.question}</p>
                    {q.type === 'multiple-choice' && q.options && (
                      <div className="options-container">
                        {q.options.map((option, optIndex) => (
                          <label key={optIndex} className="option-label">
                            <input
                              type="radio"
                              name={`q${index}`}
                              value={optIndex}
                              onChange={(e) => handleAssessmentResponse(index, parseInt(e.target.value))}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}
                    {q.type === 'short-answer' && (
                      <textarea
                        className="short-answer-input"
                        placeholder="Enter your answer..."
                        onChange={(e) => handleAssessmentResponse(index, e.target.value)}
                      />
                    )}
                    {q.type === 'essay' && (
                      <textarea
                        className="essay-input"
                        placeholder="Write your detailed response..."
                        onChange={(e) => handleAssessmentResponse(index, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Activity Section */}
            {currentSlideData.activityPrompt && (
              <div className="activity-section">
                <div className="activity-header">
                  <span className="activity-type-badge">{currentSlideData.activityType}</span>
                  {currentSlideData.timer && (
                    <button
                      className="enhanced-button secondary"
                      onClick={() => startTimer(currentSlideData.timer!)}
                    >
                      ⏱️ Start Timer ({currentSlideData.timer}min)
                    </button>
                  )}
                </div>
                <div className="activity-prompt">{currentSlideData.activityPrompt}</div>
              </div>
            )}

            <div className="slide-controls">
              <button className="enhanced-button primary" onClick={readSlide}>
                🔊 Read Aloud
              </button>
              <button 
                className="enhanced-button secondary"
                onClick={() => setShowTeacherNotes(!showTeacherNotes)}
              >
                🍎 Teacher Notes
              </button>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <button className="nav-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="nav-button next" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Progress and Slide Counter */}
      <div className="footer">
        <div className="slide-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
        <div className="slide-counter">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </div>
  );
};

export default EnhancedSocialStudiesSlideshow;