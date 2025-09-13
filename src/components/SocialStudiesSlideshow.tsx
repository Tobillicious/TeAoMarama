import React, { useEffect, useRef, useState } from 'react';
import './SocialStudiesSlideshow.css';

interface SlideData {
  id: string;
  title: string;
  content: string;
  image?: string;
  activityPrompt?: string;
  isChatbot?: boolean;
}

const SocialStudiesSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const slides: SlideData[] = [
    {
      id: 'slide-1',
      title: 'Understanding Aotearoa New Zealand',
      content: 'A Social Studies Presentation for Year 8',
    },
    {
      id: 'slide-2',
      title: 'We Are Learning To (WALT)',
      content:
        'We are learning to understand how the New Zealand government works and how our diverse culture is represented.',
    },
    {
      id: 'slide-3',
      title: 'Do Now Activity: What do you already know?',
      content:
        "Look at the images provided. In your groups, discuss what you think we'll be talking about today. Write down three questions you have about the photos.",
    },
    {
      id: 'slide-4',
      title: 'Where Does New Zealand Stand?',
      content:
        "This map shows how different countries are governed. As you can see, New Zealand is a 'Full Democracy'.",
      image: '20220212_WOP945.jpg',
      activityPrompt:
        "**Think-Pair-Share:** What does 'democracy' mean? Why do you think New Zealand is considered one of the best democracies in the world?",
    },
    {
      id: 'slide-5',
      title: 'Inside Parliament',
      content:
        "This is where our country's laws are made. It's called the debating chamber. The people you see here have very important jobs!",
      image: 'labelled-seats-in-the-chamber.jpg',
      activityPrompt:
        '**Class Discussion:** Look closely at the image. Who do you think has the most powerful job in this room? Why?',
    },
    {
      id: 'slide-6',
      title: 'How We Vote - MMP',
      content:
        'Our voting system is called Mixed-Member Proportional (MMP). Think of it like a pizza: the number of slices (seats) a party gets is equal to the size of their slice of the pizza (votes).',
      image: 'download.png',
      activityPrompt:
        "**Small Group Activity:** Imagine you are a new political party. What's one thing you would change in New Zealand and how would you get people to vote for you?",
    },
    {
      id: 'slide-7',
      title: 'What Happened in the 2020 Election?',
      content:
        'This map shows us the results from the last election. The different colours show which party won in each area.',
      image: '2020_New_Zealand_general_election_-_Results.svg.png',
      activityPrompt:
        '**Class Discussion:** Look at the colours on the map. What does this tell us about the election result? Can you see any patterns?',
    },
    {
      id: 'slide-8',
      title: 'Trust in Government',
      content:
        'This graph shows that people in New Zealand have a lot of trust in their government, more than most other countries. Why do you think that is?',
      image: 'Kiwis-Count-and-OECD-Survey.jpg',
      activityPrompt:
        '**Quick Write:** On a piece of paper, write down two reasons why you think Kiwis might trust their government more than people in other countries.',
    },
    {
      id: 'slide-9',
      title: 'Our Unique Culture',
      content:
        "Te Reo Māori is one of New Zealand's official languages. This slide introduces the word **Mātauranga**, which means knowledge, wisdom, and skill.",
      image: 'EESgzPIWkAUI1Re.jpg',
      activityPrompt:
        '**Say it out loud!** Try to pronounce "Mātauranga" (Mah-tow-rah-nga). What other Te Reo words do you know?',
    },
    {
      id: 'slide-10',
      title: 'Our People, Our Identity',
      content:
        'New Zealand is home to many incredible people who contribute to our culture. These images show us some of the different ways our identity is expressed.',
      image: 'multiple-images',
      activityPrompt:
        '**Class Discussion:** What do these images tell us about New Zealand culture? How do these people represent our country?',
    },
    {
      id: 'slide-11',
      title: 'Ask the Expert!',
      content: 'Got a question about New Zealand? Type it below and our expert will answer!',
      isChatbot: true,
    },
    {
      id: 'slide-12',
      title: "Let's Reflect!",
      content:
        "Go back to your original three questions from the 'Do Now' activity. Have we answered them? What's one new thing you learned today?",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const readSlide = async () => {
    const currentSlideData = slides[currentSlide];
    let textToRead = `${currentSlideData.title}. ${currentSlideData.content}`;

    if (currentSlideData.activityPrompt) {
      textToRead += `. ${currentSlideData.activityPrompt}`;
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
    // Note: You'll need to add your Gemini API key here
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

      // Try to use a better voice if available
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
      // For now, we'll provide a simple response
      // In a real implementation, you'd integrate with your AI service
      const responses = [
        "That's a great question! New Zealand has a unique democratic system that represents our diverse population.",
        "Interesting! New Zealand's government works differently from many other countries because of our MMP voting system.",
        'Good thinking! Our Parliament includes representatives from many different communities across Aotearoa.',
        'Excellent question! Te Reo Māori is an important part of our national identity and is protected by law.',
        "That's something many people wonder about! New Zealand's democracy is considered one of the most transparent in the world.",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAnswer(randomResponse);
    } catch (error) {
      setAnswer("Sorry, I couldn't process your question right now. Please try again!");
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="slideshow-container">
      <audio ref={audioPlayerRef} /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'none' }} />
      <div className="slide-content">
        {currentSlideData.isChatbot ? (
          <div className="chatbot-container">
            <h2 className="chatbot-header">✨ Ask the Expert!</h2>
            <p className="text-center mb-4">
              Got a question about New Zealand? Type it below and our expert will answer!
            </p>
            <div className="flex flex-col space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="chatbot-input h-24"
                placeholder="Type your question here..."
              />
              <button
                className="tts-button text-white bg-blue-500 hover:bg-blue-600"
                onClick={askExpert}
                disabled={isLoading}
              >
                ✨ Ask
              </button>
              {isLoading && <div className="text-center text-sm">Thinking...</div>}
              {answer && <div className="chatbot-response">{answer}</div>}
            </div>
          </div>
        ) : (
          <>
            <h1 className="slide-title">{currentSlideData.title}</h1>
            <p className="slide-text">{currentSlideData.content}</p>

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
                <img
                  src="/images/download.jpeg"
                  alt="Māori rugby player celebrating"
                  className="slide-image-small"
                />
                <img
                  src="/images/4OMTQKK_copyright_image_90404 (1).webp"
                  alt="Māori artist singing"
                  className="slide-image-small"
                />
                <img
                  src="/images/a-2383-atl.jpg"
                  alt="Traditional Māori art piece"
                  className="slide-image-small"
                />
              </div>
            )}

            {currentSlideData.activityPrompt && (
              <p className="activity-prompt">{currentSlideData.activityPrompt}</p>
            )}

            <button className="tts-button" onClick={readSlide}>
              ✨ Read Aloud
            </button>
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

      {/* Slide Counter */}
      <div className="footer">
        Slide {currentSlide + 1} of {slides.length}
      </div>
    </div>
  );
};

export default SocialStudiesSlideshow;
