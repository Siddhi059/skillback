import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Sparkles, CheckCircle2, Lightbulb, Send, Volume2 } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { DoodleHeartNote, DoodleSparkle } from '../components/common/Doodles';
import { INTERVIEW_PROMPTS } from '../data/mockData';
import { agentService } from '../services/api';

export default function InterviewCoachPage() {
  const [selectedPrompt, setSelectedPrompt] = useState(INTERVIEW_PROMPTS[0]);
  const [answer, setAnswer] = useState(INTERVIEW_PROMPTS[0].sampleResponse);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Browser Web Speech API Voice Input state
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [voiceNote, setVoiceNote] = useState('');
  const recognitionRef = useRef(null);

  const SpeechRecognitionAPI =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore cleanup stop errors
        }
      }
    };
  }, []);

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors
      }
    }
    setIsListening(false);
    setInterimText('');
  };

  const toggleVoiceInput = () => {
    setVoiceNote('');
    if (isListening) {
      stopListening();
      return;
    }

    if (!SpeechRecognitionAPI) {
      setVoiceNote(
        'Browser speech recognition is unavailable in this browser. Try Chrome/Edge or use "Insert Sample Voice Draft" below.',
      );
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let finalChunk = '';
      let interimChunk = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalChunk += `${transcript.trim()} `;
        } else {
          interimChunk += transcript;
        }
      }
      if (finalChunk) {
        setAnswer((prev) => `${prev.trim()} ${finalChunk.trim()}`.trim());
      }
      setInterimText(interimChunk);
    };

    recognition.onerror = (event) => {
      setVoiceNote(`Microphone notice: ${event.error}. Check browser mic permissions.`);
      setIsListening(false);
      setInterimText('');
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimText('');
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSelectPrompt = (prompt) => {
    stopListening();
    setSelectedPrompt(prompt);
    setAnswer(prompt.sampleResponse);
    setFeedback(null);
    setVoiceNote('');
  };

  const handleEvaluate = async (e) => {
    e.preventDefault();
    stopListening();
    setLoading(true);
    try {
      const res = await agentService.evaluateInterviewAnswer({
        question: selectedPrompt.question,
        answer,
      });
      setFeedback(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <div className="sb-card-lavender" style={{ padding: '22px 26px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div>
          <Badge tone="lavender">
            <Mic size={12} /> Voice-Enabled Interview Confidence Coach
          </Badge>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '8px' }}>
            Rehearse Out Loud or by Text—Without Over-Explaining Your Break
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Use your browser microphone to speak naturally, then get scored on Clarity, Confidence,
            and Impact Framing.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <DoodleSparkle size={22} color="#FBBF24" />
          <DoodleHeartNote size={38} />
          <Badge tone={isListening ? 'warning' : 'success'}>
            <Volume2 size={12} /> {isListening ? 'Listening Live...' : 'Voice Input Ready'}
          </Badge>
        </div>
      </div>

      <div className="sb-bento-grid">
        {/* Prompt List */}
        <div className="sb-bento-span-5" style={{ display: 'grid', gap: '12px', alignContent: 'start' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Choose a Practice Scenario</h3>
          {INTERVIEW_PROMPTS.map((prompt) => {
            const active = selectedPrompt.id === prompt.id;
            return (
              <button
                key={prompt.id}
                type="button"
                onClick={() => handleSelectPrompt(prompt)}
                className="sb-card sb-card-interactive"
                style={{
                  textAlign: 'left',
                  padding: '18px',
                  cursor: 'pointer',
                  borderColor: active ? 'var(--purple-600)' : 'var(--border-light)',
                  background: active ? 'var(--lavender-50)' : 'var(--white)',
                }}
              >
                <Badge tone={active ? 'lavender' : 'neutral'}>{prompt.category}</Badge>
                <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '10px', lineHeight: 1.45 }}>
                  “{prompt.question}”
                </p>
              </button>
            );
          })}

          <div className="sb-card-navy" style={{ padding: '20px', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FDE68A', fontSize: '12.5px', fontWeight: 700 }}>
              <Lightbulb size={15} /> COACH TIP
            </div>
            <p style={{ fontSize: '13.5px', color: '#FFF5F8', marginTop: '8px', lineHeight: 1.6 }}>
              {selectedPrompt.tip}
            </p>
          </div>
        </div>

        {/* Practice Editor, Voice Input & Feedback */}
        <div className="sb-bento-span-7" style={{ display: 'grid', gap: '20px', alignContent: 'start' }}>
          <form onSubmit={handleEvaluate} className="sb-card" style={{ padding: '24px', display: 'grid', gap: '14px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Your Spoken / Written Draft</h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Button
                  type="button"
                  variant={isListening ? 'navy' : 'secondary'}
                  size="sm"
                  className={isListening ? 'sb-voice-recording' : ''}
                  onClick={toggleVoiceInput}
                >
                  {isListening ? (
                    <>
                      <MicOff size={14} /> Stop Voice Input
                    </>
                  ) : (
                    <>
                      <Mic size={14} /> Speak Answer (Voice)
                    </>
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => setAnswer('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--purple-600)',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            {isListening && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--lavender-100)',
                  border: '1px solid var(--border-lavender)',
                  fontSize: '13px',
                  color: 'var(--purple-700)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Mic size={15} />
                <span>
                  <strong>Listening:</strong> {interimText || 'Speak naturally—your words will appear below...'}
                </span>
              </div>
            )}

            {voiceNote && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--warning-50)',
                  color: 'var(--warning-600)',
                  fontSize: '12.5px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{voiceNote}</span>
                <button
                  type="button"
                  onClick={() => {
                    setAnswer(selectedPrompt.sampleResponse);
                    setVoiceNote('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--purple-700)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Insert Sample Draft
                </button>
              </div>
            )}

            <textarea
              className="sb-textarea"
              style={{ minHeight: '170px' }}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Click 'Speak Answer (Voice)' to dictate using your microphone, or type your response here..."
              required
            />

            <Button type="submit" variant="primary" size="lg" disabled={loading}>
              <Send size={15} /> {loading ? 'Analyzing Delivery...' : 'Get AI Coach Feedback'}
            </Button>
          </form>

          {feedback && (
            <div className="sb-card sb-animate-swap" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={17} color="var(--purple-600)" />
                <h4 style={{ fontSize: '17px', fontWeight: 700 }}>AI Coaching Breakdown</h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {Object.entries(feedback.scores).map(([metric, score]) => (
                  <div
                    key={metric}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--lavender-50)',
                      border: '1px solid var(--border-lavender)',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      className="tabular-nums"
                      style={{
                        fontSize: '22px',
                        fontWeight: 800,
                        color: 'var(--purple-700)',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {score}%
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                      {metric}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>What Works Well</div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: 'var(--text-secondary)', display: 'grid', gap: '4px' }}>
                  {feedback.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--success-50)',
                  color: 'var(--success-600)',
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{feedback.suggestions[0]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
